import { ORM } from "redux-orm";
import Order from "../models/OrderModel";
import Product from "../models/ProductModel";
import ProductCategory from "../models/ProductCategoryModel";
import ProductImage from "../models/ProductImageModel";
import ProductVariation from "../models/ProductVariationModel";
import ProductVariationProperty from "../models/ProductVariationPropertyModel";
import ProductVariationPropertyValue from "../models/ProductVariationPropertyValueModel";
import ProductVariationPropertyListValue from "../models/ProductVariationPropertyListValueModel";
import CartItem from "../models/CartModel";
import Auth from "../models/AuthModel";
import { defaultUpdater } from "redux-orm/lib/redux";
import { createReducer } from "redux-orm";
import baseModelCreator from "../models/BaseModel";

export const orm = new ORM({
    stateSelector: state => {
        // console.log("ss", state.orm)
        return state.orm
    }

});
// getFromDB
// orm.register(Auth,Product,CartItem, Order,ProductCategory,  ProductImage, ProductVariation, ProductVariationProperty,ProductVariationPropertyValue,ProductVariationPropertyListValue);
const models = [
    {
        modelName:"User",
        className: "User",
        fields:[
            {name: "id", type: "attr"},
            {name: "name", type: "attr"},
            {name: "email", type: "attr"},
            {name: "password", type: "attr"},
        //   {name: "stores", type: "many", one:"user", as:"userStores", lots:"stores"},
        ],
        options: {
            idAttribute: 'id'
        },
        actions:{
            create:"CREATE",
            update:"UPDATE",
            remove:"REMOVE"
        }
    },
    {
        modelName:"Store",
        className: "Store",
        fields:[
            {name: "id", type: "attr"},
            {name: "name", type: "attr"},
            {name: "user_id", type: "fk", one:"User", lots:"stores"},
        //   {name: "products", type: "many", one:"store", as:"storeProducts", lots:"products"},
        ],
        options: {
            idAttribute: 'id'
        },
        actions:{
            create:"CREATE",
            update:"UPDATE",
            remove:"REMOVE"
        }
    },
    {
        modelName:"Product",
        className: "Product",
        fields:[
            {name: "id", type: "attr"},
            {name: "name", type: "attr"},
            {name: "store_id", type: "fk", one:"Store", lots:"products"},
            {name: "categories", type: "many", one:"Category", as:"categoryProducts", lots:"products"},
        ],
        options: {
            idAttribute: 'id'
        },
        actions:{
            create:"CREATE",
            update:"UPDATE",
            remove:"REMOVE"
        }
    },
    {
        modelName:"Category",
        className: "Category",
        fields:[
            {name: "id", type: "attr"},
            {name: "name", type: "attr"},
            //   {name: "store_id", type: "fk", one:"Store", lots:"products"},
            {name: "products", type: "many", one:"Product", as:"productCategories", lots:"catgories"},
        ],
        options: {
            idAttribute: 'id',
            idDefaultValue: 1,
        },
            actions:{
            create:"CREATE",
            update:"UPDATE",
            remove:"REMOVE"
        }
    }
]

let acts = {}
models.forEach(model=>{

    const {[model.className]:baseModel, actions}= baseModelCreator(model)
    acts["for"+[model.modelName]] = actions
    
    orm.register(baseModel())
}
)
 
// console.log(orm)
export const actions = acts
export const ormRootReducer = createReducer(orm)//, defaultUpdater) //customStateUpdater) 

let emptyState = orm.getEmptyState()
// console.log(orm)
// creates session with empty db state
export const session = orm.session(emptyState);

