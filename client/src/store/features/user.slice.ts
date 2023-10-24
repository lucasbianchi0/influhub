import { createSlice } from '@reduxjs/toolkit'
import {  UsersType } from '../../types'
// import type { PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

  
const initialState: UsersType=[]

export const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        loginUser:(state, action)=>{
          return action.payload
        },
        updateUser:(state,action)=>{
          return action.payload
        },
        logout: () => {
          Cookies.remove("token");
          return [];
      }
  }
});

export const { loginUser, updateUser, logout } = userSlice.actions;

export default userSlice.reducer;
