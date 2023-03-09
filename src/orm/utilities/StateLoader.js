import { createAsyncThunk, findNonSerializableValue } from "@reduxjs/toolkit";
import db from "../../assets/tests/jsonServer/db"
import { CREATE } from "../actions/actionTypes"
import { ThunkTypes } from "../actions/thunkTypes";
import { mapper } from ".";
// import { Map } from ".";


export const load = async (model, thunkFulfilled) => {
  if (model) {
    
    // console.log("path", url, searchParams)
    let data = await db.makeRequest(model.dataName, model.range)
    // console.log("data", data) 
    const props = { data, model }
    const action = { ...data }
    // return props
    // reduceState({props})
    // console.log("returned state", newState)

    return action
  }
  // if(thunkFulfilled){
  //     // session
  // }

}


const payloadCreatorForMany = async (arg, thunkAPI) => {
  try {
    const promises = ThunkTypes.map(model => load(model));
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

const payloadCreatorForSingle =(model) =>{
  return async (arg, thunkAPI) => {
    try {
      const compiledResponse = Object.create([])
      // ThunkTypes.forEach(async (model, idx) => {
        const response = await load(model);
        // console.log("response", response)
        const action = { type: "orm/" + model.modelName + "/CREATE", payload: response }
        const props = { response, actionType: "/CREATE", modelName: model.modelName }
        compiledResponse.push({ [model.modelName]: response })
        // console.log(thunkAPI)//.dispatch(action)

      // })
      return compiledResponse
    } catch (error) {
      thunkAPI.dispatch({ type: 'FETCH_ERROR', error });
      return error;
    }
  }
}
export const asyncThunk = createAsyncThunk('orm/Models/FETCH_DATA', payloadCreatorForMany);

export const ormMiddlewares = Array(ThunkTypes.length-5).fill().map((e,i)=> {return e = createAsyncThunk('orm/'+ThunkTypes[i].modelName+'/FETCH_DATA', payloadCreatorForSingle(ThunkTypes[i])) })

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
