import { createSlice } from '@reduxjs/toolkit';
import { UsersType } from '../../types';


const initialState: UsersType = []

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
        state.push(action.payload);
      },
    setUsers: (state, action) => {
        return action.payload;
      },
  },
});

export const { addUser, setUsers } = usersSlice.actions;
export default usersSlice.reducer


