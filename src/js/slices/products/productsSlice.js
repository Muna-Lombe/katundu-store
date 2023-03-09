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
// export const { selectAll: selectSearches } = searchesAdapter.getSelectors(state => state.searches)

// const selectProductsMatching =() =>  createSelector(
//     selectProducts,
//     (state) => state.products,
//     (products,state) => {
       
//         const arr = state.searchedProductTextArr.length 
//             ? products.filter((i) => state.searchedProductTextArr.some(str => i.product.name.toString() === str.toString()) && i)
//             : products
//         console.log("####", state.searchedProductTextArr)
//         return arr     
//     })
// export const searchedProductTextArr = createSelector(
//     (state)=> state.products,
//     (products)=> {
//         // console.log("+++", products)
//         return products.searchedProductTextArr
//     }

// )
export const selectProductNamesThatMatch =(string) => createSelector(
    filteredProductsFromModel([]),
    products => products
    .filter((item,i)=>{
        return string ?
         item.name.includes(string)
         : Number.isInteger(item.id)
        // ||
        // item.store.name === string
    })//.map(i=> {return {id: i.id, name:i.product.name}})
)
// export const filterProducts = (catId = 0) => createSelector(
//      selectProductsMatching(), //selectProducts,
//     (state)  => state.products,
//     (products, state)=>{
//         let currCatId = state.currCatId
//         // console.log('curr',state, currCatId, products)
    
//         if (currCatId === 0) return products

//         return products.filter((p)=>{
//             return p.product.category_tags.some((e)=> {
//                 return Number.parseInt(e[0]) === Number.parseInt(currCatId)
//             })  && p
//     })
//     }
// ) 
export default searchSlice.reducer