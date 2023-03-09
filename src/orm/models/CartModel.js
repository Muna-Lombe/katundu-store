import { attr,fk, many, Model, ORM } from "redux-orm";

import {  actions } from "../actions/actionTypes";
import customReducer from "./reducer";

// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class CartItem extends Model {
    static reducer(action, CartItem, session) {
        return customReducer({session, model:CartItem, action})
    }
//   
}
CartItem.modelName = 'CartItem';
CartItem.fields = {
    id: attr(),
    DateCreated: attr(),
    product: fk({to:'Product', as:'product', through:"ProductCartItem", relatedName: 'cartItems'}),
    productCount:attr(),
    ItemStatus: attr()
};
export const { UPDATE: updatedCartItem, UPDATE: checkedOutCartItem, UPDATE: orderedCartItem, REMOVE:removedCartItem, ADD:addedCartItem ,  CREATE:createdCartItem, REMOVE_FROM:removedCartItemFrom} = actions().createDefaultFor('CartItem')
export default CartItem;