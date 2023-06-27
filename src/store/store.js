import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productsSlice from "./slices/productsSlice";
import postsSlice from "./slices/postsSlice";
import productCartSlice from "./slices/productCartSlice";
import modalSlice from "./slices/modalSlice";
import paginationSlice from "./slices/paginationSlice";


const store = configureStore({
    reducer: {
        user: userSlice,
        products: productsSlice,
        posts: postsSlice,
        cart: productCartSlice,
        modal: modalSlice,
        paginate: paginationSlice,
    },
})

export default store;