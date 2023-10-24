import { createSlice } from '@reduxjs/toolkit'
import { CategoriesType } from '../../types'
// import type { PayloadAction } from '@reduxjs/toolkit'

const initialState:CategoriesType= []

export const categoriesSlice = createSlice({
    name:'categories',
    initialState:initialState,
    reducers:{
      setCategories: (state,action)=>{
        return action.payload
      },
      addCategory:(state,action)=>{
        state.push(action.payload)
      }
    }
})

export const { setCategories,addCategory } = categoriesSlice.actions

export default categoriesSlice.reducer