import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'

const categoriesAdapter = createEntityAdapter()

const initialState = categoriesAdapter.getInitialState({
    entities: {
         1:  'bg-[#FFA601]',
         2:  'bg-[#2967FF]',
         3:  'bg-[#58CF18]',
         4:  'bg-[#FF7CB4]',
         5:  'bg-[#FFA601]',
         6:  'bg-[#FF2D87]'
    },
    curCatIds: []
})
const categoriesSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCurrCatId(state, action) {
            // console.log('newState', state.ids)
            const id = action.payload
            const c = state.curCatIds
            // console.log('newState', c)
            if(!c.includes(id)) c.push(id)
            state.curCatIds = c

        },
        removeCatId(state, action) {
            const id = action.payload
            const c = state.curCatIds
            // console.log('newState', c)
            state.curCatIds = c.filter(i=> i !== id)
        }, 
        removeAllIds(state, action) {
            // console.log('newState', state.ids)
            // const id = action.payload
            state.curCatIds.length = 0
        }
    },
    
}) 
export const {setCurrCatId, removeCatId, removeAllIds} = categoriesSlice.actions
const { selectAll: selectCategories } = categoriesAdapter.getSelectors(state => state.categories)
export const selectCurCatId = createSelector(
    selectCategories,
    (state) => {
        console.log("state", state)
        return state.curCatIds
    }

)
export default categoriesSlice.reducer