import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { getData,patchData } from "../../api";


export const fetchData = createAsyncThunk('sample',async()=>{
  const response = await getData()//gets data from API in api.js
  console.log(response.data)
  return response.data;
})

export const updateData = createAsyncThunk('data/update',async(data,getState)=>{
  const id = getState().data._id;
  const response = await patchData(id,data)//patch data get from API in api.js
  return response.data
})

const initialState = {
  users:[],
  status:'idle',
  error:null
};

const dataSlice = createSlice({
  name:'users',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading';
  })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.usersData = action.payload;
  })
  builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
  })
  builder.addCase(updateData.pending, (state) => {
      state.status = 'loading';
  })
  builder.addCase(updateData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.usersData = action.payload;
  })
  builder.addCase(updateData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
  })
} 
})

//Getting the data here returns undefined even if I return state.data.users
export const getAllUsers = (state) => state.users;

export const apiStatus = (state)=>state.status
export const apiError = (state)=>state.error

export default dataSlice.reducer