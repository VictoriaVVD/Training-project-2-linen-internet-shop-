import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiPost } from "../../assets/api/apiPost";
import { countRateNum, filterItemsByAuthor, findItemLiked, isError, isLoading } from "../utilsStore";


const initialState = {
    posts: [],
    favouritePosts: [],
    loading: false,
}

export const fetchGetPostList = createAsyncThunk("posts/fetchGetPostList", async function (userId, args) {
    try {
        const state = args.getState()
        const data = await apiPost.getAllPosts();
        return args.fulfillWithValue( {posts: data, userId: state.user.data._id} )
    } catch (error) {
        return args.rejectWithValue(error)
    } 
})

export const fetchPostById = createAsyncThunk("posts/fetchPostById", async function (id, args) {
    try {
        // const state = args.getState()
        const data = await apiPost.getPostById(id);
        return args.fulfillWithValue(data)
    } catch (error) {
        return args.rejectWithValue(error)
    } 
})

export const fetchToggleItemLike = createAsyncThunk("posts/fetchToggleItemLike", async function (data, args) {
    try {
        const state = args.getState();
        const isLiked = findItemLiked(data, state.user.data._id);
        const updatedItem = await apiPost.togglePostLike(data._id, isLiked);
        return args.fulfillWithValue({updatedItem, isLiked: isLiked})
    } catch (error) {
        return args.rejectWithValue(error)
    }
})
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        sortPosts: (state, {payload}) => {
            switch (payload) {
                case 'popular':
                    state.posts = state.posts.sort((a, b) => a.likes.length - b.likes.length);
                    break;
                case 'byRate':
                    state.posts = state.posts.sort((a, b) => countRateNum(b.reviews) - countRateNum(a.reviews));
                    break;
                case 'byAuthor':
                    state.posts = state.posts.sort((a, b) => b.author - a.author);
                    break;
                case 'byAlphabet':
                    state.posts = state.posts.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case 'byDate':
                    state.posts = state.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    break;
                default:
                    state.posts = state.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetPostList.fulfilled, (state, {payload}) => {
            const filteredProductsByAuthor = filterItemsByAuthor(payload.posts) ?? [];
            state.posts = filteredProductsByAuthor;
            state.favouritePosts = filteredProductsByAuthor.filter(e => findItemLiked(e, payload.userId))
        });
        builder.addCase(fetchPostById.fulfilled, (state, {payload}) => {
            console.log(payload);
            state.posts = filterItemsByAuthor(payload);
        })
        builder.addCase(fetchToggleItemLike.fulfilled, (state, {payload}) => {
            state.posts = state.posts.map(e => e._id === payload.updatedItem._id
            ? payload.updatedItem
            : e)
            if(payload.isLiked) {
                state.favouritePosts = state.favouritePosts.filter(e => e._id !== payload.updatedItem._id)
            } else {
                state.favouritePosts = [...state.favouritePosts, payload.updatedItem]
            }
        })
        builder.addMatcher(isLoading, (state) => {
            // state.loading = true;
        })
        builder.addMatcher(isError, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
    }
})


export default postsSlice.reducer;


// author
// : 
// {name: 'Диана Веселкина', about: 'Начинающий разработчик', avatar: 'https://i.yapx.ru/WGBMr.jpg', _id: '64423c303291d790b3fc967c', group: 'group-12'}
// comments
// : 
// []
// created_at
// : 
// "2023-06-02T17:55:24.163Z"
// image
// : 
// "https://nationaltoday.com/wp-content/uploads/2020/07/Kitten.jpg"
// isPublished
// : 
// true
// likes
// : 
// ['64789c93e0bf2c519bd0db5b']
// tags
// : 
// (2) ['Тести1', 'Тести3']
// text
// : 
// "Тести"
// title
// : 
// "Тест"
// updated_at
// : 
// "2023-06-03T18:50:44.630Z"
// __v
// : 
// 0
// _id
// : 
// "647a2d0ce0bf2c519bd29f51"