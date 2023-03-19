import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { filteredProductsFromModel } from '../../../orm/selectors'

const searchesAdapter = createEntityAdapter()
const initialState = searchesAdapter.getInitialState({
    searchedProductTextArr: []
})


const searchSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        
        setSearchedProductId(state,action){
            console.log('searching...')
            state.searchedProductTextArr = action.payload
        }
    }
}) 
export const { setSearchedProductId} = searchSlice.actions

export const selectProductNamesThatMatch =(string) => createSelector(
    filteredProductsFromModel([]),
    products => products
    .filter((item,i)=>{
        return string ?
         item.name.includes(string)
         : Number.isInteger(item.id)
    })
)

export default searchSlice.reducer