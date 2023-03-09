import moment from "moment"




export const momentDate = () => {
  let time = moment().toDate().toTimeString()
  let date = moment().toDate().getDate()
  let month = moment().toDate().getMonth()
  let year = moment().toDate().getFullYear()
  return {
    full:year + "-" + month + "-" + date + "," + time,
    shortDate: year + "-" + month + "-" + date,
    time: time,
    timeSinceInMins: (psT, rcT=new Date())=>{
      // return moment(rcT).diff(psT, "days")
      let mrcT = (new Date(rcT).getTime())
      let mpsT = (new Date(psT).getTime())
      return ((mrcT - mpsT )/ 60000).toFixed(1)
    }
  }
}


// let a = new serializableMap()
// a.

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
export async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder('utf-8').encode(message);

  // hash the message
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  // console.log(hashHex);
  return hashHex;
}

export const returnOnReload =  ()=>{
  let data = window.performance.getEntriesByType("navigation")
  console.log(data)
}
// window.onbeforeunload = function () {
//   window.setTimeout(function () {
//     console.log("loc", window.location)
//     // window.location = '-1';
//   }, 0);
//   window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser 
// }