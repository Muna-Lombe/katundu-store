import { attr, Model, fk, many } from "redux-orm";
import { actions } from "../actions/actionTypes";
import customReducer from "./reducer";



const baseModelCreator = (model) =>{
  
  const fieldType ={
    "fk": (one, lots)=> fk(one,lots),
    "attr":attr(),
    "many":(one, as, lots)=> many({to:one, as:as, relatedName: lots})
  }

  const { UPDATE: updated, REMOVE: removed, ADD: added,CREATE: created, ADD_TO: addedTo, REMOVE_FROM: removedFrom} = actions().createDefaultFor(model.modelName)
  
  // r={
  //   type:`orm/${model.modelName}/+${model.actions["delete"]}`,

  // }
  // const setterArray = new Map()
  // model.reducerActions.forEach(r=>(
  //   setterArray.set(r.type,function() {
  //     case :
  //               const record = BaseModel.withId(action.payload);
  //               record.delete();
  //               break;
  //   })
  // ))

  let reducer = (action, model, session)=>{


  }
  let fields = model.fields.reduce((obj, f)=> (
    obj[f.name]= (typeof fieldType[f.type] === 'function'
              ? f.type === "fk"
                ? fieldType[f.type](f.one, f.lots) 
                : fieldType[f.type](f.one, f.as, f.lots)
              : fieldType[f.type]
              ),
    obj
  ), {})

  let options = model.options
 
  const baseModelProps = {
    baseModel:model,
    baseModelFields:fields,
    baseModelOptions:options
  }
  
 
  
    // BaseModel.modelName=model.modelName
  
  return {
      actions:  {updated, removed, added, created, addedTo, removedFrom}, 
  
      [model.className]:()=>{

        //  new BaseModel({baseModelProps})
        
        class BaseModel extends Model {
          // constructor({_fields, baseModelProps}){
            //     super()
            //     this.baseModel = baseModelProps.baseModel
            //     this.baseModelFields = baseModelProps.baseModelFields
          //     this.baseModelOptions = baseModelProps.baseModelOptions
          // }
          
          static reducer(action,BaseModel, session) {
            // console.log("reducer\n"," action:", action, "\n model:",BaseModel, "\n session:", session)
            // console.log(action.type, " and ", `orm/${model.modelName}/${model.actions["create"]}`, " is create? ",action.type === `orm/${model.modelName}/${model.actions["create"]}`)
            const  verb = action.type.split('/').at(-1)
            switch (action.type) {
              
              case `orm/${model.modelName}/${model.actions["create"]}`: 
                BaseModel.create(action.payload);
                break;

              case `orm/${model.modelName}/${model.actions["update"]}`:
                BaseModel.withId(action.payload.id).update(action.payload);
                break;
                
              case `orm/${model.modelName}/${model.actions["remove"]}`:
                console.log(`orm/${model.modelName}/+${model.actions["remove"]}`)
                const record = BaseModel.withId(action.payload.id);
                console.log(record)
                record.delete();
                break;

              case action.payload?.id && `orm/${model.modelName}/+${model.actions[verb]}`:
                BaseModel.withId(action.payload.id)[verb](action.payload)
                break;
              
              case  `orm/${model.modelName}/${model.actions[verb]}`:
                BaseModel[verb](action.payload)
                break;  
              }
                
              return session;
            }

          static get modelName(){
            // return this.baseModel.modelName
            return model.modelName
          }
          static get fields(){
            // return this.baseModelFields
            return fields
          }
          static get options(){
            // return this.BaseModelOptions
            return options
          }
          
        }
            Object.defineProperty(BaseModel, 'name',{value:model.className})
            return BaseModel
      }
  }
}
export default baseModelCreator;