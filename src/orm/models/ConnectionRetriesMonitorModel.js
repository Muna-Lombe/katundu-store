import { attr,Model} from "redux-orm";

import {actionCreator } from "../actions/actionTypes";
import customReducer from "./reducer";
import { isIterable, momentDate } from "../../utilities";

// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class ConnectionRetriesMonitor extends Model {
  static reducer(action, ConnectionRetriesMonitor, session) {
    // return customReducer({ session, model: ConnectionRetriesMonitor, action })
    switch (action.type) {
            case "orm/ConnectionRetriesMonitor/CREATE":
                // console.log("sess", session)
                
                if(isIterable(action.payload)){
                    action.payload.forEach(load=> session.ConnectionRetriesMonitor.create(load))
                    break;
                }
                session.ConnectionRetriesMonitor.create(action.payload)
                break;
            case "orm/ConnectionRetriesMonitor/UPSERT":
                session.ConnectionRetriesMonitor.upsert(action.payload)
                break;
            case "orm/ConnectionRetriesMonitor/UPDATE":
                // session.ConnectionRetriesMonitor.get({active:true})?.update({active:false})
                session.ConnectionRetriesMonitor.withId(action.payload.uuid)?.update(action.payload) 
                break;
            default:
             break;
        }
  }
    
}
ConnectionRetriesMonitor.modelName = 'ConnectionRetriesMonitor';
ConnectionRetriesMonitor.fields = {
  uuid: attr(),
  id: attr(),
  timestamp: attr(),
  attempt: attr(),
  status: attr()
};

ConnectionRetriesMonitor.options = {
  idAttribute: 'uuid'

}; 

export const { UPDATE:updatedConnectionRetriesMonitor, REMOVE: removedConnectionRetriesMonitor,  CREATE: createdConnectionRetriesMonitor, UPSERT:upsertedConnectionRetriesMonitor } = actionCreator().createDefaultFor('ConnectionRetriesMonitor', (payload)=>({payload:{timestamp: momentDate().time, ...payload}}))
export default ConnectionRetriesMonitor;