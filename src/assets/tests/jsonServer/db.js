import 
{
  Products,
  SortedProductCategories,
  ProductCategories,
  SortedProducts,
  ProductsByMaxRange,
  LazyLoad,
  OneProduct,
  ProductImages,
  OneProductImage,
  ProductVariations,
  ProductVariationProperties,
  OneProductVariation,
  OneProductVariationProperties,
  ProductVariationPropertyListValues,
  OneProductVariationPropertyListValues,
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
  DB:function(prop, range){
    if(range)return this[prop].slice(0,range-1);
    return this[prop];
  }
};


/**
 * 
 * @param {string} query the data to be queried from the database
 * @return {}
 */
const db = {
  // return {
    lastRequest: new Date(2000, 0, 1),
    makeRequest: async function(request, filter) {
      // first check when last request was made
      const timeSinceLast = (new Date()).getTime() - this.lastRequest.getTime();
      this.lastRequest = new Date();
      if (timeSinceLast < 1000) {
        this.lastRequest = new Date(this.lastRequest.getTime() + (1000 - timeSinceLast));
        await new Promise((resolve) => setTimeout(resolve, 1000-timeSinceLast));
      }
      return getFrom.DB(request,filter);
    },
  // };
  // return requester
}
export default db;