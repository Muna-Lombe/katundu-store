import { attr,Model} from "redux-orm";

import {actionCreator } from "../actions/actionTypes";
import customReducer from "./reducer";
import PropTypes from 'prop-types';
// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class Checkout extends Model {
  static reducer(action, Checkout, session) {
    // return customReducer({ session, model: Checkout, action })
     switch (action.type) {
        case "orm/Checkout/CREATE":
            // console.log("sess", session)
            session.Checkout.create(action.payload)
            // session.ProductCategory.active = action.payload.active //set("currCatId",action.payload)
            
            break;
        case "orm/Checkout/UPDATE":
            // console.log("sess", action)
            const {uuid, ...rest} = action.payload 
            session.Checkout.withId(uuid).update(rest)
            // session.ProductCategory.active = action.payload.active //set("currCatId",action.payload)
            
            break;
      }
  }
    
}
Checkout.modelName = 'Checkout';
Checkout.propTypes = {
  uuid: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
}
Checkout.fields = {
  uuid: attr(),
  status: attr()
};
Checkout.options = {
  idAttribute: 'uuid'

}
export const { UPDATE: updatedCheckout, REMOVE: removedCheckout,  CREATE: createdCheckout, } = actionCreator().createDefaultFor('Checkout')
export default Checkout;