import { attr,fk, many, Model, oneToOne } from "redux-orm";

import { actionCreator } from "../actions/actionTypes";
import customReducer from "./reducer";
import { isIterable } from "../utilities";
// import { getPropTypesMixin } from "redux-orm-proptypes";
import PropTypes from 'prop-types';
// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class Order extends Model {
    static reducer(action, Order, session) {
        // return customReducer({session, model:Order, action})
        switch (action.type) {
            case "orm/OrderHistory/ADD":
                if(isIterable(action.payload)){
                    action.payload.forEach(load=> session.Order.upsert(load))
                    break;
                }
                session.Order.upsert(action.payload)
                break;
            case "orm/OrderHistory/REMOVE":
                const {uuid, ...rest} = action.payload 
                session.Order.withId(uuid)?.delete() 
                break;
            case "orm/OrderHistory/REMOVE_ALL":
                session.Order.all().delete()
                // session.Order.withId(uuid)?.delete() 
                break;
            default:
             break;
        }
    }  
}

Order.modelName = 'Order';
Order.propTypes = {
    uuid: PropTypes.string.isRequired,
    orderItems: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        productQuantity: PropTypes.number.isRequired,
        productPrice: PropTypes.number.isRequired,
        productName: PropTypes.string.isRequired,
        storeName: PropTypes.string.isRequired,
    })).isRequired,
    deliveryDate: PropTypes.string.isRequired,
    deliveryTime: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    orderCost: PropTypes.number.isRequired,
    orderStatus: PropTypes.string.isRequired
}
Order.fields = {
    uuid: attr(),
    orderItems:attr([
        {
            uuid: fk({ to: 'Product', as: 'product', through: "Product",  relatedName: 'orders' }),
            productQuantity: attr(), 
            productPrice: attr(), 
            productName: attr(), 
            storeName:attr(),
        }
    ]),
    // productUuids: one({to:'Product', relatedName: 'orders'}),
    deliveryDate: attr(),
    deliveryTime: attr(),
    deliveryAddress: attr(),
    orderCost: attr(),
    orderStatus: attr()
};
Order.options = {
    IdAttribute: "uuid",
};

export const {UPDATE:updatedOrderItem, REMOVE:removedOrderItem, REMOVE_ALL:removedAllOrderItems, ADD:addedOrderItem, CREATE:createdOrderItem, ADD_TO:addedOrderItemTo, REMOVE_FROM:removedOrderItemFrom} = actionCreator().createDefaultFor('OrderHistory')
export default Order;