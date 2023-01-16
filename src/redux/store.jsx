import { configureStore } from "@reduxjs/toolkit";
// import dataReducer from "./features/dataSlice";
import userSlice from "./features/service/userSlice";

export default configureStore({
  reducer:{
    user: userSlice
  }
})