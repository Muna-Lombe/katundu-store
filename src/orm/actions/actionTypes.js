import { createAction } from "@reduxjs/toolkit";


const constantsArr = ['UPDATE', 'UPDATE_ALL', 'REMOVE', 'ADD', 'CREATE', 'ADD_TO', 'REMOVE_FROM', 'REMOVE_ALL_OF', 'ASSIGN', 'FULFILLED', 'SET_LOADING', 'CLEAR_LOADING', 'FETCH_DATA', 'SELECT_PRODUCT', 'DELETE', 'ORDERED', 'IN_CART', 'ORDERED_PENDING',
  'ORDERED_COMPLETE', 'AUTH_VALID', 'AUTH_EXPIRED']

// export const [UPDATE, REMOVE, ADD, CREATE, ADD_TO, REMOVE_FROM, REMOVE_ALL_OF, ASSIGN, FULFILLED, SET_LOADING, CLEAR_LOADING, FETCH_DATA, SELECT_PRODUCT, DELETE,ORDERED, IN_CART] 
// = constantsArr;
const types = { 
    // UPDATE:'UPDATE',
    // UPDATE_ALL: 'UPDATE_ALL',
    // REMOVE:'REMOVE',
    // ADD:'ADD',
    // CREATE:'CREATE',
    // ADD_TO:'ADD_TO',
    // REMOVE_FROM:'REMOVE_FROM',
    // REMOVE_ALL_OF:'REMOVE_ALL_OF',
    // ASSIGN:'ASSIGN',
    // FULFILLED:'FULFILLED',
    // SET_LOADING:'SET_LOADING',
    // CLEAR_LOADING:'CLEAR_LOADING',
    // FETCH_DATA:'FETCH_DATA',
    // SELECT_PRODUCT:'SELECT_PRODUCT',
    // DELETE:'DELETE',
    // IN_CART:'IN_CART',
    // ORDERED_PENDING: 'ORDERED_PENDING',
    // ORDERED_COMPLETE: 'ORDERED_COMPLETE',
   }
constantsArr.forEach(e=> types[e]=e)
export function actions(){
  return {
  createCustomFor: (model, type) => createAction(`orm/${model}/` + type),
  createDefaultFor: (model)=> Object.fromEntries(constantsArr.map((i, d) => {
    // const key = [UPDATE, REMOVE, ADD, CREATE, ADD_TO, REMOVE_FROM, ASSIGN, FULFILLED, SET_LOADING, CLEAR_LOADING][d]
    const action = createAction(`orm/${model}/` + i)
    return[i,action]
    // return [i = createAction(`orm/${model}/` + [UPDATE, REMOVE, ADD, CREATE, ADD_TO, REMOVE_FROM, ASSIGN, FULFILLED, SET_LOADING, CLEAR_LOADING][d])]
  }))
}}
export default types;
// export const [updated, removed, added, created, addedTo, removedFrom, assigned, fulfilled, setLoading, clearedLoading] = actions

