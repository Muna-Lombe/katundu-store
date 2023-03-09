import { attr,fk, many, Model, oneToOne, ORM } from "redux-orm";
import { PropTypes } from 'react';
// import { getPropTypesMixin } from "redux-orm-proptypes";
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN, actions } from "../actions/actionTypes";
import { createSlice } from "@reduxjs/toolkit";
import customReducer from "./reducer";
// import { session } from "../reducers/rootOrmReducer";


// var ValidModel = getPropTypesMixin(Model)

class Product extends Model {
    static reducer(action, Product,session ){
        return customReducer({session, model:Product, action})
    }
    
}
Product.modelName = 'Product';
// Product.propTypes = {
//     name:  PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired
// }
Product.fields = {
    id: attr(),
    name: attr(),
    description: attr(),
    categoryIds: many({to:'ProductCategory', as:'categoryIds', relatedName: 'products'}),
   
    
}

Product.options = {
    idAttribute: 'id'
}
export const { UPDATE: updatedProduct, REMOVE: removedProduct, ADD: addedProduct, CREATE: createdProduct, ADD_TO: addedProductTo, REMOVE_FROM: removedProductFrom } = actions().createDefaultFor('Product')

export default Product;


