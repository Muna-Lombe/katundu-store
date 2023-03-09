import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector } from 'react-redux'
import Get from '../../../assets/tests/Get'
import { session } from '../rootOrmReducer'

const ormOrdersAdapter = createEntityAdapter()
const initialState = ormOrdersAdapter.getInitialState(
    {
        initialState: session["Order"]
    }
)


// export const fetchProducts = createAsyncThunk('products/fetchProducts', async() => {
    
// })
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // productAdded(state, action) {
        //     const item = action.payload
        //     state.entities[item.id] = item
        // },
        // productUpdated: {
        //     reducer(state, action) {
        //         const{ itemId, updateData } = action.payload
        //         // PAUSE HERE FOR NOW!

        //     },
        //     prepare(itemId, updateData ) {
        //         return {
        //             payload: { itemId, updateData}
        //         }
        //     }

        // }
        // setCurrCatId(state,action) {
        //     console.log('newState', state.ids)
        //     const newCatId = action.payload
        //     state.currCatId = newCatId
    
        // }
    },
    extraReducers:(builder) => {
        builder
            .addCase("orm/entities/loadOrders/fulfilled", (state, action) => {
                console.log('action payload:', action)
                ormOrdersAdapter.setAll(state, action.payload.orders)
            })
    }
}) 
console.log("selectAll",ormOrdersAdapter)
// export {} = orderSlice.actions
export const { selectAll: selectOrders} = ormOrdersAdapter.getSelectors(state=> state.Order)
export const selectOrder = createSelector(
    selectOrders(session.state ),
    order => order

)


