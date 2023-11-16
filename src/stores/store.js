import { configureStore } from "@reduxjs/toolkit";
import reducer from "reduxSlice/slice";


const rootReducer = {
   author: reducer
}

const store = configureStore({
   reducer: rootReducer
})

export default store