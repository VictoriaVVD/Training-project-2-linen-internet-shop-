import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productsSlice from "./slices/productsSlice";
import postsSlice from "./slices/postsSlice";


const store = configureStore({
    reducer: {
        user: userSlice,
        products: productsSlice,
        posts: postsSlice,
    },
})

export default store;