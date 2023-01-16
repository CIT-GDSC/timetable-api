import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userFunction from "./userService";


const initialState = {
    users: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const fetchData = createAsyncThunk("sample", async () => {
    try {
        return await userFunction.getUsers()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message)
    }
});

export const updateData = createAsyncThunk("data/update", async (data, thunkApi) => {
    try {
        return await userFunction.patchata(data.id, data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.users = action.payload;
        });
        builder.addCase(fetchData.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(updateData.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        });
        builder.addCase(updateData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.users = state.users.map((user) => {
                if (user._id === action.payload._id) {
                    return action.payload
                } else {
                    return user
                }
            })
        });
        builder.addCase(updateData.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
        });
    }
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;