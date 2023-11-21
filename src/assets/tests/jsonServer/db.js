import Get from "../Get.js";
import { api } from "../index.js";
import 
{
  Products,
  SortedProductCategories,
  ProductCategories,
  SortedProducts,
  ProductsByMaxRange,
  ProductImages,
  ProductVariations,
  ProductVariationProperties,
  ProductVariationPropertyListValues,
  ProductVariationPropertyValues
}

 from "./index" 
 export const getFrom = {
  Products,
  SortedProductCategories,
  ProductCategories,
  SortedProducts,
  ProductsByMaxRange,
  ProductVariations,
  ProductVariationProperties,
  ProductImages,
  ProductVariationPropertyListValues,
  ProductVariationPropertyValues,
  DB:function(prop, filters){
    const getIdx=(id)=>{
      return this[prop].findIndex((x)=> x.id === id)
      
    }
    if(filters.range) {
      return filters?.range?.from 
        ? this[prop].slice(getIdx(filters.range.from),getIdx(filters.range.from)+filters.range.step)
        : this[prop].slice(0,filters.range.to-1);
    }
    
    return this[prop];
  }
};

const get = new Get()

/**
 * 
 * @param {string} query the data to be queried from the database
 * @return {}
 */

const db = {
  
    lastRequest: new Date(2000, 0, 1),

    /**@param request (type String) - the dataname of the model to be fetched */
    /**@param filters (type Object) - default is undefined but the following structure must be passed {to:IntNumber, from:IntNumber} */
    makeRequest: async function({request, filters}) {
      // first check when last request was made
      const timeSinceLast = (new Date()).getTime() - this.lastRequest.getTime();
      this.lastRequest = new Date();
      if (timeSinceLast < 300) {
        this.lastRequest = new Date(this.lastRequest.getTime() + (300 - timeSinceLast));
        await new Promise((resolve) => setTimeout(resolve,300-timeSinceLast));
      }
      // if(request ==="Products"){
      //   return api.getProducts()
      // }
      return getFrom.DB(request,filters);
      // return getFromDB()
    },
  
}
export default db;