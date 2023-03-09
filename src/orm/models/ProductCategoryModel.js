import { attr, Model } from "redux-orm";
import { actions } from "../actions/actionTypes";
import customReducer from "./reducer";




class ProductCategory extends Model {
    static reducer(action, ProductCategory, session) {
        switch (action.type) {
            case "orm/ProductCategory/setCatActive":
                // session.ProductCategory.options.currCatId = action.payload //set("currCatId",action.payload)
                
                console.log("", session)
                break;
            case "orm/ProductCategory/removedCatActive":
                // session.ProductCategory.options.currCatId = action.payload //set("currCatId",action.payload)
                console.log("", session)
                break;
            case "orm/ProductCategory/removedAllCatActive":
                // session.ProductCategory.options.currCatId = action.payload //set("currCatId",action.payload)
                console.log("", session)
                break;
            default:
                customReducer({session, model:ProductCategory, action})
                break;
        }
    }
}
// ProductCategory.initialState = {currCatId: 0}
ProductCategory.modelName = 'ProductCategory';
ProductCategory.fields = {
    id: attr(),
    name: attr(),
    active: attr()  
}

ProductCategory.options = {
    idAttribute: 'id'
}
export const { UPDATE: updatedCatActive, UPDATE_ALL: updatedAllCatActive} = actions().createDefaultFor('ProductCategory')
// export const [updatedProductCategory, removedProductCategory, addedProductCategory, createdProductCategory, addedProductCategoryTo, removedProductCategoryFrom,] = actions().createDefaultFor('ProductCategory')
// export const setCatActive = actions().createCustomFor('ProductCategory', 'setCatActive')
// export const removedCatActive = actions().createCustomFor('ProductCategory', 'removedCatActive')
// export const removedAllCatActive = actions().createCustomFor('ProductCategory', 'removedAllCatActive')

export default ProductCategory;
