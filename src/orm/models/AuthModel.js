import { attr,Model} from "redux-orm";

import {actionCreator } from "../actions/actionTypes";

import PropTypes from 'prop-types';
// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class Auth extends Model {
  static reducer(action, Auth, session) {
    // return customReducer({ session, model: Auth, action })
     switch (action.type) {
        case "orm/Auth/CREATE":
            // console.log("sess", session)
            session.Auth.create(action.payload)
            // session.ProductCategory.active = action.payload.active //set("currCatId",action.payload)
            
            break;
        case "orm/Auth/UPDATE":
            // console.log("sess", action)
            const {uuid, ...rest} = action.payload 
            session.Auth.withId(uuid).update(rest)
            // session.ProductCategory.active = action.payload.active //set("currCatId",action.payload)
            
            break;
      }
  }
    
}
Auth.modelName = 'Auth';
Auth.propTypes = {
  uuid: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  timeCreated: PropTypes.string.isRequired,
  authStatus: PropTypes.string.isRequired
}
Auth.fields = {
  uuid: attr(),
  dateCreated: attr(),
  timeCreated: attr(),
  authStatus: attr()
};
Auth.options = {
  idAttribute: 'uuid'

}
export const { UPDATE: updatedAuth, REMOVE: removedAuth,  CREATE: createdAuth, } = actionCreator().createDefaultFor('Auth')
export default Auth;