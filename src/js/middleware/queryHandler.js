// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { addedProduct } from '../../orm/models/ProductModel';
import { createdCatalog, toggledCategory } from '../../orm/models/ProductCategoryModel';
import { setActiveUrl, isIterable } from '../../orm/utilities';
import {  addedCartItem, removedCartItem, updatedCartItem } from '../../orm/models/CartModel';
import { addedOrderItem } from '../../orm/models/OrderModel';
import { object } from 'prop-types';
import { createdConnectionRetriesMonitor, upsertedConnectionRetriesMonitor } from '../../orm/models/ConnectionRetriesMonitorModel';
import types from '../../orm/actions/actionTypes';
import { useId } from 'react';


// const base = 'https://leech-giving-seal.ngrok-free.app/api/v1'
const base = 'http://127.0.0.1:5000/api/v1';
// const base = 'http://192.168.1.66:3143/api/v1';
const sess = sessionStorage
const setJwt = (headers) => {
  // console.log("headers", headers)
  const authorizationHeader = headers["authorization"];

  // Remove the "Bearer " text from the authorization header
  const jwtToken = authorizationHeader?.replace("Bearer ", "");

  // Update the jwt-auth variable in the collection parent with the JWT token
  sess.setItem("jwt", jwtToken);
}

const snakeToCamel = (s) => {
  return s.replace(/(_\w)/g, function (m) {
    return m[1].toUpperCase();
  }) ||s;

}

const objectToCamel = (o) => {
  let newO, origKey, newKey, value
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === "object") {
        value = objectToCamel(value)
      }
      return value
    })
  } else {
    newO = {}
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = snakeToCamel(origKey)//(origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
        if(newKey === "id") {
          // console.log("newKey", newKey)
          newKey = "uuid"
        }

        value = o[origKey]
        if(value === null){
          value = false
        }
        // console.log(origKey,"->",value)
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = objectToCamel(value)
        }
        newO[newKey] = value
      }
    }
  }
  // console.log("", newO)
  
  return Object.getOwnPropertyNames(newO).length ? newO : null

}

const configObject=(object)=>{
  if(isIterable(object)){
    return object.map(prop=>({uuid:prop.id, ...objectToCamel(prop.attributes)}))
  }else{

    return {uuid:object.id, ...objectToCamel(object.attributes)}
  }
}

const upsertProduct = (dispatch, getState, product)=>{
    // console.log("gs", getState())
    const products = getState().orm.Product.items
    if(!products.includes(product.uuid)){
        
        dispatch(addedProduct({
          uuid:product.uuid,
          name:product.name,
          imageUrl:product.imageUrl,
          storeName:product.store.name,
          slug:product.slug,
          discountTag:product.priceVariation.discountTag,
          newPrice:product.priceVariation.newPrice,
          oldPrice:product.priceVariation.oldPrice,
        }))
      }
      return
  }
//define custom basequery
const axiosQuery =
  async ({ baseUrl=base, url, method, body, params, headers }) => {
    try {

      const result = {}
      await axios.request({
        url: baseUrl + url,
        method:method,
        data:body,
        params:params,
        headers:headers,
      }).then((response) => {
        // Access headers from the response
        // console.log("res", response)
        result["data"] = {...(response?.data?.data||response?.data)}
        const headers = response.headers;
        
        // Do something with the headers
        if (headers) {
          // Your logic here
          setJwt(headers)
        }

      })
      // console.log(url, result)
      if(["/resetpassword", "/signin", "/signup"].includes(url)){
        return { data: ((await result?.data )||{}) }
      }
      return { data: (configObject(await result?.data )||{}) }
    } catch (axiosError) {
      console.log(axiosError)
      const err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err?.response?.data || err?.message||err,
        },
      }
    }
  }

const staggeredBaseQuery = fetchBaseQuery({
  baseUrl: base,
  // timeout: 5000,
  
  async responseHandler (res) {
    // if(res.data.errors){
    //   res['errors']= res.data.errors
    //   return res
    // }
    // if(res.data.data){
    //   res['data']= res.data.data
    //   return res
    // }
    // console.log("c-type", res.headers.get('content-type'))
    if (res.headers.get('content-type').includes('text/html; charset=utf-8')) {
      return await res.text()
    }
    if (
      res.headers
        .get('content-type')
        .includes('application/json; charset=utf-8') ||
      res.headers.get('content-type').includes('application/vnd.api+json')
    ) {
      const resp = await res.json()

      // console.log("res",resp)
      return resp
    }
  },
  prepareHeaders (headers) {
    if (base.includes('leech-giving-seal.ngrok-free')) {
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('ngrok-skip-browser-warning', '69420')
    }

    return headers
  }
})

const max = 5

// Define our single API slice object
export const apiSlice = createApi({

  
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: retry(
    staggeredBaseQuery, 
    {
      maxRetries:max,
      retryCondition : (error, args, extraArgs) => {
        // console.log("error3", error, args, extraArgs, extraArgs?.baseQueryApi.getState())
        if( error.status === 401 || error.status === 'FETCH_ERROR'){
         
          // console.log("conn", extraArgs?.baseQueryApi.getState().orm.ConnectionRetriesMonitor)
          sess.setItem("connectionRetry", parseInt(sess.getItem("connectionRetry"))+1)
          extraArgs?.baseQueryApi.dispatch(
            upsertedConnectionRetriesMonitor({
              attempt:(extraArgs?.baseQueryApi.getState().orm.ConnectionRetriesMonitor.itemsById?.["1"]?.attempt + 1) || 1,
              uuid: 1,
              status: extraArgs?.baseQueryApi.getState().orm.ConnectionRetriesMonitor.itemsById?.["1"]?.attempt > max ? types.DO_NOT_RETRY_CONNECTION : types.RETRY_CONNECTION,
              
            })
          )
          extraArgs?.baseQueryApi.abort("endpoint not alive")
          if(extraArgs.attempt > 3){
            return false

          }

        }
        return true
      }   
    }
  ),
   tagTypes:['ShoppingCart', "ShoppingCartItem", 'Checkout','ProductReviews'],
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    
    signupUser: builder.mutation({
      queryFn: ({initialCred}) => axiosQuery({
        
        url: `/signup`,
        method: 'POST',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        body: initialCred,
        
      }),
    }),
    loginUser: builder.mutation({
      queryFn: ({initialCred}) => axiosQuery({
        url: `/login`,
        method: 'POST',
        body: initialCred,
        headers: (sess.getItem('jwt')
           ? {"Authorization":  `Bearer ${sess.getItem('jwt')}`} 
           : ""), 
        
      }),
      
      
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          await queryFulfilled;
          
        } catch (errorRes) {
          // console.log(errorRes) 
          if(errorRes.error.data.error === "nil user") {
            sess.removeItem('jwt')
          }
        }
      },
      invalidatesTags: ["ProductReviews", "ShoppingCart", "Checkout"]
    }),
    logoutUser: builder.mutation({
      queryFn: () => axiosQuery({
        url: `/logout`,
        method: 'POST',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
      
      }),
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          await queryFulfilled;
          sess.removeItem('jwt')
        } catch (error) {
          console.log( error)
        }
      },
      invalidatesTags: ["ProductReviews", "ShoppingCart", "Checkout"]

    }),
    resetPassword: builder.mutation({
      queryFn: ({email}) => axiosQuery({
          url: `/resetpassword`,
        method: 'POST',
        body: {email},
      }),
      async onQueryStarted (arg, { dispatch, queryFulfilled }){
        try {
           await queryFulfilled;
          // console.log("data", data)
          
          // if(error){
          //   dispatch(createdToastMessage({status:types.TOAST_VALID, text:error.data.error, type: types.TOAST_ERROR}))
          // }
          // if(data){
          //   dispatch(createdToastMessage({status:types.TOAST_VALID, text:data.message, type: types.TOAST_SUCCESS}))
          // }


        } catch (error) {
          console.log( error)
        }
      }
    }),
    recoverAccount: builder.mutation({
      queryFn: ({email}) => axiosQuery({
        url: `/recover-account`,
        method: 'POST',
        body: {email},
      }),
    }),
    getUser: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: ({uuid}) => ({
        url:'/users/'+uuid,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
      }),
      transformResponse(res){ return [res.data].map(configObject)[0]},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      
    }),
    getStores: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/stores'
    }),
    getStore: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (storeId) => `/stores/${storeId}`,

    }),
    getProducts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (query) => query ? '/products' + '?' + query : '/products',
      transformResponse(res){ return res.data?.map(configObject)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){
        // console.log("arg", arg)
        // console.log("dispatch", dispatch)
        // console.log("queryFulfilled", queryFulfilled)

        try {
          // const {data} = await queryFulfilled
          
          const {data:products} = await queryFulfilled;
          // console.log("data", data, "=>",products)
          if(typeof products[0] !== "string" || typeof products[0] !== "number"){
            dispatch(addedProduct(products))
          }
          return;
        } catch (error) {
          console.log( error)
        }
      }
    }),
    getPopularSearches: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (query) => query ? '/products' + '?' + query : '/products',
      transformResponse(res){ return res?.data},
      transformErrorResponse(err){  return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch,signal, queryFulfilled  }, ){
        try {
          const {data, meta} = await queryFulfilled;
          
         } 
        
        catch (error) {
          console.log( error)

         }
        
      }
    }),
    getEmbeddedProducts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (query) => query ? '/products' + '?' + query : '/products',
      transformResponse(res){return res.data?.map(configObject)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch,signal, queryFulfilled  }, ){
         try {
          const {data, meta} = await queryFulfilled;
          
         } 
        
        catch (error) {
          console.log( error)
         }
        
      }
    }),
    getProduct: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: ({productId,queries}) => `/products/${productId}${queries? '?'+queries:''}`,
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},

      
    }),
    // The `getPosts` endpoint is a "query" operation that returns data
    getCatalog: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/product_categories/catalog',
      transformResponse(res){return res.data},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
          
          
          // console.log("data", data)
         
          const catalog = data?.map(configObject);
          catalog[0].active = true;
          dispatch(createdCatalog(catalog))
          // apiSlice.endpoints.getCatalogItem.initiate()

        } catch (error) {
          console.log(error)
        }
      }
    }),
    getCatalogItem: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (catId) => `/product_categories/catalog?id=${catId}`,
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
          
         
          const [catalogItem] = data;
          // console.log(catalogItem)
          dispatch(toggledCategory({uuid:catalogItem.uuid,active:true }))
        } catch (error) {
          console.log( error)
        }
      }
    }),
    getShoppingCart: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => ({
        url:'/shopping-cart',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, getState, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
          
          const itemsInCart = data; //data?.map(configObject);
          // console.log("itemInCart", itemsInCart)
          
         if( itemsInCart.length){
      
           dispatch(addedCartItem(itemsInCart?.map(item=>{
            const {product, ...rest} = item
            
            upsertProduct(dispatch, getState, product)

            // return {product:product.uuid, ...product.priceVariation, ...rest}
            return {product:product.uuid, uuid:rest.uuid, productCount:rest.productCount, itemStatus:rest.itemStatus}
           })))
            
           
         }
          
        } catch (error) {
          console.log( error)
        }
      },

      providesTags: ["ShoppingCart"]
    }),

    getShoppingCartItem: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (cartId) => ({
        url:`/shopping-cart/${cartId}`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      providesTags: ['ShoppingCartItem']
    }),
    beginItemCheckout: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: ({cartIds}) => {
          if(cartIds.length > 0){
            return {
              url:`/shopping-cart/begin_checkout?${cartIds?.map(id=> `ids[]=${id}`).join("&")}`,
              headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
              
            }
        }
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      
      async onCacheEntryAdded(id, { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry, updateCachedData }) {
          
          // console.log(
          //   "Cache entry added:",
          //    "id:", id, "\n",
          //     "requestId:", requestId, "\n",
          //     "cacheEntryRemoved:", cacheEntryRemoved, "\n",
          //     "cacheDataLoaded:", cacheDataLoaded, "\n",
          //     "getCacheEntry:", getCacheEntry, "\n",
          //     "updateCachedData:", updateCachedData, "\n",
          //     "extra:", extra, "\n",
          // )
          // apiSlice.ut
          // const data = getCacheEntry(id)
          // console.log("data", data)
      },
       async onQueryStarted ({cartId}, {dispatch, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
          // console.log(
          //   "\n id:", id,
          //   "\n data:", data,
          //   "\n cartIdss:", cartId
          // )
          // dispatch(
          //   apiSlice.util.updateQueryData('getPosts', cartId, (checkout) => data)
          // )
        } catch (error) {
          console.log( error)
        }
      },
      extraOptions:{
        maxRetries:1
      }
      
    }),
    searchForProducts: builder.query({
      query: ({searchString,getFilters, filters, sort}) => {


        const areJsonTypeKeys =(keysArr)=>{
            return (keysArr.length && keysArr?.every(k => isNaN(k)))
        }
        
        const convert2Param = ([initK,initV={}], nested) => {
          let paramString = initK;

          const initVKeys = Object.keys(initV);
          const initVValues = Object.values(initV);

          initVValues.forEach((value,x)=>{
            if(areJsonTypeKeys(Object.keys(value))){
              paramString += convert2Param([`${paramString.endsWith(initK) ? '' : initK
}[${initVKeys[x]}]`,value], true)
              
            }else if(Array.isArray(value)){
              paramString += `${paramString.endsWith(initK) ? "" : initK
            }[${initVKeys[x]}]=${value.join(",")}&`
            }else if(nested){
              paramString += `${paramString.endsWith(initK) ? "" : initK
            }[${initVKeys[x]}]=${value}&`
            }else{
              // console.log("should be str", value);
              paramString += `[${initVKeys[x]}]=${value}&`
            }
          })
          // console.log("paramString", paramString)
          return paramString
        }


        const buildQueryParams = (paramsArray=[{}]) => {
            let params = "";
            if(paramsArray){
              
              paramsArray.map((param,x)=>{
                const [pk, pv] = Object.entries(param)[0]
                // console.log("pk",pk,"pv",pv)
                let p = ""
                if(pk&&pv){
                  if(typeof pv === "string"){
                    p = `${pk}=${pv}`
                  }
                  if(Array.isArray(pv)){
                    p = `${pk}=${pv.join(",")}`
                  }
                  if(Object.keys(pv).every((key)=> isNaN(key))){
                    // p = flattenNestedObject([pk,pv])[0]
                    p = convert2Param([pk,pv])
                  }
                  params += `${p}&`
                }
                // console.log("p", p)
              })
            }
            console.log("params", params)
            return params
        }
        const searchParams = buildQueryParams([{query:searchString}, {getFilters}, {filters}, {sort} ])
        // {test:{"some1":["data1","data2", "data3"], "some2":{try21:"catch21",try22:"catch22", try23:"catch23"}, "some3":"string3"}}

        return `/search?${searchParams}`
          // return `/search?
          // ${searchString ? 'query=' + searchString +"&" : ''}
          // ${getFilters ? 'getFilters[' + getFilters + ']=1&' :''}
          // ${filters ?  'filters=' + filters + "&" : ''}
          // ${sort ? 'sort=' + sort : ''}`
        // return "/search?"+searchParams.toString()
      },
      transformResponse(res){
        if(res?.data){
          const {search_filters, search_results} =res.data.attributes;
          console.log("res", res.data.attributes)
          return {searchFilters:configObject(search_filters.data), searchResults:configObject(search_results.data)}
        }
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
    }),
    getCheckout: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => ({
        url:'/checkout/history',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
          
          const orderHistory = data; //data?.map(configObject);
          // console.log("itemInCart", itemsInCart)
         if( orderHistory.length){
            // orderHistory?.map((item)=>{
            //   const productUuids = []
            //   console.log("item", item)
            //   item.order_items?.map((i)=>{
            //     productUuids.push(i.id)
            //   })
            //   return {
                
            //       productUuids:productUuids,
            //       ...item
                
            //   }
            // })
            // console.log("ord", orderHistory)
           dispatch(addedOrderItem(
            orderHistory
            // orderHistory?.map(item=>{
            //   const {product, ...rest} = item
            //   return {product:product.uuid, ...product.priceVariation, ...rest}
            // })
           ))
         }
          
        } catch (error) {
          console.log( error)
        }
      },
      
      providesTags: ['Checkout']
    }),
    getCheckoutItem: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (orderId) => ({
        url:`/checkout/history/${orderId}`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        

      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      // providesTags: ['Checkout']
    }),
    
    
    completeItemCheckout: builder.mutation({
      query: ({initialOrderItem, orderId, cartId}) => ({
        url: `/checkout/orders/${orderId}/complete_checkout?cart_item_ids=${cartId}`,
        method: 'POST',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        body: initialOrderItem,
        
      }),
      // transformResponse(res){return configObject(res.data)},
      // transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      // async onQueryStarted (arg, { dispatch, queryFulfilled }){

      //   try {
      //     const {data} = await queryFulfilled;
          
      //     // const itemInCart = data; //configObject(data);
      //     // dispatch(createdCartItem({
      //     //   uuid:itemInCart.uuid,
      //     //   productCount: itemInCart.product_count,
      //     //   product:itemInCart.product,
      //     //   ItemStatus: itemInCart.item_status
      //     // }))
      //   } catch (error) {
      //     console.log(error)
      //   }
      // },
      invalidatesTags: ['ShoppingCart','Checkout']

    }),
    
    addCartItem: builder.mutation({
      query: ({initialCartItem}) => ({
        url: `/shopping-cart/add_to_cart`,
        method: 'POST',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        body: initialCartItem,
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
          
          const itemInCart = data; //configObject(data);
          // dispatch(createdCartItem({
          //   uuid:itemInCart.uuid,
          //   productCount: itemInCart.product_count,
          //   product:itemInCart.product,
          //   ItemStatus: itemInCart.item_status
          // }))
        } catch (error) {
          console.log( error)
        }
      },
      invalidatesTags: ['ShoppingCart']
    }),
    updateCartItem: builder.mutation({
     query: ({itemUpdate,cartId}) => ({
        url:`/shopping-cart/${cartId}`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        method:"PUT",
        body:itemUpdate
        
      }),
      transformResponse(res){
        return configObject(res.data)
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){
       
        try {
          const {data} = await queryFulfilled;
          
          const updatedItem = data; //configObject(data);
          console.log(updatedItem)
          dispatch(updatedCartItem({
            uuid:updatedItem.uuid,
            productCount: updatedItem.productCount,
            product:updatedItem.product.uuid,
            ItemStatus: updatedItem.itemStatus
          }))
        } catch (error) {
          console.log( error)
        }

      },
      // invalidatesTags: ['ShoppingCartItem']
    }),
    removeCartItem: builder.mutation({
      query: ({cartId}) => ({
        url: `/shopping-cart/${cartId}`,
        method: 'DELETE',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        
      }),
      // transformResponse(res){
      //   return configObject(res.data)
      // },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          await queryFulfilled;
          // console.log('ars', arg)
          // const itemInCart = data; //configObject(data);
          dispatch(removedCartItem({
            uuid:arg.cartId,
          }))
        } catch (error) {
          console.log(error)
        }
      },
      invalidatesTags: ['ShoppingCart']
    }),
    getProductReviews: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: ({productId}) => `/products/${productId}/product-reviews`,
      transformResponse(res){return configObject(res.data);
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted(arg, { dispatch, queryFulfilled }){

        try {
           await queryFulfilled;
          // console.log('ars', arg, payload);

          // const itemInCart = data; //configObject(data);
          // dispatch(removedCartItem({
          //   uuid:arg.cartId,
          // }))
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["ProductReviews"]   
    }),
    addReview: builder.mutation({
      query: ({initialReview, productId, productReviewId}) => ({
        url: `/products/${productId}/product-reviews/${productReviewId}/reviews`,
        method: 'POST',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        body: initialReview,
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
          
          // const itemInCart = data; //configObject(data);
          // dispatch(createdReview({
          //   uuid:itemInCart.uuid,
          //   productCount: itemInCart.product_count,
          //   product:itemInCart.product,
          //   ItemStatus: itemInCart.item_status
          // }))
        } catch (error) {
          console.log(error)
        }
      },
      invalidatesTags: ['ProductReviews']
    }),
    updateReview: builder.mutation({
     query: ({reviewUpdate,productId, productReviewId, reviewId}) => ({
        url:`/products/${productId}/product-reviews/${productReviewId}/reviews/${reviewId}`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        method:"PUT",
        body:reviewUpdate
        
      }),
      transformResponse(res){
        return configObject(res.data)
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      // invalidatesTags: ['ShoppingCart']
    }),
    removeReview: builder.mutation({
      query: ({productId, productReviewId, reviewId}) => ({
        url: `/products/${productId}/product-reviews/${productReviewId}/reviews/${reviewId}`,
        method: 'DELETE',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        
      }),
      // transformResponse(res){
      //   return configObject(res.data)
      // },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          await queryFulfilled;
          // console.log('ars', arg)
          // // const itemInCart = data; //configObject(data);
          // dispatch(removedReview({
          //   uuid:arg.cartId,
          // }))
        } catch (error) {
          console.log(error)
        }
      },
      invalidatesTags: ['ProductReviews']
    }),
    
    addQuestion: builder.mutation({
      query: ({initialPost, productId, productReviewId}) => ({
        url: `/products/${productId}/product-reviews/${productReviewId}/qandas`,
        method: 'POST',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        body: initialPost,
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
          
          // const itemInCart = data; //configObject(data);
          // dispatch(createdQuestionAnswer({
          //   uuid:itemInCart.uuid,
          //   productCount: itemInCart.product_count,
          //   product:itemInCart.product,
          //   ItemStatus: itemInCart.item_status
          // }))
        } catch (error) {
          console.log(error)
        }
      },
      invalidatesTags: ['ProductQuestionAnswers']
    }),
    updateQuestion: builder.mutation({
     query: ({postUpdate,productId, productReviewId, questionAnswerId, questionId}) => ({
        url:`/products/${productId}/product-reviews/${productReviewId}/qandas/${questionAnswerId}/question/${questionId}`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        method:"PUT",
        body:postUpdate
        
      }),
      transformResponse(res){
        return configObject(res.data)
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      // invalidatesTags: ['ShoppingCart']
    }),
    removeQuestion: builder.mutation({
      query: ({productId, productReviewId, questionAnswerId, questionId}) => ({
        url: `/products/${productId}/product-reviews/${productReviewId}/qandas/${questionAnswerId}/question/${questionId}`,
        method: 'DELETE',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        
      }),
      // transformResponse(res){
      //   return configObject(res.data)
      // },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          await queryFulfilled;
          // console.log('ars', arg)
          // // const itemInCart = data; //configObject(data);
          // dispatch(removedQuestionAnswer({
          //   uuid:arg.cartId,
          // }))
        } catch (error) {
          console.log(error)
        }
      },
      invalidatesTags: ['ProductReviews']
    }),
    
    addAnswer: builder.mutation({
      query: ({initialPost, productId, productReviewId,questionAnswerId}) => ({
        url: `/products/${productId}/product-reviews/${productReviewId}/qandas/${questionAnswerId}/answers`,
        method: 'POST',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        body: initialPost,
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
          
          // const itemInCart = data; //configObject(data);
          // dispatch(createdQuestionAnswer({
          //   uuid:itemInCart.uuid,
          //   productCount: itemInCart.product_count,
          //   product:itemInCart.product,
          //   ItemStatus: itemInCart.item_status
          // }))
        } catch (error) {
          console.log(error)
        }
      },
      invalidatesTags: ['ProductQuestionAnswers']
    }),
    updateAnswer: builder.mutation({
     query: ({postUpdate,productId, productReviewId, questionAnswerId, answerId}) => ({
        url:`/products/${productId}/product-reviews/${productReviewId}/qandas/${questionAnswerId}/answers/${answerId}`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        method:"PUT",
        body:postUpdate
        
      }),
      transformResponse(res){
        return configObject(res.data)
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      // invalidatesTags: ['ShoppingCart']
    }),
    removeAnswer: builder.mutation({
      query: ({productId, productReviewId, questionAnswerId, answerId}) => ({
        url: `/products/${productId}/product-reviews/${productReviewId}/qandas/${questionAnswerId}/answers/${answerId}`,
        method: 'DELETE',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt')}`},
        
      }),
      // transformResponse(res){
      //   return configObject(res.data)
      // },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          await queryFulfilled;
          // console.log('ars', arg)
          // // const itemInCart = data; //configObject(data);
          // dispatch(removedQuestionAnswer({
          //   uuid:arg.cartId,
          // }))
        } catch (error) {
          console.log(error)
        }
      },
      invalidatesTags: ['ProductReviews']
    })

  }),
  
  

})

// Export the auto-generated hook for each endpoint
export const {
   useSignupUserMutation,
   useLoginUserMutation,
   useLogoutUserMutation,
   useRecoverAccountMutation, 
   useResetPasswordMutation,
   useGetUserQuery,
   useGetStoresQuery,
   useGetStoreQuery,
   useGetProductsQuery,
   useLazyGetProductsQuery,
   useGetPopularSearchesQuery,
   useLazyGetPopularSearchesQuery,
   useGetEmbeddedProductsQuery,
   useLazyGetEmbeddedProductsQuery,
   useGetProductQuery,
   useLazyGetProductQuery,
   useGetCatalogQuery,
   useGetCatalogItemQuery,
   useGetShoppingCartQuery,
   useGetShoppingCartItemQuery,
   useGetCheckoutQuery,
   useGetCheckoutItemQuery,
   useSearchForProductsQuery,
   useLazySearchForProductsQuery,
   useGetProductReviewsQuery,
   useAddCartItemMutation,
   useUpdateCartItemMutation,
   useRemoveCartItemMutation,
   useBeginItemCheckoutQuery,
   useCompleteItemCheckoutMutation,
   useAddReviewMutation,
   useUpdateReviewMutation,
   useRemoveReviewMutation,
   useAddQuestionMutation,
   useUpdateQuestionMutation,
   useRemoveQuestionMutation,
   useAddAnswerMutation,
   useUpdateAnswerMutation,
   useRemoveAnswerMutation,
   
  } = apiSlice