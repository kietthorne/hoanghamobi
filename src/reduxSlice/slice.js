import { createSlice } from "@reduxjs/toolkit";

const author =  createSlice({
   name: 'author',
   initialState: {
      isLogin: false,
      infoUser: {},
      jwt: false,
   },
   reducers: {
      addAuthor: (state,action) => {
         state.isLogin = true
         state.infoUser = action.payload
         state.jwt = !!action.payload?.accessToken
      }
   }
});

const {reducer, actions} = author;
export const {addAuthor} = actions;
export default reducer;