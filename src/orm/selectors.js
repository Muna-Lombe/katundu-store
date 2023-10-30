import { createSelector } from "redux-orm";

import {session } from '../orm/reducers/rootOrmReducer';
import types from "./actions/actionTypes";
import {  useSelector } from "react-redux";
import { addToProductData, calcDisc } from "../assets";
import Store from "../js/store";
import { momentDate } from "./utilities";
import { updatedAuth } from "./models/AuthModel";
// console.log(session, orm)

const ormSelector = state => state

const dispatch = Store.dispatch
export const filteredCustomModelSelector = (model, ex) =>{
  return createSelector(
    ormSelector(session.schema),
    state => {

      const modObject = state[model]
        .all()
        .toRefArray()
      return modObject //(ex.length ? catObject.filter(el => !ex.some((e) => e === el.category_id)) : catObject)

    }
  )
} 


export const authenticatedUsers = createSelector(
  ormSelector(session.schema),
  state => {
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
    
    const user = auths.find(u=> u.id === id)
    const authStillValid = (u)=>{

      return momentDate().timeSinceInMins(new Date(u?.timeCreated)) < 5
    }
    if(authStillValid(user)){
      return user?.authStatus === types.AUTH_VALID//(ex.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    }
    dispatch(updatedAuth({id:user?.id, set:{authStatus:types.AUTH_EXPIRED}}))
  }
) 
export const categories=  createSelector(
  ormSelector(session.schema),
  state => {
    const catObject = state.ProductCategory
    .all()
    .toRefArray()

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

export const filteredProductsFromModel = (ex)=> createSelector(
  ormSelector(session.schema),
    state => {
      
      // console.log("catis", ex)
      const filteredProdsByCat = state.ProductCategory.filter(c => c.active)?.all()?.toModelArray()?.flatMap(i=>i.products?.all()?.toRefArray())
      
      const arr = filteredProdsByCat.length ? Array.from(new Set(filteredProdsByCat)) : state.Product.all().toRefArray()
      const productsArray = (ex.length ? arr.filter(ar=> ex.some(x=> x=== ar.id)): arr)
      .map((p,i) =>{
        let p1 = {
          ...p, 
          orders: state.Product.withId(p.id).orders.toRefArray(),
        images: state.Product.withId(p.id).images.toRefArray(),
        priceRange: state.Product.withId(p.id).variations.toRefArray().map((v)=> v.price),
        variations: state.Product.withId(p.id).variations.toRefArray()
        .map((v,vidx)=>{
          return {
              ...v,
              properties: state.ProductVariationProperty.all().toRefArray()
              .map((prop, pidx)=>{
                const value = state.ProductVariationProperty.withId(prop.id) //{ value_string, value_float, value_int }
                  .propertyValues.all()
                  .filter(val => (val.product_variation_id === v.id && val.product_variation_property_id === prop.id))
                  .toRefArray()[0]
                const listValues = state.ProductVariationProperty.withId(prop.id)
                .listValues.all()
                                  .filter(lv=> lv.product_variation_property_id === prop.id)
                                  .toRefArray().map(t=> ({title:t.title, value:t.value}))
                                  return {
                                    ...prop,
                  values: [(value?.value_string || value?.value_float || value?.value_int || listValues)].flat()  ,
                  // listValues: state.ProductVariationProperty.withId(prop.id).listValues.all().toRefArray(),
                }
              }),
            }
          }),
          
        }
        let id=i
        if(i !== 0){ id = i%6}
        // console.log("pr1",p1)
        // return p1
        return addToProductData(p1, id)
      });
      
      return productsArray
      // return (ex.length ? productsArray.filter(el=> ex.includes(el.category_id))/*.some((e)=> e === el.category_id))*/ :  productsArray)
      // console.log("running products selector 2",ex, productsArray[1].category_id)
    }
    )
    export const useGetName=(model, id)=>{
      const name = createSelector(
        ormSelector(session.schema),
        (state)=> state[model]?.withId(id)?.ref.name.slice(0,10)+"..." 
      )
      return useSelector(name)
    }
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
      export const getNextId = (model)=> createSelector(
        ormSelector(session.schema),
        (state)=> state[model].all().toRefArray().length+1
      )
    export const filteredCartItemsFromModel = () => createSelector(
      ormSelector(session.schema),
      filteredProductsFromModel([]),
      (state, products) => {

        // console.log("p", products)
        const findProd = (id, priceVarId) => {
          const prod = products.find(p => (p.id === id))
          prod.priceRange = prod.priceRange.find(pr => pr.id === priceVarId)
          // console.log("p", prod)
          const getDisc = (disc) => {
            if (disc[0]) {

              return calcDisc(prod.priceRange, disc[1])
            }
            return false
          }
          return { id: prod.id, name: prod.name, store: prod.store, price: prod.priceRange, isDiscounted: getDisc(prod.isDiscounted), images: [prod.images[0]] }
        }
        // 
        // console.log("rods", state.CartItem.all().toModelArray().products)
        const CartItemsObj = state.CartItem.all().toModelArray().map((i, x, arr) => {
          const p = findProd(i.product.ref.id)

          return { ...i.ref, product: p }

        })
        return CartItemsObj.filter(i => i !== undefined)

      }
    )
      export const cartItemsCount =()=> createSelector(
        ormSelector(session.schema),
        // filteredOrdersFromModel(),
        (state, orders) => state.CartItem.all().filter(o => (o.ItemStatus === types.IN_CART || o.ItemStatus === types.ORDERED_PENDING)).count()
      )
      export const isInCart = (id) => createSelector(
        ormSelector(session.schema),
        // filteredOrdersFromModel(),
        (state, orders) => state.CartItem.all().toModelArray().some(o=> o.product.ref.id === id)
      )
          