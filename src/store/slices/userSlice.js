import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUser } from "../../tools/api/apiUser"
import { isError, isLoading } from "../utilsStore";

const initialState = {
    data: {},
    loading: false,
    isAuthorized: false,
}

export const fetchGetUser = createAsyncThunk("user/getUser", async function (args) {
    const data = await apiUser.getUserInfo();
    return data;
})
export const fetchUpdateUser = createAsyncThunk("user/updateUser", async function (data, args) {
    const state = args.getState();
    if (data.avatar !== state.user.data.avatar) {
        const res = await apiUser.changeAvatar({avatar: data.avatar});
        return res;
    } 
    return await apiUser.updateUserInfo({name: data.name, about: data.about});
})
export const fetchSingIn = createAsyncThunk("user/fetchSingIn", async function (data, args) {
    try {
        const res = await apiUser.singin(data);
        return args.fulfillWithValue(res);
    } catch (error) {
        return args.rejectWithValue(error);
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthorized(state, {payload}) {
            state.isAuthorized = payload;
        },
    },
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

export const { setAuthorized } = userSlice.actions;
export default userSlice.reducer