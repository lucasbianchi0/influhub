import { createSlice } from '@reduxjs/toolkit'
import { PostsType } from '../../types'
// import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: PostsType =[]

export const postsSlice = createSlice({
    name:'posts',
    initialState:initialState,
    reducers:{
      setPosts: (state,action)=>{
        return action.payload
      },
      addPost:(state,action)=>{
        state.push(action.payload)
      }
    }
})

export const { setPosts,addPost } = postsSlice.actions

export default postsSlice.reducer