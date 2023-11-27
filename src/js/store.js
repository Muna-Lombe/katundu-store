import { configureStore } from '@reduxjs/toolkit'
import { ormRootReducer as orm } from '../orm/reducers/rootOrmReducer';
import { apiSlice } from './middleware';


const Store = configureStore({
    reducer: {
        // searches: searchesReducer,
        // categories: categoriesReducer,
        // cart: cartReducer,
        // orderHistory: ordersReducer,
        orm,//: combineReducers({orm, entitiesReducer}),
        [apiSlice.reducerPath]: apiSlice.reducer

        
    },
    
    middleware: (gDM) =>gDM().concat(apiSlice.middleware)

    //middleware: [fetchProducts]//,asyncThunk]
})

// console.log("store",Store)
export default Store ;