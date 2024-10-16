import { ORM } from "redux-orm";
import Order from "../models/OrderModel";
import Product from "../models/ProductModel";
import ProductCategory from "../models/ProductCategoryModel";
// import ProductImage from "../models/ProductImageModel";
// import ProductVariation from "../models/ProductVariationModel";
// import ProductVariationProperty from "../models/ProductVariationPropertyModel";
// import ProductVariationPropertyValue from "../models/ProductVariationPropertyValueModel";
// import ProductVariationPropertyListValue from "../models/ProductVariationPropertyListValueModel";
import CartItem from "../models/CartModel";
import Auth from "../models/AuthModel";
import { defaultUpdater } from "redux-orm/lib/redux";
import { createReducer } from "redux-orm";
import baseModelCreator from "../models/BaseModel";
import ToastMessage from "../models/ToastMessageModel";
import Checkout from "../models/CheckoutModel";
import ConnectionRetriesMonitor from "../models/ConnectionRetriesMonitorModel";

export const orm = new ORM({
    stateSelector: state => {
        // console.log("ss", state.orm)
        return state.orm
    }

});
// getFromDB
orm.register(
    Auth,
    Product,
    CartItem, 
    Checkout,
    Order,
    ProductCategory,  
    // ProductImage, 
    // ProductVariation, 
    // ProductVariationProperty,
    // ProductVariationPropertyValue,
    // ProductVariationPropertyListValue,
    ToastMessage,
    ConnectionRetriesMonitor
);
// const models = [
//     {
//         modelName:"User",
//         className: "User",
//         fields:[
//             {name: "id", type: "attr"},
//             {name: "name", type: "attr"},
//             {name: "email", type: "attr"},
//             {name: "password", type: "attr"},
//         //   {name: "stores", type: "many", one:"user", as:"userStores", lots:"stores"},
//         ],
//         options: {
//             idAttribute: 'id'
//         },
//         actions:{
//             create:"CREATE",
//             update:"UPDATE",
//             remove:"REMOVE"
//         }
//     },
//     {
//         modelName:"Store",
//         className: "Store",
//         fields:[
//             {name: "id", type: "attr"},
//             {name: "name", type: "attr"},
//             {name: "user_id", type: "fk", one:"User", lots:"stores"},
//         //   {name: "products", type: "many", one:"store", as:"storeProducts", lots:"products"},
//         ],
//         options: {
//             idAttribute: 'id'
//         },
//         actions:{
//             create:"CREATE",
//             update:"UPDATE",
//             remove:"REMOVE"
//         }
//     },
//     {
//         modelName:"Product",
//         className: "Product",
//         fields:[
//             {name: "id", type: "attr"},
//             {name: "name", type: "attr"},
//             {name: "store_id", type: "fk", one:"Store", lots:"products"},
//             {name: "categories", type: "many", one:"Category", as:"categoryProducts", lots:"products"},
//         ],
//         options: {
//             idAttribute: 'id'
//         },
//         actions:{
//             create:"CREATE",
//             update:"UPDATE",
//             remove:"REMOVE"
//         }
//     },
//     {
//         modelName:"Category",
//         className: "Category",
//         fields:[
//             {name: "id", type: "attr"},
//             {name: "name", type: "attr"},
//             //   {name: "store_id", type: "fk", one:"Store", lots:"products"},
//             {name: "products", type: "many", one:"Product", as:"productCategories", lots:"catgories"},
//         ],
//         options: {
//             idAttribute: 'id',
//             idDefaultValue: 1,
//         },
//             actions:{
//             create:"CREATE",
//             update:"UPDATE",
//         }
//     },
//     {
//         modelName:"Checkout",
//         className: "Checkout",
//         fields:[
//             {name: "id", type: "attr"},
//             {name: "name", type: "attr"},
//             {name: "product_quantity", type: "attr"},
//             {name: "product_price", type: "attr"},
//             {name: "store_name", type: "attr"},
//             {name: "delivery_date", type: "attr"},
//             {name: "delivery_time", type: "attr"},
//             {name: "delivery_address", type: "attr"},
//             {name: "reciever", type: "attr"},
//             {name: "reciever_phone", type: "attr"},
//             {name: "delivery_cost", type: "attr"},
//             {name: "discount_amount", type: "attr"},
//             {name: "total_cost", type: "attr"},
//             {name: "order_id", type: "fk", one:"Order", lots:"Checkouts"},
//             {name: "shopping_cart_id", type: "fk", one:"ShoppingCart", lots:"Checkouts"},
//             // {name: "products", type: "many", one:"Product", as:"productCategories", lots:"catgories"},
//         ],
//         options: {
//             idAttribute: 'id',
//             idDefaultValue: 1,
//         },
//             actions:{
//             create:"CREATE",
//             update:"UPDATE",
//             remove:"REMOVE"
//         }
//     },
//     {
//         modelName:"CartItem",
//         className: "CartItem",
//         fields:[
//             {name: "id", type: "attr"},
//             {name: "name", type: "attr"},
//             {name: "product_count", type: "attr"},
//             {name: "product", type: "attr"},
//             ,
//             // {name: "products", type: "many", one:"Product", as:"productCategories", lots:"catgories"},
//         ],
//         options: {
//             idAttribute: 'id',
//             idDefaultValue: 1,
//         },
//             actions:{
//             create:"CREATE",
//             update:"UPDATE",
//             remove:"REMOVE"
//         }
//     }
// ]

let acts = {}
// models.forEach(model=>{

//     const {[model.className]:baseModel, actions}= baseModelCreator(model)
//     acts["for"+[model.modelName]] = actions
    
//     orm.register(baseModel())
// }
// )
 
// console.log(orm)
export const actions = acts
export const ormRootReducer = createReducer(orm)//, defaultUpdater) //customStateUpdater) 

let emptyState = orm.getEmptyState()
// console.log(orm)
// creates session with empty db state
export const session = orm.session(emptyState);

