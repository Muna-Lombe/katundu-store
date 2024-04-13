import { attr, many, Model } from "redux-orm";
// import { getPropTypesMixin } from "redux-orm-proptypes";
import {actionCreator } from "../actions/actionTypes";
import customReducer from "./reducer";
import PropTypes from 'prop-types';
// import { session } from "../reducers/rootOrmReducer";


// var ValidModel = getPropTypesMixin(Model)

class Product extends Model {
    static reducer(action, Product,session ){
        return customReducer({session, model:Product, action})
    }
    
}
Product.modelName = 'Product';
Product.propTypes = {
    name:  PropTypes.string.isRequired,
    newPrice: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    // categoryIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    discountTag: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    oldPrice: PropTypes.number.isRequired,
}
Product.fields = {
    uuid: attr(),
    name: attr(),
    newPrice: attr(),
    oldPrice: attr(),
    slug: attr(),
    discountTag: attr(),
    imageUrl: attr(),
    description: attr(),
    // categoryIds: many({to:'ProductCategory', as:'categoryIds', relatedName: 'products'}),
}

Product.options = {
    idAttribute: 'uuid'
}
export const { UPDATE: updatedProduct, REMOVE: removedProduct, ADD: addedProduct, CREATE: createdProduct, UPSERT:upsetedProduct,  ADD_TO: addedProductTo, REMOVE_FROM: removedProductFrom } = actionCreator().createDefaultFor('Product')

export default Product;


