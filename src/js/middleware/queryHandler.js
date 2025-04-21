// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { addedProduct } from '../../orm/models/ProductModel';
import { createdCatalog, toggledCategory } from '../../orm/models/ProductCategoryModel';
import { setActiveUrl, isIterable, configObject, sleep } from '../../utilities';
import {  addedCartItems, removedCartItem, updatedCartItem } from '../../orm/models/CartModel';
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
      // console.log(axiosError)
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

// Add this helper function at the top of your file
export const isAuthorized = () => sess?.getItem('jwt') || false;

// Define our single API slice object
export const apiSlice = createApi({

  
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: retry(
    staggeredBaseQuery, 
    {
      // maxRetries:max,
      retryCondition : (error, args, extraArgs) => {
        // console.log("error3", error, args, extraArgs, extraArgs?.baseQueryApi.getState())
        // define the conditions for not retrying
        if (error.status === 401 || error.status === 'FETCH_ERROR'){
          return false
        }
        if(extraArgs.attempt > 5  ){
          extraArgs?.baseQueryApi.abort("endpoint not alive")
          return false

        }
        
         
          // console.log("conn", extraArgs?.baseQueryApi.getState().orm.ConnectionRetriesMonitor)
          sess.setItem("connectionRetry", parseInt(sess.getItem("connectionRetry"))+1)
          extraArgs?.baseQueryApi.dispatch(
            upsertedConnectionRetriesMonitor({
              attempt:(extraArgs?.baseQueryApi.getState().orm.ConnectionRetriesMonitor.itemsById?.["1"]?.attempt + 1) || 1,
              uuid: 1,
              status: extraArgs?.baseQueryApi.getState().orm.ConnectionRetriesMonitor.itemsById?.["1"]?.attempt > max ? types.DO_NOT_RETRY_CONNECTION : types.RETRY_CONNECTION,
              
            })
          )
          // console.log("aborting", extraArgs?.attempt)

          

        
        return true
      }   
    }
  ),
   tagTypes:['Products', 'ShoppingCart', "ShoppingCartItem", 'Checkout','ProductReviews', 'Reviews','QuestionAndAnswers', 'Questions', 'Answers', 'UserReviews', 'User', 'ProfileOverview', 'UserSettings'],
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    
    signupUser: builder.mutation({
      queryFn: ({initialCred}) => axiosQuery({
        
        url: `/signup`,
        method: 'POST',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        body: initialCred,
        
      }),
    }),
    loginUser: builder.mutation({
      queryFn: ({initialCred}) => axiosQuery({
        url: `/login`,
        method: 'POST',
        body: initialCred,
        // headers: (sess.getItem('jwt')
        //    ? ""/{"Authorization":  `Bearer ${sess.getItem('jwt') || ""}`} 
        //    : ""), 
        
      }),
        
      
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
          // console.log("data", data)
          // can I get the user here?
          dispatch(apiSlice.endpoints.getUser.initiate({uuid:data.uuid}, {skip: !isAuthorized()}))
        } catch (errorRes) {
          // console.log(errorRes) 
          if(errorRes?.error?.data?.error === "nil user") {
            sess.removeItem('jwt')
          }
        }
      },
      
      invalidatesTags: ["UserReviews", "ShoppingCart", "Checkout", "ProfileOverview", "UserSettings"]
    }),
    logoutUser: builder.mutation({
      queryFn: () => axiosQuery({
        url: `/logout`,
        method: 'GET',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          await queryFulfilled;
          sess.clear()
          localStorage.clear()
          sess.removeItem('jwt');
          sess.removeItem('connectionRetry')
          sess.removeItem('shoppingCartUuid')
          
          // Reset the entire cache
          // dispatch(apiSlice.util.resetApiState());

          // Clear specific cache entries without refetching
          const tags = ["UserReviews", "ShoppingCart", "Checkout", "User",  "ProfileOverview", "UserSettings"];
          dispatch(apiSlice.util.invalidateTags(tags));
          
        } catch (error) {
          // console.log(error);
        }
      },
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
              sess.removeItem('jwt')
          // console.log("data", data)
          
          // if(error){
          //   dispatch(createdToastMessage({status:types.TOAST_VALID, text:error.data.error, type: types.TOAST_ERROR}))
          // }
          // if(data){
          //   dispatch(createdToastMessage({status:types.TOAST_VALID, text:data.message, type: types.TOAST_SUCCESS}))
          // }


        } catch (error) {
          // console.log( error)
        }
      },
      invalidatesTags: ["User", "ProfileOverview", "UserSettings"]
    }),
    recoverAccount: builder.mutation({
      queryFn: ({email}) => axiosQuery({
        url: `/recover-account`,
        method: 'POST',
        body: {email},
      }),
      async onQueryStarted (arg, { dispatch, queryFulfilled }){
        try {
              await queryFulfilled;
              sess.removeItem('jwt')
          // console.log("data", data)
          
          // if(error){
          //   dispatch(createdToastMessage({status:types.TOAST_VALID, text:error.data.error, type: types.TOAST_ERROR}))
          // }
          // if(data){
          //   dispatch(createdToastMessage({status:types.TOAST_VALID, text:data.message, type: types.TOAST_SUCCESS}))
          // }


        } catch (error) {
          // console.log( error)
        }
      },
      invalidatesTags: ["User", "ProfileOverview", "UserSettings"]
    }),
    getUser: builder.query({
    
      query: ({uuid}) => ({
        url:'/users/'+uuid,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
      }),
      transformResponse(res){ return {...[res.data].map(configObject)[0]}},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onCacheEntryAdded(arg, api){
        // console.log("cacheEntry:", arg, api)
      },
      // Add this condition
      // skip: () => !isAuthorized(),
      keepUnusedDataFor: 500000, //5 minutes
      providesTags: ["User"],
    }),
    getUserProfileOverview: builder.query({
      // query: ({uuid}) => `/users/${uuid}/profile_overview`,
      query: ({userUuid}) => ({
        url:`/users/${userUuid}/profile_overview`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
      }),
      async transformResponse(res){
        // console.log("res", res)
        const recentlyViewedProducts = res.data.attributes.recentlyViewedProducts 
        // || [
        //     { id: 'd7b3b937944dfb8bb4e808b4ee95378b', attributes:{name: "Ultra Clean Vacuum", image: "https://placehold.co/40x40/orange/black"} },
        //     { id: '07e5aa4184b21f706b4458ea108de136', attributes:{name: "Comfy Armchair", image: "https://placehold.co/40x40/orange/black"} },
        //     { id: 'e3a713b96d5c5c1cb1e20dade5e81561', attributes:{name: "Yoga Mat", image: "https://placehold.co/40x40/orange/black"} },
        //   ];

          const recentOrders = res.data.attributes.recentOrders 
          // || [
          //   { id: '7128e42d23c9942029870f3d986fa6f6', attributes:{date: '2023-05-01'} },
          //   { id: '7128e42d23c9942029870f3d986fa6f7', attributes:{date: '2023-04-28'} },
          //   { id: '7128e42d23c9942029870f3d986fa6f8', attributes:{date: '2023-04-25'} },
          // ];

          const recentReturns = res.data.attributes.recentReturns 
          // || [
          //   { id: '7128e42d23c9942029870f3d986fa6f9', attributes:{status: 'Pending'} },
          //   { id: '7128e42d23c9942029870f3d986fa6f5', attributes:{status: 'Approved'} },
          // ];

          const bonuses = res.data.attributes.bonuses 
          // || [
          //   { id: 1, attributes:{name: 'Loyalty Points', value: '500 pts'} },
          //   { id: 2, attributes:{name: 'Birthday Discount', value: '10% off'} },
          // ];
          const cleanData = {
            data:{
              recentlyViewedProducts:recentlyViewedProducts?.map(configObject) || [], 
              recentOrders:recentOrders?.map(configObject) || [], 
              recentReturns:recentReturns?.map(configObject) || [], 
              bonuses:bonuses?.map(configObject) || []
            }
          }

        await sleep(1000);
        return configObject(res.data)
      },
      providesTags: ["ProfileOverview"],
      // Add this condition
      // skip: () => !isAuthorized(),
    }),
    getUserReviews: builder.query({
      query: ({uuid}) => ({
        url: `/users/${uuid}/user_reviews`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
      }),
      transformResponse(res){return res.data?.map(configObject)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      providesTags: ["UserReviews"],
      // Add this condition
      // skip: () => !isAuthorized(),
    }),
    getUserSettings: builder.query({
      query: (uuid) =>({
        url:`/users/${uuid}/user_settings`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
      }),
      transformResponse(res) {
        return configObject(res.data);
      },
      transformErrorResponse(err) {
        return err ? err.data?.errors : "unknown error";
      },
      providesTags: ["UserSettings"],
      // Add this condition
      // skip: () => !isAuthorized(),
    }),

    updateUserSettings: builder.mutation({
      queryFn:({update, uuid}) => ({
        url: `/users/${uuid}/user_settings`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        method: 'PUT',
        body: {update},
      }),
      invalidatesTags: ["UserSettings"]
    }),
    getStores: builder.query({
    
      query: () => '/stores',
      transformResponse(res){return res.data?.map(configObject)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ uuid }) => ({ type: 'Stores', id: uuid })), 'Stores']
          : ['Stores'],
    }),
    getStore: builder.query({
    
      query: ({storeId}) => `/stores/${storeId}`,
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      providesTags: (result, error, arg) =>
        [{type:'Store', id:'store-'+arg.storeId}]
         

    }),
    getStoreProducts: builder.query({
      query: ({storeId, query}) => `/stores/${storeId}/products${query ? '?' + query : ''}`,
      transformResponse(res){return res.data?.map(configObject)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ uuid }) => ({ type: 'Store', id: 'store-product-'+uuid })), 'Store']
          : ['Store'],
    }),
    getProducts: builder.query({
    
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
            if(arg){
              // update the cache to include the new products
              dispatch(apiSlice.util.updateQueryData('getProducts', arg, (draft) => {
                draft.push(...products);
              }));
            }
          }
          
          return;
        } catch (error) {
          // console.log( error)
        }
      },
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ uuid }) => ({ type: 'Products', id: uuid })), 'Products']
          : ['Products'],
      extraOptions:{
        maxRetries:1
      }

    }),
    getPopularSearches: builder.query({
    
      query: (query) => query ? '/products' + '?' + query : '/products',
      transformResponse(res){ return res?.data},
      transformErrorResponse(err){  return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch,signal, queryFulfilled  }, ){
        try {
          const {data, meta} = await queryFulfilled;
          
         } 
        
        catch (error) {
          // console.log( error)

         }
        
      }
    }),
    getEmbeddedProducts: builder.query({
    
      query: (query) => query ? '/products' + '?' + query : '/products',
      transformResponse(res){return res.data?.map(configObject)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch,signal, queryFulfilled  }, ){
         try {
          const {data, meta} = await queryFulfilled;
          
         } 
        
        catch (error) {
          // console.log( error)
         }
        
      }
    }),
    getProduct: builder.query({
    
      query: ({productId,queries}) => `/products/${productId}${queries? '?'+queries:''}`,
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},

      
    }),
    // The `getPosts` endpoint is a "query" operation that returns data
    getCatalog: builder.query({
    
      query: () => '/product_categories/catalog',
      transformResponse(res){return res.data},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
          
          
          // console.log("data", data)
         
          const catalog = data
                            ?.map((d, x)=>({...d, attributes:{...d.attributes, active:x===0}}))
                            ?.map(configObject);
          catalog[0].active = true;
          dispatch(createdCatalog(catalog))
          // apiSlice.endpoints.getCatalogItem.initiate()

        } catch (error) {
          // console.log(error)
        }
      }
    }),
    getCatalogItem: builder.query({
    
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
          // console.log( error)
        }
      }
    }),
    getCatalogItemProducts: builder.query({
      query: (catId) => `/product_categories/${catId}/products`,
      transformResponse(res){return res.data?.map(configObject)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},

    }),
    getShoppingCart: builder.query({
    
      query: () => ({
        url:'/shopping_carts',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, getState, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
          
          const shoppingCart = data; //data?.map(configObject);
          // console.log("itemInCart", shoppingCart)
          

         if( shoppingCart.uuid){
            sessionStorage.setItem("shoppingCartUuid", shoppingCart.uuid)

        
            dispatch(addedCartItems(shoppingCart.cartItems.map(item=>{
              const {product, ...rest} = item
              
              upsertProduct(dispatch, getState, product)

              // return {product:product.uuid, ...product.priceVariation, ...rest}
              // return {product:product.uuid, uuid:rest.uuid, itemCount:rest.itemCount, itemStatus:rest.itemStatus, shoppingCartUuid:shoppingCart.uuid, productVariationUuid:product.priceVariation.uuid}
              return {serializedProduct:JSON.stringify(product), uuid:rest.uuid, itemCount:rest.itemCount, itemStatus:rest.itemStatus, shoppingCartUuid:shoppingCart.uuid}
            })))
            
           
         }
          
        } catch (error) {
          // console.log( error)
        }
      },

      providesTags: (result, error, arg) =>
        result
          ? [...result.cartItems.map(({ uuid }) => ({ type: 'ShoppingCart', id: "cart-"+uuid })), 'ShoppingCart']
          : ['ShoppingCart'],
      // Add this condition
      // skip: () => !isAuthorized(),
    }),

    getShoppingCartItem: builder.query({
    
      query: (cartId) => ({
        url:`/shopping_carts/${cartId}`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      providesTags: (args)=>['ShoppingCartItem-'+args.cartId]
    }),
    beginItemCheckout: builder.query({
      query: ({
        uuid,
        cartItemIds
      }) => {
          if(cartItemIds.length > 0){
            return {
              url:`/shopping_carts/${uuid}/begin_checkout?${cartItemIds?.map(id=> `cart_item_ids[]=${id}`).join("&")}`,
              headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
              
            }
        }
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      
      async onCacheEntryAdded(id, { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry, updateCachedData }) {
          
      },
      async onQueryStarted ({cartId}, {dispatch, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
        } catch (error) {
          // console.log( error)
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
            // console.log("params", params)
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
          // console.log("res", res.data.attributes)
          return {searchFilters:configObject(search_filters.data), searchResults:configObject(search_results.data)}
        }
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
    }),
    getCheckout: builder.query({
    
      query: () => ({
        url:'/checkout/history',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled }){

        try {
          const {data} = await queryFulfilled;
          
          const orderHistory = data; //data?.map(configObject);
          // console.log("itemInCart", itemsInCart)
         if(orderHistory.length){
            // orderHistory?.map((item)=>{
            //   const productUuids = []
              // console.log("item", item)
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
          // console.log( error)
        }
      },
      
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({uuid})=>({type:'Checkout-history', id:'checkout-'+uuid}))]
          : ['Checkout-history'] ,
      // Add this condition
      // skip: () => !isAuthorized(),
    }),
    getCheckoutItem: builder.query({
    
      query: (orderId) => ({
        url:`/checkout/history/${orderId}`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        

      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      // providesTags: ['Checkout']
    }),
    
    
    completeItemCheckout: builder.mutation({
      query: ({initialOrderItem, orderId}) => ({
        url: `/checkout/${orderId}/complete_checkout`,
        method: 'POST',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        body: {order:{...initialOrderItem}},
        
      }),
      transformResponse(res){
        return configObject(res.data)
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      // async onQueryStarted (arg, { dispatch, queryFulfilled }){

      //   try {
      //     const {data} = await queryFulfilled;
          
      //     // const itemInCart = data; //configObject(data);
      //     // dispatch(createdCartItem({
      //     //   uuid:itemInCart.uuid,
      //     //   itemCount: itemInCart.product_count,
      //     //   product:itemInCart.product,
      //     //   ItemStatus: itemInCart.item_status
      //     // }))
      //   } catch (error) {
          // console.log(error)
      //   }
      // },
      invalidatesTags: ['ShoppingCart','Checkout-history']

    }),
    
    addCartItem: builder.mutation({
      query: ({initialCartItem}) => ({
        url: `/shopping_carts/${sessionStorage.getItem("shoppingCartUuid")}`,
        method: 'POST',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        body: {shopping_cart:{
          id:sessionStorage.getItem("shoppingCartUuid"), 
          ...initialCartItem}
        },
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted ({}, { dispatch, queryFulfilled, getState }){

         try {
        
          const { data: newCartItem } = await queryFulfilled;
          const tags = ["ShoppingCart"]
          
          const toBeUpdated = apiSlice.util.selectInvalidatedBy(getState(), tags)

          
          // optimistically select the tags that would be invalidated
          // update rather than invalidate
          toBeUpdated.forEach(tag=>{
            const {endpointName, originalArgs, queryCacheKey} = tag
            dispatch(apiSlice.util.updateQueryData(endpointName, originalArgs, (draft)=>{
              const indexToRemove = draft.cartItems.findIndex((ci) => ci.product.priceVariation.oldPrice === newCartItem.product.priceVariation.oldPrice) 
              if (indexToRemove !== -1){
                draft.cartItems.splice(indexToRemove, 1)
              }
              draft.cartItems.unshift(newCartItem);
            }))
          })
        } catch {
          // If the mutation fails, the update will be automatically rolled back
        }
      },
      // invalidatesTags: ['ShoppingCart']
    }),
    updateCartItem: builder.mutation({
     query: ({itemUpdate,cartId}) => ({
        url:`/shopping_carts/${sessionStorage.getItem("shoppingCartUuid")}/cart_items/${cartId}`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        method:"PUT",
        body:{shopping_cart:{update:{...itemUpdate}}}
        
      }),
      transformResponse(res){
        return configObject(res.data)
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted ({cartId, itemUpdate}, { dispatch, queryFulfilled, getState }){
       
        try {
          const {data} = await queryFulfilled;
          const tags = [{ type: 'ShoppingCart', id: `cart-${cartId}` }]
          const toBeUpdated = apiSlice.util.selectInvalidatedBy(getState(),tags)

          // console.log(itemUpdate,"toBeUpdated", toBeUpdated);
          
          // toBeUpdated.forEach(tag=>{
            const {endpointName, originalArgs, queryCacheKey} = toBeUpdated[0]
            dispatch(apiSlice.util.updateQueryData(endpointName, originalArgs, (draft)=>{
                draft.cartItems.find(item=>item.uuid === cartId).itemCount = itemUpdate.item_count
            }))
        } catch (error) {
          // console.log( error)
        }

      },
      // invalidatesTags:  (result, error, arg) =>([{ type: 'ShoppingCart', id: "cart-"+arg.cartId }]),
    }),
    removeCartItem: builder.mutation({
      query: ({cartId}) => ({
        url: `/shopping_carts/${sessionStorage.getItem("shoppingCartUuid")}/cart_items/${cartId}`,
        method: 'DELETE',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        
      }),
      // transformResponse(res){
      //   return configObject(res.data)
      // },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted (arg, { dispatch, queryFulfilled, getState }){

        try {
          await queryFulfilled;
          // console.log('ars', arg)
          // const itemInCart = data; //configObject(data);
          const tags = ["ShoppingCart"]
          const toBeUpdated = apiSlice.util.selectInvalidatedBy(getState(), tags)
         

          // toBeUpdated.forEach(tag=>{
            const {endpointName, originalArgs, queryCacheKey} = toBeUpdated[0]
            dispatch(apiSlice.util.updateQueryData(endpointName, originalArgs, (draft)=>{
              draft.cartItems = draft.cartItems.filter(item => item.uuid !== arg.cartId);
            }))
        } catch (error) {
          // console.log(error)
        }
      },
      invalidatesTags: (result, error, arg) => ([{ type: 'ShoppingCart', id: "cart-"+arg.cartId }]),
    }),
    getProductReviews: builder.query({
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
          // console.log(error);
        }
      },
      
      providesTags: (result, error, arg) => {
        if (!result) return ['ProductReviews'];
        
        // console.log("result", result);
        
        const { reviews, questionAndAnswers } = result;
        const tags = [{ type: 'ProductReviews', id: arg.productId }];

        // Add tags for individual reviews
        if (reviews?.length) {
          reviews.forEach(review => {
            tags.push({ type: 'ProductReviews', id: `review-${review.uuid}` });
          });
        }

        // Add tags for Q&A entries
        if (questionAndAnswers?.length) {
          questionAndAnswers.forEach(qa => {
            // Tag for the Q&A entry itself
            tags.push({ type: 'ProductReviews', id: `qa-${qa.uuid}` });
            
            // Tag for the question
            if(qa.question){
              tags.push({ type: 'ProductReviews', id: `question-${qa.question.uuid}` });

              // Tags for each answer
              qa.question.answers?.forEach(answer => {
                tags.push({ type: 'ProductReviews', id: `answer-${answer.uuid}` });
              });

            }
            
          });
        }

        return tags;
      }
    }),
    addReview: builder.mutation({
      query: ({initialReview, productId, productReviewId}) => ({
        url: `/products/${productId}/product-reviews/${productReviewId}/reviews`,
        method: 'POST',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        body: initialReview,
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      // Invalidate the product reviews collection for this product
      // invalidatesTags: (result, error, arg) => [
      //   { type: 'ProductReviews', id: arg.productId }
      // ],
      // Optionally, you can use onQueryStarted to optimistically update the cache
      async onQueryStarted({ productId, initialReview }, { dispatch, queryFulfilled, getState }) {
        try {
          const {data:newReview} = await queryFulfilled;
          const tags = [{ type: 'ProductReviews', id: productId }]
          
          const toBeUpdated = apiSlice.util.selectInvalidatedBy(getState(), tags)

          
          // optimistically select the tags that would be invalidated
          // update rather than invalidate
          toBeUpdated.forEach(tag=>{
            const {endpointName, originalArgs, queryCacheKey} = tag
            dispatch(apiSlice.util.updateQueryData(endpointName, originalArgs, (draft)=>{
              draft.reviews.unshift(newReview);
            }))
          })
        } catch {
          // If the mutation fails, the update will be automatically rolled back
        }
      }
    }),
    updateReview: builder.mutation({
     query: ({reviewUpdate,productId, productReviewId, reviewId}) => ({
        url:`/products/${productId}/product-reviews/${productReviewId}/reviews/${reviewId}`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        method:"PUT",
        body:reviewUpdate
        
      }),
      transformResponse(res){
        return configObject(res.data)
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      invalidatesTags: (result, error, arg) => [
        { type: 'ProductReviews', id: `review-${arg.reviewId}` }
      ],
      async onQueryStarted({ productId, reviewId, reviewUpdate }, { dispatch, queryFulfilled, getState }) {
        try {
          const {data} = await queryFulfilled;
          // update the question in the cache
          const tags = [{ type: 'ProductReviews', id: `review-${reviewId}` }]
          const toBeUpdated = apiSlice.util.selectInvalidatedBy(tags)
          const {review, type} = reviewUpdate.product_review
          const [action, target, value] = type.split("_")
          const [attribute] = Object.keys(review)


          // toBeUpdated.forEach(tag=>{
            const {endpointName, originalArgs, queryCacheKey} = toBeUpdated[0]
            dispatch(apiSlice.util.updateQueryData(endpointName, originalArgs, (draft)=>{
              draft.reviews.find(review=>review.uuid === reviewId).attributes = data.attributes
            }))
        } catch {
          // If the mutation fails, the update will be automatically rolled back
        }
      }
    }),
    removeReview: builder.mutation({
      query: ({productId, productReviewId, reviewId}) => ({
        url: `/products/${productId}/product-reviews/${productReviewId}/reviews/${reviewId}`,
        method: 'DELETE',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        
      }),
      // transformResponse(res){
      //   return configObject(res.data)
      // },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted ({ productId, reviewId }, { dispatch, queryFulfilled, getState }){

        try {
          await queryFulfilled;
          // remove the question from the cache and replace it with the data returned
          // const {data} = await queryFulfilled;
          // update the question in the cache
          const tags = [{ type: 'ProductReviews', id: `review-${reviewId}` }]
          const toBeUpdated = apiSlice.util.selectInvalidatedBy(tags)
         

          // toBeUpdated.forEach(tag=>{
            const {endpointName, originalArgs, queryCacheKey} = toBeUpdated[0]
            dispatch(apiSlice.util.updateQueryData(endpointName, originalArgs, (draft)=>{
              draft.reviews = draft.reviews.filter(review => review.uuid !== reviewId);
            }))
        } catch (error) {
          // console.log(error)
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'ProductReviews', id: `review-${arg.reviewId}` }
      ]
    }),
    
    addQuestion: builder.mutation({
      query: ({initialPost, productId, productReviewId}) => ({
        url: `/products/${productId}/product-reviews/${productReviewId}/qandas`,
        method: 'POST',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        body: initialPost,
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      // this returns a new questionAnswerId, so we need to add that to the cache


      // invalidatesTags: (result, error, arg) => {console.log("result", result); return [
      //   { type: 'ProductReviews', id: `qa-${result.questionAnswerId}` },

      //   // { type: 'ProductReviews', id: arg.productId }
      // ]},
      // invalidatesTags: (result, error, arg) => [
      //   { type: 'ProductReviews', id: arg.productId }
      // ],
      async onQueryStarted({ productId, initialPost }, { dispatch, queryFulfilled, getState }) {
        try {
          
          const tags = [{ type: 'ProductReviews', id: productId }]
          
          const toBeUpdated = apiSlice.util.selectInvalidatedBy(getState(), tags)

          const { data: newQA, error } = await queryFulfilled;
          
          // optimistically select the tags that would be invalidated
          // update rather than invalidate
          toBeUpdated.forEach(tag=>{
            const {endpointName, originalArgs, queryCacheKey} = tag
            dispatch(apiSlice.util.updateQueryData(endpointName, originalArgs, (draft)=>{
              draft.questionAndAnswers.unshift(newQA);
            }))
          })
          // provide the new tags on productReview
          // add the tags for the newQA
          // dispatch(apiSlice.util.selectInvalidatedBy(['ProductReviews', `qa-${newQA.questionAnswerId}`]));
        } catch {
          // If the mutation fails, the update will be automatically rolled back
        }
      }
      
    }),
    updateQuestion: builder.mutation({
     query: ({postUpdate,productId, productReviewId, questionAnswerId, questionId}) => ({
        url:`/products/${productId}/product-reviews/${productReviewId}/qandas/${questionAnswerId}/question/${questionId}`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        method:"PUT",
        body:postUpdate
        
      }),
      transformResponse(res){
        return configObject(res.data)
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      // invalidatesTags: (result, error, arg) => [
      //   { type: 'ProductReviews', id: `question-${arg.questionId}` }
      // ]
      // do an optimistic update of the question in the cache
      async onQueryStarted({ productId, questionAnswerId,questionId, postUpdate }, { dispatch, queryFulfilled, getState }) {
        try {
          const {data} = await queryFulfilled;
          // update the question in the cache
          const tags = [{ type: 'ProductReviews', id: `question-${questionId}` }]
          const toBeUpdated = apiSlice.util.selectInvalidatedBy(tags)
          const {question, type} = postUpdate.product_review
          const [action, target, value] = type.split("_")
          const [attribute] = Object.keys(question)


          // toBeUpdated.forEach(tag=>{
            const {endpointName, originalArgs, queryCacheKey} = toBeUpdated[0]
            dispatch(apiSlice.util.updateQueryData(endpointName, originalArgs, (draft)=>{
              draft.questionAndAnswers.find(qa => qa.uuid === questionAnswerId).question[value][attribute] = data[value][attribute];
            }))
          // })
        } catch {
          // If the mutation fails, the update will be automatically rolled back
        }
      }
    }),
    removeQuestion: builder.mutation({
      query: ({productId, productReviewId, questionAnswerId, questionId}) => ({
        url: `/products/${productId}/product-reviews/${productReviewId}/qandas/${questionAnswerId}/question/${questionId}`,
        method: 'DELETE',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        
      }),
      // transformResponse(res){
      //   return configObject(res.data)
      // },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted ({ productId, questionAnswerId,questionId }, { dispatch, queryFulfilled, getState }){

        try {
          await queryFulfilled;
          // remove the question from the cache and replace it with the data returned
          // const {data} = await queryFulfilled;
          // update the question in the cache
          const tags = [{ type: 'ProductReviews', id: `question-${questionId}` }]
          const toBeUpdated = apiSlice.util.selectInvalidatedBy(tags)
         

          // toBeUpdated.forEach(tag=>{
            const {endpointName, originalArgs, queryCacheKey} = toBeUpdated[0]
            dispatch(apiSlice.util.updateQueryData(endpointName, originalArgs, (draft)=>{
              draft.questionAndAnswers = draft.questionAndAnswers.filter(qa => qa.uuid !== questionAnswerId);
            }))
          // })
          // dispatch(apiSlice.util.selectInvalidatedBy(['ProductReviews', `qa-${questionAnswerId}`]));
          // update the question_answer to readOnly
          // dispatch(apiSlice.util.updateQueryData('getProductReviews', { productId: arg.productId }, (draft) => {
          //   const questionAnswer = draft.questions_and_answers.find(qa => qa.uuid === arg.questionAnswerId);
          //   if (questionAnswer) {
          //     questionAnswer.readOnly = true;
          //   }
          // }));
        } catch (error) {
          // console.log(error)
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'ProductReviews', id: `qa-${arg.questionAnswerId}` }
      ]
    }),
    
    addAnswer: builder.mutation({
      query: ({initialPost, productId, productReviewId,questionAnswerId}) => ({
        url: `/products/${productId}/product-reviews/${productReviewId}/qandas/${questionAnswerId}/answers`,
        method: 'POST',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        body: initialPost,
        
      }),
      transformResponse(res){return configObject(res.data)},
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      // invalidatesTags: (result, error, arg) => [
      //   { type: 'ProductReviews', id: `qa-${arg.questionAnswerId}` }
      // ],
      async onQueryStarted({ productId, questionAnswerId, initialPost }, { dispatch, queryFulfilled, getState }) {
        try {
          const {data:newAnswer} = await queryFulfilled;
          const tags = [{ type: 'ProductReviews', id: `qa-${questionAnswerId}` }]
          
          const toBeUpdated = apiSlice.util.selectInvalidatedBy(getState(), tags)

          // optimistically select the tags that would be invalidated
          // update rather than invalidate
          const {endpointName, originalArgs, queryCacheKey} = toBeUpdated[0]
          // toBeUpdated.forEach(tag=>{
          dispatch(apiSlice.util.updateQueryData(endpointName, originalArgs, (draft)=>{
            const qa = draft.questionAndAnswers.find(qa => qa.uuid === questionAnswerId);
            if (qa) {
              qa.question.answers.push(newAnswer);
            }
          }));
        } catch {
          // If the mutation fails, the update will be automatically rolled back
        }
      }
    }),
    updateAnswer: builder.mutation({
     query: ({postUpdate,productId, productReviewId, questionAnswerId, answerId}) => ({
        url:`/products/${productId}/product-reviews/${productReviewId}/qandas/${questionAnswerId}/answers/${answerId}`,
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        method:"PUT",
        body:postUpdate
        
      }),
      transformResponse(res){
        return configObject(res.data)
      },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      // invalidatesTags: (result, error, arg) => [
      //   { type: 'ProductReviews', id: `answer-${arg.answerId}` }
      // ]
      async onQueryStarted({ productId, questionAnswerId, answerId, postUpdate }, { dispatch, queryFulfilled, getState }) {
        try {
          const {data} = await queryFulfilled;
          const tags = [{ type: 'ProductReviews', id: `answer-${answerId}` }]
          const toBeUpdated = apiSlice.util.selectInvalidatedBy(tags)
          const {answer, type} = postUpdate.product_review
          const [action, target, value] = type.split("_")
          const [attribute] = Object.keys(answer)

          const {endpointName, originalArgs, queryCacheKey} = toBeUpdated[0]
          dispatch(apiSlice.util.updateQueryData(endpointName, originalArgs, (draft)=>{
            draft.questionAndAnswers.find(qa => qa.uuid === questionAnswerId).question.answers.find(answer => answer.uuid === answerId)[value][attribute] = data[value][attribute];
          }));
        } catch {
          // If the mutation fails, the update will be automatically rolled back
        }
      }
    }),
    removeAnswer: builder.mutation({
      query: ({productId, productReviewId, questionAnswerId, answerId}) => ({
        url: `/products/${productId}/product-reviews/${productReviewId}/qandas/${questionAnswerId}/answers/${answerId}`,
        method: 'DELETE',
        headers: {"Authorization": `Bearer ${sess.getItem('jwt') || ""}`},
        
      }),
      // transformResponse(res){
      //   return configObject(res.data)
      // },
      transformErrorResponse(err){return err ? err.data?.errors : "unknown error"},
      async onQueryStarted ({ productId, questionAnswerId, answerId }, { dispatch, queryFulfilled, getState }){

        try {
          await queryFulfilled;
          // remove the answer from the cache
          const tags = [{ type: 'ProductReviews', id: `answer-${answerId}` }]
          const toBeUpdated = apiSlice.util.selectInvalidatedBy(tags)
          const {endpointName, originalArgs, queryCacheKey} = toBeUpdated[0]
          dispatch(apiSlice.util.updateQueryData(endpointName, originalArgs, (draft)=>{
            draft.questionAndAnswers.find(qa => qa.uuid === questionAnswerId).question.answers = draft.questionAndAnswers.find(qa => qa.uuid === questionAnswerId).question.answers.filter(answer => answer.uuid !== answerId);
          }));
        } catch (error) {
          // console.log(error)
        }
      },
      // invalidatesTags: (result, error, arg) => [
      //   { type: 'ProductReviews', id: `answer-${arg.answerId}` }
      // ]
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
   useLazyGetUserQuery,
   useGetUserProfileOverviewQuery,
   useLazyGetUserProfileOverviewQuery,
   useGetUserSettingsQuery,
   useLazyGetUserSettingsQuery,
   useGetUserReviewsQuery,
   useLazyGetUserReviewsQuery,
   useUpdateUserSettingsMutation,
   useGetStoresQuery,
   useLazyGetStoresQuery,
   useGetStoreQuery,
   useLazyGetStoreQuery,
   useGetStoreProductsQuery,
   useLazyGetStoreProductsQuery,
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
   useGetCatalogItemProductsQuery,
   useLazyGetCatalogItemProductsQuery,
   useGetShoppingCartQuery,
   useLazyGetShoppingCartQuery,
   useGetShoppingCartItemQuery,
   useGetCheckoutQuery,
   useLazyGetCheckoutQuery,
   useGetCheckoutItemQuery,
   useLazyGetCheckoutItemQuery,
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

