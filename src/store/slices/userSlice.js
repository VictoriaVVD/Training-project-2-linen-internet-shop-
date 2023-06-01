import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUser } from "../../assets/api/apiUser"

const initialState = {
    data: {},
    loading: false,
}
const isLoading = (data) => {
    return data.type.endsWith("pending");
}
const isError = (data) => {
    return data.type.endsWith("rejected");
}
export const getUser = createAsyncThunk("user/getUser", async function () {
    const data = await apiUser.getUserInfo();
    return data;
})
export const updateUser = createAsyncThunk("user/updateUser", async function (data) {
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
        // builder.addCase(getUser.pending, (state, action) => {
        //     state.loading = true;
        // })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addMatcher(isLoading, (state) => {
            state.loading = true;
        })
        builder.addMatcher(isError, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

    }
})

export default userSlice.reducer