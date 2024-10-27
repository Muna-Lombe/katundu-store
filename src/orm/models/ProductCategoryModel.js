import { attr, Model } from "redux-orm";
import {actionCreator } from "../actions/actionTypes";
import customReducer from "./reducer";
import { isIterable } from "../../utilities";
import PropTypes from 'prop-types';



class ProductCategory extends Model {
    static reducer(action, ProductCategory, session) {
        // return  customReducer({session, model:ProductCategory, action})

        switch (action.type) {
            case "orm/ProductCategory/CREATED_CATALOG":
                // console.log("sess", session)
                
                if(isIterable(action.payload)){
                    action.payload.forEach(load=> session.ProductCategory.create(load))
                    break;
                }
                session.ProductCategory.create(action.payload)
                // session.ProductCategory.active = action.payload.active //set("currCatId",action.payload)
                
                break;
            case "orm/ProductCategory/TOGGLED_CATEGORY":
                // console.log("", session.ProductCategory.get({active:true}))
                session.ProductCategory.get({active:true})?.update({active:false})
                // session.ProductCategory.upsert(action.payload)
                const {uuid, ...rest} = action.payload 

                session.ProductCategory.withId(uuid)?.update(rest) //set("currCatId",action.payload)
                // console.log("", session)
                break;
            default:
                // customReducer({session, model:ProductCategory, action})
                break;
        }
        return session.state;
    }
}
// ProductCategory.initialState = {currCatId: 0}
ProductCategory.modelName = 'ProductCategory';
ProductCategory.propTypes = {
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
}
ProductCategory.fields = {
    uuid: attr(),
    name: attr(),
    active: attr()  
}

ProductCategory.options = {
    idAttribute: 'uuid'
}

// export const { UPDATE: updatedCatActive, CREATE: createdCat,  UPDATE_ALL: updatedAllCatActive} = actionCreator().createDefaultFor('ProductCategory')
// export const [updatedProductCategory, removedProductCategory, addedProductCategory, createdProductCategory, addedProductCategoryTo, removedProductCategoryFrom,] = actionCreator().createDefaultFor('ProductCategory')
export const createdCatalog = actionCreator().createCustomFor('ProductCategory', 'CREATED_CATALOG')
export const toggledCategory = actionCreator().createCustomFor('ProductCategory', 'TOGGLED_CATEGORY')
// export const removedAllCatActive = actionCreator().createCustomFor('ProductCategory', 'removedAllCatActive')



export default ProductCategory;
