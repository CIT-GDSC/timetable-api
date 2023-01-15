import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./features/dataSlice";

export default configureStore({
  reducer:{
    user:dataReducer,
  }
})