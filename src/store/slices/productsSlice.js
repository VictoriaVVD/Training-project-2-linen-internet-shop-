import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {},
    loading: false,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setList(state, action) {
            console.log({action});
            state.data = action.payload;
        }
    },
    extraReducers: {}
})

export const {setList} = productsSlice.actions;
export default productsSlice.reducer