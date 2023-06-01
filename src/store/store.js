
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import productsSlice from "./slices/productsSlice";
import { apiUser } from "../assets/api/apiUser";


const store = configureStore({
    reducer: {
        user: userSlice,
        products: productsSlice,
    },
    // middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
    //     thunk: {
    //         extraArgument: apiUser,
            
    //     }
    // })
})

export default store;