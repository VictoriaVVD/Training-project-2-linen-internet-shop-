import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiPost } from "../../tools/api/apiPost";
import { filterItemsByAuthor, findItemLiked } from "../../tools/utils";
import { isError, isLoading } from "../utilsStore";
import { openNotification } from "../../components/Notification/Notification";


const initialState = {
    posts: [],
    currentPost: {},
    favouritePosts: [],
    loading: false,
    search: null,
}

export const fetchGetPostList = createAsyncThunk("posts/fetchGetPostList", async function (userId, args) {
    try {
        const state = args.getState()
        const data = await apiPost.getAllPosts();
        return args.fulfillWithValue( {posts: data, userId: state.user.data?._id} )
    } catch (error) {
        return args.rejectWithValue(error)
    } 
})

export const fetchGetPostById = createAsyncThunk("posts/fetchGetPostById", async function (id, args) {
    try {
        const data = await apiPost.getPostById(id);
        return args.fulfillWithValue(data);
    } catch (error) {
        return args.rejectWithValue(error)
    } 
})

export const fetchSearchPosts = createAsyncThunk("posts/fetchSearchPosts", async function (search, args) {
    try {
        console.log(search);
        const state = args.getState();
        const searchResult = await apiPost.searchPosts(search)
        return args.fulfillWithValue({searchResult, userId: state.user.data._id});
    } catch (error) {
        return args.rejectWithValue(error);
    }
})

export const fetchToggleItemLike = createAsyncThunk("posts/fetchToggleItemLike", async function (post, args) {
    try {
        const state = args.getState();
        const isLiked = findItemLiked(post, state.user.data._id);
        const updatedItem = await apiPost.togglePostLike(post._id, isLiked);
        return args.fulfillWithValue({updatedItem, isLiked})
    } catch (error) {
        return args.rejectWithValue(error)
    }
})

export const fetchAddComment = createAsyncThunk("posts/fetchAddComment", async function (data, args) {
    try {
        console.log({data});
        const addedComment = await apiPost.addComment(data.postId, data.text);
        return args.fulfillWithValue(addedComment);
    } catch (error) {
        args.rejectWithValue(error);
    }
})

export const fetchDeleteComment = createAsyncThunk("posts/fetchDeleteComment", async function (data, args) {
    try {
        console.log({data});
        const res = await apiPost.deleteComment(data.postId, data.commentId)
        return args.fulfillWithValue(res);
    } catch (error) {
        args.rejectWithValue(error);
    }
})

export const fetchAddNewPost = createAsyncThunk("posts/fetchAddNewPost", async function (data, args) {
    try {
        console.log({data});
        const addedPost = await apiPost.addNewPost(data);
        return args.fulfillWithValue(addedPost);
    } catch (error) {
        return args.rejectWithValue(error);
    }
})

export const fetchUpdatePost = createAsyncThunk("posts/fetchUpdatePost", async function (data, args) {
    try {
        console.log({data});
        const updatedPost = await apiPost.updatePost();
        return args.fulfillWithValue(updatedPost);
    } catch (error) {
        return args.rejectWithValue(error)
    }
})

export const fetchDeletePostById = createAsyncThunk("posts/fetchDeletePostById", async function ( id, args) {
    try {
        const deletedPost = await apiPost.deletePost(id);
        return args.fulfillWithValue(deletedPost);
    } catch (error) {
        return args.rejectWithValue(error);
    }
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        sortPosts: (state, {payload}) => {
            switch (payload) {
                case 'popular':
                    state.posts = state.posts.sort((a, b) => b.likes.length - a.likes.length);
                    break;
                case 'byAlphabet':
                    state.posts = state.posts.sort((a, b) => {
                        if (a.title < b.title) {return -1}
                        if (a.title > b.title) {return 1}
                        return 0;
                    });
                    break;
                case 'byDate':
                    state.posts = state.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    break;
                case 'byComments':
                    state.posts = state.posts.sort((a, b) => b.comments.length - a.comments.length);
                    break;
                default:
                    state.posts = state.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetPostList.fulfilled, (state, {payload}) => {
            const filteredPosts = filterItemsByAuthor(payload.posts, payload.userId);
            state.posts = filteredPosts;
            state.favouritePosts = filteredPosts.filter(e => findItemLiked(e, payload.userId))
        });
        builder.addCase(fetchGetPostById.fulfilled, (state, {payload}) => {
            state.currentPost = payload;
        })
        builder.addCase(fetchSearchPosts.fulfilled, (state, {payload}) => {
            console.log(payload);
            state.posts = filterItemsByAuthor(payload.searchResult, payload.userId)
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
        builder.addCase(fetchAddComment.fulfilled, (state, {payload}) => {
            console.log({payload});
            state.posts = state.posts.map(e => e._id === payload._id
                ? payload
                : e)
            // state.posts.comments = [...state.posts.comments, payload];
            // state.currentPost.comments = payload.comments;
        });
        builder.addCase(fetchDeleteComment.fulfilled, (state, {payload}) => {
            console.log({payload});
            // state.posts = state.posts.filter(e => e._id !== payload._id);
            state.currentPost.comments = payload.comments;
        })
        builder.addCase(fetchAddNewPost.fulfilled, (state, {payload}) => {
            openNotification("success", "Поздравляю! Теперь Ваша статья доступна для чтения!")
            state.posts = [...state.posts, payload]
        });
        builder.addCase(fetchUpdatePost.fulfilled, (state, {payload}) => {
            console.log({payload});
        })
        builder.addCase(fetchDeletePostById.fulfilled, (state, {payload}) => {
            openNotification("success", "Статья удалена!");
            state.posts = state.posts.filter(e => e._id !== payload._id);
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

export const {sortPosts} = postsSlice.actions;
export default postsSlice.reducer;
