import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiProduct } from "../../tools/api/apiProduct";
import { countRateNum, filterItemsByAuthor, findItemLiked } from "../../tools/utils";
import { isError, isLoading } from "../utilsStore";
import { openNotification } from "../../components/Notification/Notification";

const initialState = {
    products: [],
    currentProduct: {},
    loading: false,
    favourites: [],
    search: null,
    reviews: [],
}

export const fetchGetProductList = createAsyncThunk("products/fetchGetProductList", async function(userId, args ) {
    try {
        const state = args.getState();
        const data = await apiProduct.getProductList();
        return args.fulfillWithValue( {...data, userId: state.user.data?._id} )
    } catch (error) {
        return args.rejectWithValue(error)
    }
});

export const fetchGetProductById = createAsyncThunk("products/fetchGetProductById", async function (productId, args) {
    try {
        const data = await apiProduct.getProductById(productId);
        return args.fulfillWithValue(data)
    } catch (error) {
        return args.rejectWithValue(error)
    }
});

export const fetchToggleItemLike = createAsyncThunk("products/fetchToggleItemLike", async function (product, args ) {
    try {
        const state = args.getState();
        const isLiked = product.likes?.some(e => e === state.user.data?._id);
        const updatedItem = await apiProduct.toggleCardLike(product._id, isLiked);
        return args.fulfillWithValue({ updatedItem, isLiked});
    } catch (error) {
        return args.rejectWithValue(error);
    }
});

export const fetchUpdateProduct = createAsyncThunk("products/fetchUpdateProduct", async function ({data}, args) {
    try {
        console.log({data});
        const updatedProduct = apiProduct.updateProduct({productId: data.productId, data});
        return args.fulfillWithValue(updatedProduct)
    } catch (error) {
        return args.rejectWithValue(error)
    }
});

export const fetchSearch = createAsyncThunk("products/fetchSearch", async function (search, args) {
    try {
        const state = args.getState();
        const searchResult = await apiProduct.searchProduct(search);
        return args.fulfillWithValue({search, searchResult, userId: state.user.data?._id});
    } catch (error) {
        return args.rejectWithValue(error);
    }
});

export const fetchAddProductReview = createAsyncThunk("products/fetchAddProductReview", async function ({productId, body}, args) {
    try {
        console.log({body});
        const addedProductReview = await apiProduct.addReview(productId, body);
        return args.fulfillWithValue(addedProductReview);
    } catch (error) {
        return args.rejectWithValue(error);
    }
});

export const fetchDeleteProductReview = createAsyncThunk("products/fetchDeleteProductReview", async function ({productId, reviewId}, args) {
    try {
        console.log({reviewId});
        const deletedProductReview = await apiProduct.deleteReview(productId, reviewId)
        return args.fulfillWithValue(deletedProductReview)
    } catch (error) {
        return args.rejectWithValue(error);
    }
});

export const fetchAddProduct = createAsyncThunk("products/fetchAddProduct", async function (data, args) {
    try {
        const addedProduct = await apiProduct.addNewProduct(data);
        return args.fulfillWithValue(addedProduct);
    } catch (error) {
        return args.rejectWithValue(error)
    }
});

export const fetchDeleteProduct = createAsyncThunk("products/fetchDeleteProduct", async function (productId, args) {
    try {
        const deletedProduct = await apiProduct.deleteProduct(productId);
        return args.fulfillWithValue(deletedProduct);
    } catch (error) {
        return args.rejectWithValue(error)
    }
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        sortProducts: (state, {payload}) => {
            switch (payload) {
                case 'popular':
                    state.products = state.products.sort((a, b) => a.likes.length - b.likes.length);
                    break;
                case 'byRate':
                    state.products = state.products.sort((a, b) => countRateNum(b.reviews) - countRateNum(a.reviews));
                    break;
                case 'newProduct':
                    state.products = state.products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    break;
                case 'cheapFirst':
                    state.products = state.products.sort((a, b) => b.price - a.price);
                    break;
                case 'expensiveFirst':
                    state.products = state.products.sort((a, b) => a.price - b.price);
                    break;
                case 'sale':
                    state.products = state.products.sort((a, b) => b.discount - a.discount);
                    break;
                default:
                    state.products = state.products.sort((a, b) => b.price - a.price);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetProductList.fulfilled, (state, {payload}) => {
            const filteredProducts = filterItemsByAuthor(payload.products, payload.userId);
            state.products = filteredProducts;
            state.favourites = filteredProducts.filter(e => findItemLiked(e, payload.userId));
        });
        builder.addCase(fetchGetProductById.fulfilled, (state, {payload}) => {
            state.currentProduct = payload;
        });
        builder.addCase(fetchToggleItemLike.fulfilled, (state, {payload}) => {
            state.products = state.products.map(e => e._id === payload.updatedItem._id
                ? payload.updatedItem
                : e)
            // state.products = [...state.products, payload.updatedItem];
            
            if(payload.isLiked) {
                state.favourites = state.favourites.filter(e => e._id !== payload.updatedItem._id)
            } else {
                state.favourites = [...state.favourites, payload.updatedItem];
            }
        });
        builder.addCase(fetchUpdateProduct.fulfilled, (state, {payload}) => {
            // console.log({payload});
            // state.products = state.products.map(e => e._id === payload._id
            //     ? payload
            //     : e)
            state.currentProduct = payload;
        });
        builder.addCase(fetchSearch.fulfilled, (state, {payload}) => {
            state.search = payload.search;
            state.products = filterItemsByAuthor(payload.searchResult, payload.userId);

            
        });
        builder.addCase(fetchAddProductReview.fulfilled, (state, {payload}) => {
            // state.products = [...state.products, payload];
            openNotification("success", "Новый отзыв")
            state.products = state.products.map(e => e._id === payload._id
                ? payload
                : e);

            
        });
        builder.addCase(fetchDeleteProductReview.fulfilled, (state, {payload}) => {
            // state.products = payload;
            state.products = state.products.map(e => e._id === payload._id 
                ? payload 
                : e)
            openNotification("success", "Отзыв удален!")
            
            
            // state.currentProduct.reviews = state.payload.reviews
        });
        builder.addCase(fetchAddProduct.fulfilled, (state, {payload}) => {
            state.products = [...state.products, payload];
            openNotification("success", "Ваш товар добавлен в каталог")
        });
        builder.addCase(fetchDeleteProduct.fulfilled, (state, {payload}) => {
            state.products = state.products.filter(e => e._id !== payload._id);
            openNotification("success", "Товар удален!")
        });
        builder.addMatcher(isError, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        });
        builder.addMatcher(isLoading, (state) => {
            // state.loading = true;
        });
    }
})

export const {sortProducts} = productsSlice.actions;
export default productsSlice.reducer;