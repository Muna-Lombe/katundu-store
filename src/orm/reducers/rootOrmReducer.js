import {createSelector, ORM } from "redux-orm";
import Order from "../models/OrderModel";
import Product from "../models/ProductModel";
import { createReducer } from "redux-orm";
import ProductCategory from "../models/ProductCategoryModel";
import ProductImage from "../models/ProductImageModel";
import ProductVariation from "../models/ProductVariationModel";
import ProductVariationProperty from "../models/ProductVariationPropertyModel";
import ProductVariationPropertyValue from "../models/ProductVariationPropertyValueModel";
import ProductVariationPropertyListValue from "../models/ProductVariationPropertyListValueModel";
import { defaultUpdater } from "redux-orm/lib/redux";
import CartItem from "../models/CartModel";
import Auth from "../models/AuthModel";

export const orm = new ORM({
    stateSelector: state => {
        // console.log("ss", state.orm)
        return state.orm
    }

});
// getFromDB
orm.register(Auth,Product,CartItem, Order,ProductCategory,  ProductImage, ProductVariation, ProductVariationProperty,ProductVariationPropertyValue,ProductVariationPropertyListValue);

export const ormRootReducer = createReducer(orm, defaultUpdater) //customStateUpdater) 

let emptyState = orm.getEmptyState()

// creates session with empty db state
export const session = orm.session(emptyState);

