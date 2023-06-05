import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUser } from "../../assets/api/apiUser"
import { isError, isLoading } from "../utilsStore";

const initialState = {
    data: {},
    loading: false,
}

export const fetchGetUser = createAsyncThunk("user/getUser", async function (args) {
    const data = await apiUser.getUserInfo();
    return data;
})
export const fetchUpdateUser = createAsyncThunk("user/updateUser", async function (data) {
    if (data.avatar) {
        const res = await apiUser.changeAvatar({avatar: data.avatar});
        return res;
    } else {
        const res = await apiUser.updateUserInfo({name: data.name, about: data.about, avatar: data.avatar});
        return res;
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGetUser.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.data = payload;
        })
        builder.addCase(fetchUpdateUser.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.data = payload;
        })
        builder.addMatcher(isLoading, (state) => {
            // state.loading = true;
        })
        builder.addMatcher(isError, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })

    }
})

export default userSlice.reducer