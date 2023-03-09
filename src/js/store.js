import { combineReducers, configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import { ormRootReducer as orm } from '../orm/reducers/rootOrmReducer';
import cartReducer from './slices/cart/cartSlice';
import categoriesReducer from './slices/filters/categoriesSlice';
import ordersReducer from './slices/orders/ordersSlice';
import searchesReducer from './slices/products/productsSlice'


const Store = configureStore({
    reducer: {
        // searches: searchesReducer,
        // categories: categoriesReducer,
        // cart: cartReducer,
        // orderHistory: ordersReducer,
        orm//: combineReducers({orm, entitiesReducer})

        
    },
    // middleware: [...ormMiddlewares]

    //middleware: [fetchProducts]//,asyncThunk]
})

// console.log("store",Store)
export default Store ;