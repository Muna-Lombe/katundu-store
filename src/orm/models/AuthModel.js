import { attr,Model} from "redux-orm";

import { actions } from "../actions/actionTypes";
import customReducer from "./reducer";

// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class Auth extends Model {
  static reducer(action, Auth, session) {
    return customReducer({ session, model: Auth, action })
  }
  //   
}
Auth.modelName = 'Auth';
Auth.fields = {
  id: attr(),
  dateCreated: attr(),
  timeCreated: attr(),
  authStatus: attr()
};
export const { UPDATE: updatedAuth, REMOVE: removedAuth,  CREATE: createdAuth, } = actions().createDefaultFor('Auth')
export default Auth;