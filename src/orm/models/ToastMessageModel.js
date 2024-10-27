import { attr,Model} from "redux-orm";

import {actionCreator } from "../actions/actionTypes";
import customReducer from "./reducer";
import { isIterable, momentDate } from "../../utilities";

// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class ToastMessage extends Model {
  static reducer(action, ToastMessage, session) {
    // return customReducer({ session, model: ToastMessage, action })
    switch (action.type) {
            case "orm/ToastMessage/CREATE":
                // console.log("sess", session)
                
                if(isIterable(action.payload)){
                    action.payload.forEach(load=> session.ToastMessage.create(load))
                    break;
                }
                session.ToastMessage.create(action.payload)
                break;
            case "orm/ToastMessage/UPDATE":
                // session.ToastMessage.get({active:true})?.update({active:false})
                session.ToastMessage.withId(action.payload.uuid)?.update(action.payload) 
                break;
            default:
             break;
        }
  }
    
}
ToastMessage.modelName = 'ToastMessage';
ToastMessage.fields = {
  uuid: attr(),
  id: attr(),
  timestamp: attr(),
  type: attr(),
  text: attr(),
  status: attr()
};

ToastMessage.options = {
  idAttribute: 'uuid'

}; 

export const { UPDATE:updatedToastMessage, REMOVE: removedToastMessage,  CREATE: createdToastMessage, } = actionCreator().createDefaultFor('ToastMessage', (payload)=>({payload:{timestamp: momentDate().time, ...payload}}))
export default ToastMessage;