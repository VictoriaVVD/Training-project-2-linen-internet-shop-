import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpened: false,
    path: [
        "signin",
        "/signup",
        "/forgot-password",
        "newProduct",
        "newPost",
        "newReview",
        "newComment",
        "updateProduct",
        "updatePost",
        "warning",
    ]
}

const modalSlice = createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        setModalOpen: (state, {payload}) => {
            state.isModalOpened = payload;            
        },
        setStateByPath: (state, {payload}) => {
            state.path = payload;            
        }
    }
})

export const { setModalOpen, setStateByPath } = modalSlice.actions;
export default modalSlice.reducer;