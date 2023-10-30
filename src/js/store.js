import { configureStore } from '@reduxjs/toolkit'
import { ormRootReducer as orm } from '../orm/reducers/rootOrmReducer';




const Store = configureStore({
    reducer: {
        // searches: searchesReducer,
        // categories: categoriesReducer,
        // cart: cartReducer,
        // orderHistory: ordersReducer,
        orm//: combineReducers({orm, entitiesReducer})

        
    },
    
    // middleware: (gDM) =>gDM().concat(...ormMiddlewares)

    //middleware: [fetchProducts]//,asyncThunk]
})

// console.log("store",Store)
export default Store ;