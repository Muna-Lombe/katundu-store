import { attr,fk, many, Model, ORM } from "redux-orm";

import {  actions } from "../actions/actionTypes";
import customReducer from "./reducer";

// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class Order extends Model {
    static reducer(action, Order, session) {
        return customReducer({session, model:Order, action})
    }
//   
}
Order.modelName = 'Order';
Order.fields = {
    id: attr(),
    // product: fk({ to: 'Product', as: 'product', through: "Product", throughFields: { itemId: attr(), itemQuantity: attr(), itemPrice: attr() }, relatedName: 'orders' }),
    productIds: many({to:'Product', relatedName: 'orders'}),
    DateCreated: attr(),
    OrderProps:attr({
        quantity: attr([{ 
            itemId: fk({ to: 'Product', as: 'product', relatedName: 'orders' }), 
            itemQuantity: attr(), 
            itemPrice: attr() 
        }]),
        storeName:attr(),
        deliveryDate: attr(),
        deliveryTime: attr(),
        deliveryAddress: attr(),
        receiver:attr(),
        receiverPhone: attr(),
        orderCost: attr(),
        deliveryCost: attr(),
        totalCost: attr()
    }),
    OrderStatus: attr()
};
export const {UPDATE:updatedOrder, REMOVE:removedOrder, ADD:addedOrder, CREATE:createdOrder, ADD_TO:addedOrderTo, REMOVE_FROM:removedOrderFrom} = actions().createDefaultFor('Order')
export default Order;