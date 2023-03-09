import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector } from 'react-redux'
import Get from '../../../assets/tests/Get'
import { session } from '../rootOrmReducer'

const ormProductsAdapter = createEntityAdapter()
const initialState = ormProductsAdapter.getInitialState(
    {
        initialState: session["Product"]
    }
)


// export const fetchProducts = createAsyncThunk('products/fetchProducts', async() => {
    
// })
const productSlice = createSlice({
    name: 'product',
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
            .addCase("orm/entities/loadProducts/fulfilled", (state, action) => {
                console.log('action payload:', action)
                ormProductsAdapter.setAll(state, action.payload.products)
            })
    }
}) 
console.log("selectAll",ormProductsAdapter)

export const { selectAll: selectProducts} = ormProductsAdapter.getSelectors(state=> state.Product)
export const selectProduct = createSelector(
    selectProducts(session.state ),
    product => product

)


