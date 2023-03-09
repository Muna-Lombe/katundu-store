import types from "../actions/actionTypes";
import { mapper } from "../utilities";
import { fromType } from "../utilities/StateLoader";

export default function customReducer({session, model,action }) {
  // console.log("acrion", session, model.modelName, action)
  const verb =()=> fromType(action.type).getActionWord()
  const defaultTarget =() => fromType(action.type).getModelName()
  const isTargetModel = (target=defaultTarget()) => model.modelName === target
  const {type, payload=[], meta={}} = action
  // console.log("acrion", type, payload, verb(), isTargetModel(), model.modelName)
  
  function batchDo({customFn,modelAction, data}){
  
    customFn ? 
      customFn()
      :(function(){
        // console.log("somn",modelAction.modelName,)
        const res = modelAction.create(data)
        // console.log("res",res)
      })()
  }

  // if(model.modelName !== target()) return session.state;
  switch (true){
    case type.includes("FETCH_SUCCESS"):
      break;

    case verb()=== "FETCH_DATA" && meta?.requestStatus?.includes(types.FULFILLED.toLocaleLowerCase()):
      const doCreate = (d) => {

        Object.values(d).forEach(o => {
          model.create(o)
          // console.log("res", res)
        })
        

      }
      const customDispatch = () => {
        for (const [m, d] of mapper(payload).deserialize) {
          // console.log("m & d", m,d)
          if (isTargetModel(m)) {
            // console.log("is", m, "target model? : ", isTargetModel(m))
            const result = isTargetModel(m) ? doCreate(d) : ''
          }
        }
      }
      

      batchDo({ customFn: customDispatch })
      
      break;

    case ( isTargetModel() && verb() + '_' + model.modelName) === (types.CREATE+'_'+model.modelName):
      batchDo({modelAction:model, data:payload})
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (types.ADD_TO+'_'+model.modelName):
      model.withId(payload.id)[payload.target].add(payload.target.data);
      // session.reduce();
      break;
    case (isTargetModel() && verb() + '_' + model.modelName) === (types.ADD + '_' + model.modelName):
      model.upsert(payload);
      // session.reduce();
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (types.ASSIGN+'_'+model.modelName):
      model.withId(payload.productId).categoryId = payload.categoryId;
      // session.reduce();
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (types.UPDATE+'_'+model.modelName):
      // console.log("update", payload, model.modelName, model.withId(payload.id))
      if("scope"){
        const {set, id, ...otherProps} = payload
  
        model.withId(id).update(set);
        if(otherProps?.fn) otherProps.fn()
      }
      // session.reduce();
      break;
    case (isTargetModel() && verb() + '_' + model.modelName) === (types.UPDATE_ALL + '_' + model.modelName):
      if("scope"){
        let { set, id, ...otherProps } = payload

        model.all().update(payload.set)
        if (otherProps?.fn) otherProps.fn()

      }
      // session.reduce();
      break;
    case (isTargetModel() && verb() + '_' + model.modelName) === (types.REMOVE + '_' + model.modelName):
      // model.withId(payload.id).delete();
      if("scope"){
        let { id, ...otherProps } = payload
        model.withId(payload.id).delete();
        if (otherProps?.fn) otherProps.fn()

      }


      // session.reduce();
      break;
    case (isTargetModel() && verb() + '_' + model.modelName) === (types.REMOVE_FROM + '_' + model.modelName):
      model.withId(payload.id)[payload.target].remove(payload.target.id);
      // session.reduce();
      break;
    case (isTargetModel() && verb() + '_' + model.modelName) === (types.REMOVE_ALL_OF + '_' + model.modelName):
      model.all().delete()
      // model.withId(payload.id)[payload.target].remove(payload.target.id);
      // session.reduce();
      break;
    // case (isTargetModel() && verb() + '_' + model.modelName) === (types.DELETE + '_' + model.modelName):
    //   model.withId(payload.id).delete();
    //   // session.reduce();
    //   break;
    default:
      return session.state
  }
  return session.state;
}
