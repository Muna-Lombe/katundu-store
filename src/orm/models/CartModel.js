import { attr,fk, Model } from "redux-orm";

import { actionCreator } from "../actions/actionTypes";
import customReducer from "./reducer";
import { isIterable } from "../utilities";
import PropTypes from 'prop-types';
// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class CartItem extends Model {
    static reducer(action, CartItem, session) {
    //     return customReducer({session, model:CartItem, action})
        switch (action.type) {
            case "orm/CartItem/ADD":{
                // console.log("sess", session)
                
                if(isIterable(action.payload)){
                    action.payload.forEach(load=> session.CartItem.upsert(load))
                    break;
                }
                session.CartItem.upsert(action.payload)
                break;
            }
            case "orm/CartItem/UPDATE":{
                // console.log("sess", action)
                const {uuid, ...rest} = action.payload 
                session.CartItem.withId(uuid).update(rest)
                // session.ProductCategory.active = action.payload.active //set("currCatId",action.payload)
                break;
            }
            case "orm/CartItem/REMOVE":{
                // session.CartItem.get({active:true})?.update({active:false})
                const {uuid, ...rest} = action.payload 

                session.CartItem.withId(uuid)?.delete() 
                break;
            }
            default:
             break;
        }
    }
    
//   
}
CartItem.modelName = 'CartItem';

CartItem.propTypes = {
    uuid: PropTypes.string.isRequired,
    product: PropTypes.object.isRequired,
    productCount: PropTypes.number.isRequired,
    itemStatus: PropTypes.string.isRequired
}


CartItem.fields = {
    uuid: attr(),
    // DateCreated: attr(),
    product: fk({to:'Product', as:'product', through:"ProductCartItem", relatedName: 'cartItems'}),
    // productVariationId: fk({ to: 'ProductVariation', as: 'productVariation', through: "VariationCartItem", relatedName: 'cartItems' }),
    productCount:attr(),
    itemStatus: attr()
};
CartItem.options={
    idAttribute:'uuid',
    
}

export const { UPDATE: updatedCartItem, UPDATE: checkedOutCartItem, UPDATE: orderedCartItem, REMOVE:removedCartItem, ADD:addedCartItem ,  CREATE:createdCartItem, REMOVE_FROM:removedCartItemFrom} = actionCreator().createDefaultFor('CartItem')
export default CartItem;