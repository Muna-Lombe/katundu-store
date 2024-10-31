import { createSelector } from "redux-orm";

import {session } from '../reducers/rootOrmReducer';
import types from "../actions/actionTypes";
import {  useSelector } from "react-redux";
import { addToProductData, calcDisc } from "../../components/icons";
import Store from "../../js/store";
import { momentDate } from "../../utilities";
import { updatedAuth } from "../models/AuthModel";
// console.log(session, orm)

const ormSelector = state => state
const dispatch = Store.dispatch

// export const filteredCustomModelSelector = (model, ex) =>{
//   return createSelector(
//     ormSelector(session.schema),
//     state => {

//       const modObject = state[model]
//         .all()
//         .toRefArray()
//       return modObject //(ex.length ? catObject.filter(el => !ex.some((e) => e === el.category_id)) : catObject)

//     }
//   )
// } 


export const authenticatedUsers = createSelector(
  ormSelector(session.schema),
  (state )=> {
    const authObject = state.Auth
      .all()
      .toRefArray().filter((au)=> au.authStatus === types.AUTH_VALID)

    return authObject//(ex.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)

  }
)

export const isAuthedUser = (id) => createSelector(
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
export const categories=  createSelector(
  ormSelector(session.schema),
  state => {
    const catObject = state.ProductCategory
    .all()
    .toRefArray()
    
    // console.log("", state.ProductCategory.withId("1"))
    return catObject//(ex.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    
  }
)

export const filteredListingsFromModel = (ex)=> createSelector(
  ormSelector(session.schema),
  state => {
   
    // console.log("running categories selector", )
    const catObject = state.ProductCategory//session.ProductCategory
    .all()
    .toRefArray()
    return (ex.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    
  }
)
export const toastMessage = createSelector(
  ormSelector(session.schema),
  state =>{
    const messages = state.ToastMessage.filter((obj)=> obj.status !== types.TOAST_EXPIRED).toRefArray()
    return messages
  }
)
export const filteredProductsFromModel = (ex)=> createSelector(
  ormSelector(session.schema),
    state => {
      
      // console.log("catis", ex)
      return state.Product.all().toRefArray()
      
    }
    )
    export const useGetName=(model, id)=>{
      const name = createSelector(
        ormSelector(session.schema),
        (state)=> state[model]?.withId(id)?.ref.name 
      )
      return useSelector(name)
    }

    export const checkouts = createSelector(
      ormSelector(session.schema),
      (state) =>{
        return state.Checkout.all().toRefArray()
      }
    )
    export const productsMatchingSearch =(searchTextArr)=> createSelector(
      ormSelector(session.schema),
      filteredProductsFromModel([]),
      (state,products)=> {
        
        return products.filter((i,x)=> searchTextArr.some((d,x)=>i.name.toString().includes(d.toString()) || d.toString().includes(i.name.toString())) )
        
      }
    )
    
    export const filteredOrdersFromModel =()=>  createSelector(
      ormSelector(session.schema),
      (state) => {
        return state.Order.all().toRefArray()
        
      }
    )
    export const orderedByUser =(productUuid)=>  createSelector(
      ormSelector(session.schema),
      filteredOrdersFromModel(),
      (state, orders) => {
        
        return orders.some(o=> o.orderItems.some(oi=> productUuid.toString().includes(oi.uuid)))
      }
    )
    export const getNextId = (model)=> createSelector(
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



    export const filteredCartItemsFromModelV1 = () => createSelector(
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

    
    export const filteredCartItemsFromModelV2 = () => createSelector(
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


    export const getUnorderedCartItems = createSelector(
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
    export const getCartUuid = createSelector(
      ormSelector(session.schema),
      (state)=> sessionStorage.getItem("shoppingCartUuid")
        
    )
    export const getOrderedCartItems = createSelector(
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

    
    export const cartItemsSortedByStore =()=> createSelector(
      ormSelector(session.schema),
      filteredCartItemsFromModelV2(),
      (state, cartItems)=> cartItems.sort((a,b)=> a.product?.store.name.localeCompare(b.product?.store.name))
    )
    export const cartItemsSortedByItemStatus =()=> createSelector(
      ormSelector(session.schema),
      filteredCartItemsFromModelV2(),
      (state, cartItems)=> cartItems.sort((a,b)=> a.itemStatus.localeCompare(b.itemStatus))
    )
    export const cartItemsGroupedByStatus =()=> createSelector(
      ormSelector(session.schema),
      filteredCartItemsFromModelV2(),
      (state, cartItems)=> cartItems.reduce((acc, item) => {
        acc[item.itemStatus] = (acc[item.itemStatus] || []).concat(item);
        return acc;
      }, {})
    )
    export const cartItemsGroupedByStore =()=> createSelector(
      ormSelector(session.schema),
      filteredCartItemsFromModelV2(),
      (state, cartItems)=> cartItems.reduce((acc, item) => {
        acc[item.product?.store.name] = (acc[item.product?.store.name] || []).concat(item);
        return acc;
      }, {})
    )
    export const cartItemsReadyForDisplay =()=> createSelector(
      ormSelector(session.schema),
      cartItemsGroupedByStatus(),
      cartItemsGroupedByStore(),
      (state, cartItems)=> cartItems.filter(i=> i.length)
    )

    export const cartItemsTotal =()=> createSelector(
      ormSelector(session.schema),
      filteredCartItemsFromModelV2(),
      (state, cartItems)=> cartItems.reduce((acc, item) => acc + item.product?.price * item.itemCount, 0)
    )


    export const cartItemsCount =()=> createSelector(
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
    export const isInCart = (id) => createSelector(
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
    
    export const connectionRetries = createSelector(
      ormSelector(session.schema),
      (state) =>{
        return state.ConnectionRetriesMonitor.last()
      }
    )

          