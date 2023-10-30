import { createAsyncThunk } from "@reduxjs/toolkit";
import db from "../../assets/tests/jsonServer/db"
import { ThunkTypes } from "../actions/thunkTypes";
import { mapper } from ".";
import { actions } from "../actions/actionTypes";
// import { Map } from ".";


export const load = async ({model, loadmore, thunkFulfilled}) => {
  if (model) {
    let data = await db.makeRequest({request:model.dataName, filters:{range:model.range? {step:10,to: model.range, from:loadmore?.fromIdx} : undefined}})
 
    const props = { data, model }
    const action = { ...data }
    return action
  }
  
}


 

const payloadCreatorForMany = async (arg, thunkAPI) => {
  try {
    const promises = ThunkTypes.map(model => load({model}));
    const responses = await Promise.all(promises);
    const compiledResponse = new Map();
    ThunkTypes.forEach((model, idx) => {
      compiledResponse.set(model.modelName, responses[idx]);
    });
    // await thunkAPI.dispatch({ type: 'FETCH_SUCCESS', payload: compiledResponse });

    return mapper(compiledResponse).serialize;
  } catch (error) {
    thunkAPI.dispatch({ type: 'FETCH_ERROR', error });
    return error;
  }
}

const payloadCreatorForSingle =(thunktype) =>{
  return async (arg, thunkAPI) => {
    
    try {
      const compiledResponse = Object.create([])
        const response = await load({model:thunktype});
        // console.log("response", response)
        const action = { type: "orm/" + thunktype.modelName + "/CREATE", payload: response }
        const props = { response, actionType: "/CREATE", modelName: thunktype.modelName }
        compiledResponse.push({ [thunktype.modelName]: response })
        // console.log(thunkAPI)//.dispatch(action)

      return compiledResponse
    } catch (error) {
      thunkAPI.dispatch({ type: 'FETCH_ERROR', error });
      return error;
    }
  }
}


export const asyncThunk = createAsyncThunk('orm/Models/FETCH_DATA', payloadCreatorForMany);

// export const ormMiddlewares = ThunkTypes.map((e,i)=> {
//                                        return e = createAsyncThunk(
//                                         'orm/Model/LOAD_MORE_'+ThunkTypes[i].dataName+'',
//                                          payloadCreatorForSingle(ThunkTypes[i])
//                                          ) 
//                                       })
                                    

export const fromType = (type) => {
  let  model, actionWord, dispatchStatus = ""; 

  
  if(type.includes("orm/")){
    // console.log("orm", type)
    const arr = type.split("/")
    // orm = arr[0]; 
    model = arr[1];
    actionWord = arr[2];
    dispatchStatus = arr[3] ;
    
 }
  // type.startsWith("@@") ? type : type.includes("orm/") ? type.split("/",) : type.split("_")[1]
  return {
    
    getModelName: () => model,
    getActionWord: () => actionWord,
    getDispatchStatus: () => dispatchStatus
  }
}
