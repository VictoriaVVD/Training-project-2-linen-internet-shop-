import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
    productsOnPage: 4,
}

const paginationSlice = createSlice({
    name: "paginate",
    initialState: initialState,
    reducers: {
        setCurrentPage: (state, {payload}) => {
            state.currentPage = payload;     
        },
        setProductsOnPage: (state, {payload}) => {
            console.log(payload);
            state.productsOnPage = payload;     
        }
    }
})

export const { setCurrentPage, setProductsOnPage } = paginationSlice.actions;
export default paginationSlice.reducer;