import { createSelector as createOrmSelector } from "redux-orm";


import {session } from '../reducers/rootOrmReducer';
import types from "../actions/actionTypes";
import { useSelector } from "react-redux";
import { addToProductData, calcDisc } from "../../components/icons";
import Store from "../../js/store";
import { configObject, momentDate } from "../../utilities";
import { updatedAuth } from "../models/AuthModel";
import { createSelector as createApiSelector } from '@reduxjs/toolkit';
// console.log(session, orm)

const ormSelector = state => state
const apiSelector = state => {
 return state.api
}
const dispatch = Store.dispatch


export const authenticatedUsersV2 = createApiSelector(
  apiSelector,
  (api)=> {
      console.log("api", Object.keys(api.queries))
    return [{...api.queries.getUser?.data, authStatus:types.AUTH_VALID}] || []
  }
)
export const authenticatedUsers = createOrmSelector(
  ormSelector(session.schema),
  (state )=> {
    const authObject = state.Auth
      .all()
      .toRefArray().filter((au)=> au.authStatus === types.AUTH_VALID)

    return authObject//(ex.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)

  }
)

export const isAuthedUserV2 = (id) => createApiSelector(
  apiSelector,
  authenticatedUsers,
  (api, auths) => {
    return auths?.some(u=> u?.uuid === id )
  }
)
export const isAuthedUser = (id) => createOrmSelector(
  ormSelector(session.schema),
  authenticatedUsers,
  (state,auths) => {
    if(!auths.length) return false
    // console.log("auths", auths, id)
    const user = auths.find(u=> u.uuid === id)
    const authStillValid = (u)=>{

      return momentDate().timeSinceInMins(new Date(u?.timeCreated)) < 5
    }
    if(authStillValid(user)){
      return user?.authStatus === types.AUTH_VALID//(ex.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    }
    dispatch(updatedAuth({uuid:user?.uuid, authStatus:types.AUTH_EXPIRED}))
  }
) 
export const categoriesV2 = createApiSelector(
  apiSelector,
  (api)=> {
    const catalog = api.queries.getCatalog.data
                            ?.map((d, x)=>({...d, attributes:{...d.attributes, active:x===0}}))
                            ?.map(configObject);
    catalog[0].active = true;
    return catalog
  }
)

export const categories=  createOrmSelector(
  ormSelector(session.schema),
  state => {
    const catObject = state.ProductCategory
    .all()
    .toRefArray()
    
    // console.log("", state.ProductCategory.withId("1"))
    return catObject//(ex.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    
  }
)

export const filteredListingsFromModelV2 = (ex)=> createApiSelector(
  apiSelector,
  categoriesV2,
  (api, categories)=>{ 
    return (ex.length ? categories.filter(el=> !ex.some((e)=> e=== el.uuid)) :  categories)
  }
)
export const filteredListingsFromModel = (ex)=> createOrmSelector(
  ormSelector(session.schema),
  state => {
   
    // console.log("running categories selector", )
    const catObject = state.ProductCategory//session.ProductCategory
    .all()
    .toRefArray()
    return (ex.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    
  }
)
export const toastMessage = createOrmSelector(
  ormSelector(session.schema),
  state =>{
    const messages = state.ToastMessage.filter((obj)=> obj.status !== types.TOAST_EXPIRED).toRefArray()
    return messages
  }
)
export const filteredProductsFromModelV2 = (ex)=> createApiSelector(
  apiSelector,
  (api)=>{
    return api.queries.getProducts.data?.map(configObject)
  }
)

export const filteredProductsFromModel = (ex)=> createOrmSelector(
  ormSelector(session.schema),
  state => {
    
    // console.log("catis", ex)
    return state.Product.all().toRefArray()
    
  }
)


export const useGetName=(model, id)=>{
  const name = createOrmSelector(
    ormSelector(session.schema),
    (state)=> state[model]?.withId(id)?.ref.name 
  )
  return useSelector(name)
}

    // export const checkouts = createSelector(
    //   ormSelector(session.schema),
    //   (state) =>{
    //     return state.Checkout.all().toRefArray()
    //   }
    // )
export const productsMatchingSearchV2 =(searchTextArr)=> createApiSelector(
  apiSelector,
  (api)=> api.queries.getProducts.data?.map(configObject).filter(p=> searchTextArr.some(t=> p.name.includes(t)))
)

export const productsMatchingSearch =(searchTextArr)=> createOrmSelector(
  ormSelector(session.schema),
  filteredProductsFromModel([]),
  (state,products)=> {
    
    return products.filter((i,x)=> searchTextArr.some((d,x)=>i.name.toString().includes(d.toString()) || d.toString().includes(i.name.toString())) )
    
  }
)

export const filteredOrdersFromModelV2 =()=> createApiSelector(
  apiSelector,
  (api)=> api.queries.getCheckout.data?.map(configObject)
)

export const filteredOrdersFromModel =()=>  createOrmSelector(
  ormSelector(session.schema),
  (state) => {
    return state.Order.all().toRefArray()
    
  }
)

export const orderedByUser =(productUuid)=>  createOrmSelector(
  ormSelector(session.schema),
  filteredOrdersFromModel(),
  (state, orders) => {
    
    return orders.some(o=> o.orderItems.some(oi=> productUuid.toString().includes(oi.uuid)))
  }
)

export const getNextId = (model)=> createOrmSelector(
  ormSelector(session.schema),
  (state)=> state[model].all().toRefArray().length+1
)
// Helper functions for cart filtering and sorting
const filterByStore = (cartItems) => {
  const filteredStoreObject = Object.create(null);
  cartItems.forEach((item) => {
    const storeName = item.product?.store.name + "-" + item.product?.store.uuid;
    if (filteredStoreObject[storeName]) {
      filteredStoreObject[storeName].push(item);
    } else {
      filteredStoreObject[storeName] = [item];
    }
  });
  return filteredStoreObject;
};

const sortByOrderStatus = (cartItems, orderStatuses) => {
  const matchingStatus = (item) => {
    return orderStatuses.some(status => status.includes(item.itemStatus.toString()));
  };
  
  const filterByStatus = ([k, v]) => {
    const items = v.filter(matchingStatus);
    if (items.length) return [k, items];
  };
  
  return Object.entries(cartItems)
    .map(filterByStatus)
    .filter(item => item !== undefined);
};

const addTotalCost = (store) => {
  if (Object.keys(store).length < 1) return [];
  return Object.keys(store).map(storeName => ({
    storeName: storeName.split("-")[0],
    uuid: storeName.split("-")[1],
    orders: store[storeName],
    currentCummulativeTotal: store[storeName]
      .map((orderItem) => orderItem.product?.price * orderItem.itemCount)
      .reduce((a, b) => a + b)
      .toFixed(1)
  }));
};



export const filteredCartItemsFromModelV1 = () => createOrmSelector(
  ormSelector(session.schema),
  filteredProductsFromModel([]),
  (state, products) => {

    
    const findProd = (id, priceVar) => {
      if (!id) return null
      const prod = products.find(p => (p.uuid === id))
      // console.log("prod", prod)
      
      return { uuid: prod.uuid, name: prod.name, store: {name:prod.storeName}, price: prod.discountTag ? prod.newPrice : prod.oldPrice, discountTag: prod.discountTag }
    }

    const CartItemsObj = state.CartItem.all().toModelArray().map((i, x, arr) => {
      // console.log("p", i)

      const p = i.product?.ref ? findProd(i.product?.ref.uuid, {oldPrice:i.ref.oldPrice, newPrice:i.ref.newPrice, discountTag:i.ref.discountTag}) : false
      const {itemCount, uuid, itemStatus, ...rest} = i.ref
      return {itemCount, uuid, itemStatus, product: p }

    })
    return CartItemsObj.filter(i => i !== undefined)

  }
)

    
export const filteredCartItemsFromModelV2 = () => createOrmSelector(
  ormSelector(session.schema),
  filteredProductsFromModel([]),
  (state, products) => {

    const makeProd = (product, priceVar) => {
      if (!product) return null
      // console.log("prod", prod)
      
      return { uuid: product.uuid, name: product.name, store: {name:product.store.name}, price: priceVar.discountTag ? priceVar.newPrice : priceVar.oldPrice, discountTag: priceVar.discountTag }
    }
    

    const CartItemsObj = state.CartItem.all().toModelArray().map((i, x, arr) => {
      const p = JSON.parse(i?.serializedProduct)
      
      const product = makeProd(p, p.priceVariation) 
      const {itemCount, uuid, itemStatus, ...rest} = i.ref
      return {itemCount, uuid, itemStatus, product }

    })
    
    
    return CartItemsObj.filter(i => i !== undefined)

  }
)

export const filteredCartItemsFromModelV3 = () => createApiSelector(
  apiSelector,
  (api)=> api.queries.getCheckout.data?.map(configObject)
)

export const getUnorderedCartItems = createOrmSelector(
  ormSelector(session.schema),
  filteredCartItemsFromModelV2(),
  (state, cartItems) => {
    if (!cartItems.length) return [];
    return addTotalCost(
      Object.fromEntries(
        sortByOrderStatus(
          filterByStore(
            Object.values(cartItems)
          ),
          [types.IN_CART, types.ORDERED_PENDING]
        )
      )
    );
  }
);

export const getUnorderedCartItemsV2 = createApiSelector(
  apiSelector,
  filteredCartItemsFromModelV2(),
  (api, cartItems)=> {
    if (!cartItems.length) return [];

    return addTotalCost(
      Object.fromEntries(
        sortByOrderStatus(
          filterByStore(
            Object.values(configObject(cartItems))
          ),
          [types.IN_CART, types.ORDERED_PENDING]
        )
      )
    );
  }
)

export const getCartUuid = createOrmSelector(
  ormSelector(session.schema),
  (state)=> sessionStorage.getItem("shoppingCartUuid")
    
)

export const getOrderedCartItems = createOrmSelector(
  ormSelector(session.schema),
  filteredCartItemsFromModelV2(),
  (state, cartItems) => {
    if (!cartItems.length) return [];
    return addTotalCost(
      Object.fromEntries(
        sortByOrderStatus(
          filterByStore(
            Object.values(cartItems)
          ),
          [types.OUT_CART, types.ORDERED_COMPLETE]
        )
      )
    );
  }
);

export const getOrderedCartItemsV2 = createApiSelector(
  apiSelector,
  filteredCartItemsFromModelV2(),
  (api, cartItems)=> {
    if (!cartItems.length) return [];
    return addTotalCost(
      Object.fromEntries(
        sortByOrderStatus(
          filterByStore(
            Object.values(configObject(cartItems))
          ),
          [types.OUT_CART, types.ORDERED_COMPLETE]
        )
      )
    );
  }
)
    
export const cartItemsSortedByStore =()=> createOrmSelector(
  ormSelector(session.schema),
  filteredCartItemsFromModelV2(),
  (state, cartItems)=> cartItems.sort((a,b)=> a.product?.store.name.localeCompare(b.product?.store.name))
)
export const cartItemsSortedByItemStatus =()=> createOrmSelector(
  ormSelector(session.schema),
  filteredCartItemsFromModelV2(),
  (state, cartItems)=> cartItems.sort((a,b)=> a.itemStatus.localeCompare(b.itemStatus))
)
export const cartItemsGroupedByStatus =()=> createOrmSelector(
  ormSelector(session.schema),
  filteredCartItemsFromModelV2(),
  (state, cartItems)=> cartItems.reduce((acc, item) => {
    acc[item.itemStatus] = (acc[item.itemStatus] || []).concat(item);
    return acc;
  }, {})
)
export const cartItemsGroupedByStore =()=> createOrmSelector(
  ormSelector(session.schema),
  filteredCartItemsFromModelV2(),
  (state, cartItems)=> cartItems.reduce((acc, item) => {
    acc[item.product?.store.name] = (acc[item.product?.store.name] || []).concat(item);
    return acc;
  }, {})
)
export const cartItemsReadyForDisplay =()=> createOrmSelector(
  ormSelector(session.schema),
  cartItemsGroupedByStatus(),
  cartItemsGroupedByStore(),
  (state, cartItems)=> cartItems.filter(i=> i.length)
)

export const cartItemsTotalV2 = ()=> createApiSelector(
  apiSelector,
  filteredCartItemsFromModelV2(),
  (cartItems)=> cartItems.reduce((acc, item) => acc + item.product?.price * item.itemCount, 0)
)

export const cartItemsTotal =()=> createOrmSelector(
  ormSelector(session.schema),
  filteredCartItemsFromModelV2(),
  (state, cartItems)=> cartItems.reduce((acc, item) => acc + item.product?.price * item.itemCount, 0)
)

export const cartItemsCountV2 =()=> createApiSelector(
  apiSelector,
  (api)=> api.queries.getCheckout?.data?.length || 0
)

export const cartItemsCount =()=> createOrmSelector(
  ormSelector(session.schema),
  // filteredOrdersFromModel(),
  (state, userAuthed) => {
    // let count;
    // count  = 0
    // // count  = 
    // return count = 
    return state.CartItem.all().filter(o => (o.itemStatus === types.IN_CART || o.ItemStatus === types.ORDERED_PENDING)).count() 
  }
)

export const isInCartV2 = (id) => createApiSelector(
  apiSelector,
  filteredCartItemsFromModelV2(),
  (api,cartItems)=> cartItems.some(i=> i.uuid === id && i.itemStatus === types.IN_CART)
)

export const isInCart = (id) => createOrmSelector(
  ormSelector(session.schema),
  // filteredOrdersFromModel(),
  (state) => {
    // console.log("id", id)
    if(!id) return false
    if(!state.CartItem.all().toModelArray().length) return false
    return state.CartItem.all().toModelArray().some(item=> {
      // console.log("item", item.ref.serializedProduct )
      
      return (JSON.parse(item.ref.serializedProduct).uuid === id && item.ref.itemStatus === types.IN_CART)
      // return (o.ref.product === id && o.ref.itemStatus === types.IN_CART)
    })
  }
)
    
    export const connectionRetries = createOrmSelector(
      ormSelector(session.schema),
      (state) =>{
        return state.ConnectionRetriesMonitor.last()
      }
    )

          