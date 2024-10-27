import { createSelector } from "redux-orm";

import {session } from '../orm/reducers/rootOrmReducer';
import types from "./actions/actionTypes";
import {  useSelector } from "react-redux";
import { addToProductData, calcDisc } from "../components/icons";
import Store from "../js/store";
import { momentDate } from "../utilities";
import { updatedAuth } from "./models/AuthModel";
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
    export const filteredCartItemsFromModel = () => createSelector(
      ormSelector(session.schema),
      filteredProductsFromModel([]),
      (state, products) => {

        
        const findProd = (id, priceVar) => {
          if (!id) return null
          const prod = products.find(p => (p.uuid === id))
          // console.log("prod", prod)
          
          return { uuid: prod.uuid, name: prod.name, store: {name:prod.storeName}, price: prod.discountTag ? prod.newPrice : prod.oldPrice, discountTag: prod.discountTag }
        }
        // 
        // console.log("rods", state.CartItem.all().toModelArray().products)
        // console.log( "sess",state.CartItem.exists( '7ab7b782eb2f64be933807da3eb01552'))
        const CartItemsObj = state.CartItem.all().toModelArray().map((i, x, arr) => {
          // console.log("p", i)

          const p = i.product?.ref ? findProd(i.product?.ref.uuid, {oldPrice:i.ref.oldPrice, newPrice:i.ref.newPrice, discountTag:i.ref.discountTag}) : false
          const {productCount, uuid, itemStatus, ...rest} = i.ref
          return {productCount, uuid, itemStatus, product: p }

        })
        return CartItemsObj.filter(i => i !== undefined)

      }
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
        (state, orders) => {
          return state.CartItem.all().toModelArray().some(o=> {
            // console.log("", o )

            return (o.ref.product === id && o.ref.itemStatus === types.IN_CART)
          })
        }
      )
      
      export const connectionRetries = createSelector(
        ormSelector(session.schema),
        (state) =>{
          return state.ConnectionRetriesMonitor.last()
        }
      )

          