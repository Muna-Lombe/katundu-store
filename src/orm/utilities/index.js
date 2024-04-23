import moment from "moment"
import { apiSlice } from "../../js/middleware/queryHandler"
import { Sha256 } from "@aws-crypto/sha256-browser"




export const momentDate = () => {
  let time = moment().toDate().toTimeString()
  let date = moment().toDate().getDate()
  let month = moment().toDate().getMonth()
  let year = moment().toDate().getFullYear()
  return {
    full:year + "-" + month + "-" + date + "," + time,
    shortDate: year + "-" + month + "-" + date,
    time: time,
    timeSinceInMins: (past, now=new Date())=>{
      // return moment(now).diff(past, "days")
      let mnow = (new Date(now).getTime())
      let mpast = (new Date(past).getTime())
      return ((mnow - mpast )/ 60000).toFixed(1)
    }
  }
}


// let a = new serializableMap()
// a.
export const copyToClipboard = (e, text,setter) => {
  // console.log(text)
  navigator.clipboard.writeText(text)
  if(setter){
    setter()
  }

}

export const mapper = (obj)=>{

  let handler = {
    get: function (target, name) {
      return target.hasOwnProperty(name) ? target[name] : obj;
    }
  };

  let fn = {
    serialize: typeof obj === 'object' ? JSON.stringify(Array.from(obj.entries())) : obj,
    deserialize: typeof obj === 'string' ? new Map(JSON.parse(obj)) : obj
  };
  let p = new Proxy(fn, handler);
  return p
}
// export const ping = async (url) => {
//   let start = Date.now();
//   let response = await fetch(url);
  
//   return Date.now() - start;


// }
export function checkIfServerIsOnline(url) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });

}
export function setActiveUrl(url1, url2){
  let url = "";
  (async function(){
    let a = await checkIfServerIsOnline(url1);
    let b = await checkIfServerIsOnline(url2);
    let aValid = await a ? url1 : false;
    let bValid = await b ? url1 : false;
    url =  a ? url1 : b ? url2 : null;
  }())
  return url

}

export function isIterable(obj) {
  return obj && typeof obj[Symbol.iterator] === 'function';
}


export async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder('utf-8').encode(message);

  // hash the message
  const hashBuffer =  await (hash=>{hash.update(msgBuffer); return hash.digest()})(new Sha256())//await window?.crypto?.subtle?.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}

export const returnOnReload =  ()=>{
  let data = window.performance.getEntriesByType("navigation")
  console.log(data)
}
export const preloadCartItems = apiSlice.endpoints.getShoppingCart.initiate
export const preloadOrderHistory = apiSlice.endpoints.getCheckout.initiate
// window.onbeforeunload = function () {
//   window.setTimeout(function () {
//     console.log("loc", window.location)
//     // window.location = '-1';
//   }, 0);
//   window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser 
// }