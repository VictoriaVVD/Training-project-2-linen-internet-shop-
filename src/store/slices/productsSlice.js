import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiProduct } from "../../assets/api/apiProduct";
import { countRateNum, filterItemsByAuthor, findItemLiked, isError, isLoading} from "../utilsStore";

const initialState = {
    products: [],
    loading: false,
    favourites: [],
}

export const fetchGetProductList = createAsyncThunk("products/fetchGetProductList", async function(userId, args ) {
    try {
        const state = args.getState();
        const data = await apiProduct.getProductList();
        return args.fulfillWithValue( {...data, userId: state.user.data?._id} )
    } catch (error) {
        return args.rejectWithValue(error)
    }
})

export const fetchGetProductById = createAsyncThunk("products/fetchGetProductById", async function (id, args) {
    try {
        const data = await apiProduct.getProductById(id);
        return args.fulfillWithValue(data)
    } catch (error) {
        return args.rejectWithValue(error)
    }
})

export const fetchToggleItemLike = createAsyncThunk("products/fetchToggleItemLike", async function (data, args ) {
    try {
        const state = args.getState();
        const isLiked = findItemLiked(data, state.user.data._id);
        const updatedItem = await apiProduct.toggleCardLike(data._id, isLiked);
        return args.fulfillWithValue({ updatedItem, isLiked: isLiked});
    } catch (error) {
        return args.rejectWithValue(error);
    }
})

export const fetchSearch = createAsyncThunk("products/fetchSearch", async function (search, args) {
    try {
        const searchResult = await apiProduct.searchProduct(search);
        console.log({searchResult});
        return args.fulfillWithValue(searchResult);
    } catch (error) {
        return args.rejectWithValue(error);
    }
})

export const fetchAddProduct = createAsyncThunk("products/fetchAddProduct", async function (data, args) {
    try {
        const addedProduct = await apiProduct.addNewProduct(data);
        return args.fulfillWithValue(addedProduct);
    } catch (error) {
        return args.rejectWithValue(error)
    }
})

export const fetchDeleteProduct = createAsyncThunk("products/fetchDeleteProduct", async function (productId, args) {
    try {
        const deletedProduct = await apiProduct.deleteProduct(productId);
        return args.fulfillWithValue(deletedProduct);
    } catch (error) {
        return args.rejectWithValue(error)
    }
})

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
                    state.products = state.products.filter(e => e.tags.includes('new'));
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
            const filteredProductsByAuthor = filterItemsByAuthor(payload.products) ?? [];
            state.products = filteredProductsByAuthor;
            state.favourites = filteredProductsByAuthor.filter(e => findItemLiked(e, payload.userId))
        });
        builder.addCase(fetchGetProductById.fulfilled, (state, {payload}) => {
            state.products = state.products.filter(e => e._id === payload._id)
        })
        builder.addCase(fetchToggleItemLike.fulfilled, (state, {payload}) => {
            state.products = state.products.map(e => e._id === payload.updatedItem._id
                ? payload.updatedItem
                : e)
            if(payload.isLiked) {
                state.favourites = state.favourites.filter(e => e._id !== payload.updatedItem._id)
            } else {
                state.favourites = [...state.favourites, payload.updatedItem]
            }
        });
        builder.addCase(fetchSearch.fulfilled, (state, {payload}) => {
            state.products = filterItemsByAuthor(payload);
        });
        builder.addCase(fetchAddProduct.fulfilled, (state, {payload}) => {
            state.products = [...state.products, payload]
        });
        builder.addCase(fetchDeleteProduct.fulfilled, (state, {payload}) => {
            state.products = state.products.filter(e => e._id !== payload._id)
        });
        builder.addMatcher(isError, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        });
        builder.addMatcher(isLoading, (state) => {
            // state.loading = true;
        })
    }
})

export const {sortProducts} = productsSlice.actions;
export default productsSlice.reducer;