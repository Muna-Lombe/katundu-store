import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'


const orderHistoryAdapter = createEntityAdapter()
const initialState = orderHistoryAdapter.getInitialState({

})

export const fetchOrderHistory = createAsyncThunk('products/fetchProducts', async() => {

})
function nextOrderId( orders ) {
    const maxId = orders.reduce((maxId, order) => Math.max(order.id, maxId), -1)
    return maxId + 1
}

const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState,
    reducers: {
        orderHistoryItemAdded(state, action) {
            const orderHistoryItem = action.payload
            // const orderId = nextOrderId(state.entities?.length > 1  ? state.entities : [{id:0}])
            const orderId = action.payload.id
            state.entities[orderId] = orderHistoryItem
        },
        
        orderHistoryItemDeleted: orderHistoryAdapter.removeOne,
        allorderHistoryItemsDeleted: orderHistoryAdapter.removeAll

    },
    // extraReducers:(builder) => {
    //     builder
    //         .addCase('orderHistory/fetchOrderHistory', (state, action) => {
    //             console.log(state.entities)
    //             console.log('action payload:', action)
    //             orderHistoryAdapter.
    //             orderHistoryAdapter.setAll(state, action.payload.orderHistorys)
    //         })
    // }
}) 

export const {orderHistoryItemAdded, orderHistoryItemUpdated, orderHistoryItemDeleted, allorderHistoryItemsDeleted} = orderHistorySlice.actions
export const { selectAll: selectorderHistoryItems, selectById: selectorderHistoryItemIds } = orderHistoryAdapter.getSelectors(state => state.orderHistory)

export const selectorderHistoryIds = createSelector(
    selectorderHistoryItems,
    orderHistory => orderHistory.id
)

export const itemsInorderHistory = createSelector(
    selectorderHistoryItems,
    items => items
)
//  export const itemsInorderHistory = createAsyncThunk('orderHistorys/itemsInorderHistory', async(getState) => {
//     console.log(getState)
// })
export default orderHistorySlice.reducer