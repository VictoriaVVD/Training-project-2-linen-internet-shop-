import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")),
    loading: false,
};

const productCartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {

        addProductInCart: (state, { payload }) => {
            const productInCart = state.cart.find(
                (e) => e.product._id === payload.product._id
            );
            if (productInCart) {
                const order = productInCart.quantity + payload.quantity;
                productInCart.quantity = order <= payload.product.stock ? order : productInCart.quantity
            } else {
                state.cart.push(payload)
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        deleteProductInCart: (state, { payload }) => {
            const productInCart = state.cart.find(
                (e) => e.product._id === payload.product._id
            );
            if (productInCart) {
                const order = productInCart.quantity - payload.quantity;
                productInCart.quantity = order <= 0 ? 0 : order;
                localStorage.setItem('cart', JSON.stringify(state.cart));

                if (productInCart.quantity === 0) {
                    state.cart = state.cart.filter(e => e.product._id !== payload.product._id);
                    localStorage.setItem('cart', JSON.stringify(state.cart));
                }
            }
        },

        removeItem: (state, { payload }) => {
            const updatedCart = state.cart.filter((e) => e.product._id !== payload._id);
            state.cart = updatedCart;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        clearCart: (state) => {
            state.cart = [];
            localStorage.setItem('cart', JSON.stringify(state.cart));
        }
    },
});

export const { addProductInCart, deleteProductInCart, removeItem, clearCart } = productCartSlice.actions;

export default productCartSlice.reducer;
