import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import React from 'react'
import Get from '../../../assets/tests/Get'


const cartAdapter = createEntityAdapter()
const initialState = cartAdapter.getInitialState({

})




const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartItemAdded(state, action) {
            const cartItem = {...action.payload, isOrdered: false}
            state.entities[cartItem.id] = cartItem
        },
        cartItemUpdated: {
            reducer(state, action) {
                const{ cartItemId, updateData } = action.payload
                // PAUSE HERE FOR NOW!

            },
            prepare(cartItemId, updateData ) {
                return {
                    payload: { cartItemId, updateData}
                }
            }
        },
        // cartItemOrdered(state, action) {
        //     const itemIds = action.payload
        //     itemIds.forEach((itemId)=> {
        //         const item = state.entities[itemId]
        //         item.isOrdered = true
        //     })
            
            
        // },
        cartItemOrdered: cartAdapter.updateMany,
        cartItemDeleted: cartAdapter.removeOne,
        allcartItemsDeleted: cartAdapter.removeAll

    },
    // extraReducers:(builder) => {
    //     builder
    //         .addCase('cart/itemsInCart', (state, action) => {
    //             console.log(state.entities)
    //             console.log('action payload:', action)
    //             cartAdapter.
    //             cartAdapter.setAll(state, action.payload.carts)
    //         })
    // }
}) 

export const {cartItemAdded, cartItemOrdered, cartItemUpdated, cartItemDeleted, allcartItemsDeleted} = cartSlice.actions
export const { selectAll: selectCartItems, selectById: selectCartItemIds } = cartAdapter.getSelectors(state => state.products)

export const selectcartIds = createSelector(
    selectCartItems,
    cart => cart.id
)


export const itemsInCart = createSelector(
    selectCartItems,
    items => items
)
//  export const itemsInCart = createAsyncThunk('carts/itemsInCart', async(getState) => {
//     console.log(getState)
// })

// export const selectFilteredCartItems = createSelector(

// )
export default cartSlice.reducer