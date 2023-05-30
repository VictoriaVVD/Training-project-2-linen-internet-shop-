import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUser } from "../../assets/api/apiUser"

const initialState = {
    data: {},
    loading: false,
}

export const getUser = createAsyncThunk("user/getUser", async function () {
    const data = await apiUser.getUserInfo();
    return data
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
    }
})

export default userSlice.reducer