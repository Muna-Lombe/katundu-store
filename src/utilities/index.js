import moment from "moment"
import { apiSlice } from "../js/middleware/queryHandler"
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

export const handleLoadTest = (dispatch, createdOrderItem) => {
  const finalOrderData = [
    {
      type: 'orm/Order/CREATE',
      payload: {
        id: 'aqr5hr7e-1',
        DateCreated: '2023-2-23,08:29:51 GMT+0300 (Moscow Standard Time)',
        productIds: [2001, 2017, 2011],
        OrderProps: {
          quantity: [
            { productId: 2001, price: '329', quantity: 1 },
            { productId: 2017, price: '44', quantity: 1 },
            { productId: 2011, price: '408', quantity: 1 }
          ],
          deliveryDate: '2023-03-23',
          deliveryTime: '11:33',
          deliveryAddress: "Ylitsa Dement'yeva",
          receiver: 'Tony valeska',
          receiverPhone: '+79656229755',
          orderCost: 781,
          deliveryCost: 200,
          totalCost: 981,
          storeName: "Davies' Store"
        },
        status: ['ordered', 'complete']
      }
    },
    {
      type: 'orm/Order/CREATE',
      payload: {
        id: 'q1ndxo6p-2',
        DateCreated: '2023-2-23,08:30:50 GMT+0300 (Moscow Standard Time)',
        productIds: [2012],
        OrderProps: {
          quantity: [{ productId: 2012, price: '9', quantity: 1 }],
          deliveryDate: '2023-03-23',
          deliveryTime: '09:32',
          deliveryAddress: "Ylitsa Dement'yeva",
          receiver: 'Tony valeska',
          receiverPhone: '+79656229755',
          orderCost: 9,
          deliveryCost: 200,
          totalCost: 209,
          storeName: 'Clear fawn'
        },
        status: ['ordered', 'complete']
      }
    },
    {
      type: 'orm/Order/CREATE',
      payload: {
        id: 'n3z6tjk7-3',
        DateCreated: '2023-2-23,08:31:21 GMT+0300 (Moscow Standard Time)',
        productIds: [2010],
        OrderProps: {
          quantity: [{ productId: 2010, price: 104, quantity: 1 }],
          deliveryDate: '2023-03-23',
          deliveryTime: '11:33',
          deliveryAddress: "Ylitsa Dement'yeva",
          receiver: 'Tony valeska',
          receiverPhone: '+79656229755',
          orderCost: 104,
          deliveryCost: 200,
          totalCost: 304,
          storeName: 'Avita'
        },
        status: ['ordered', 'complete']
      }
    }
  ]
  finalOrderData.forEach(od => dispatch(createdOrderItem(od.payload)))
}

export function isIterable(obj) {
  return obj && typeof obj[Symbol.iterator] === 'function';
}

export const encodeUrlWWWFormComponent = (str)=>{
  return str.replace(/\s+/g, '+')
};

export function generateNonce() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
export async function createAuthKey(password, nonce) {
  // remove whitespaces from password
  const hashedPassword = await sha256(password.replace(/\s+/g, ''));
  // 
  return `${nonce}:${hashedPassword}`;
}

async function sha256(message) {
  
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

export const handleRotateIco = (e, id) => {
  const elem = e.target || e
  // console.log(elem)
  if (e.type === 'click') e.preventDefault()
  if (e.type === 'click') e.stopPropagation()
  const ordSum = document.getElementById('order-summary' + id)
  const ordLst = document.getElementById('order-list' + id)
  const ico = document.querySelector('.order-item-expand-ico')
  const findNear = child => {
    return child.previousSibling || child.nextSibling
  }
  const toggleReplace = (classList, one, two) => {
    classList.replace(one, two) || classList.replace(two, one)
  }
  const clickedSvg = () => elem.tagName === 'svg'
  const clickedP = () => elem.tagName === 'p'
  let child
  if (clickedSvg()) child = elem
  if (clickedP()) child = elem.firstChild

  if (ico.classList.contains('-rotate-180')) {
    ico.classList.replace('-rotate-180', 'rotate-180')
    // const nearico = findNear(ico)
    // if (nearico.tagName === "INPUT" && nearico.type === "checkbox" && nearico.id === "show-more-checkbox"){
    //   nearico.checked=true
    // }
    toggleReplace(ordLst.classList, 'visible', 'hidden')
    toggleReplace(ordSum.classList, 'hidden', 'visible')
  } else {
    ico.classList.replace('rotate-180', '-rotate-180')
    // optgrp().classList.replace("visible", "hidden")
    toggleReplace(ordSum.classList, 'visible', 'hidden')
    toggleReplace(ordLst.classList, 'hidden', 'visible')
  }
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