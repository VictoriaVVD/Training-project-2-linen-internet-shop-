import React, { useCallback, useEffect, useState } from "react";
import { Article } from "../../components/Article/Article";
import { useParams } from "react-router-dom";
import { apiPost } from "../../assets/api/apiPost";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById, fetchToggleItemLike } from "../../store/slices/postsSlice";

export const PostPage = () => {
    const [ setPost] = useState({});
    const { id } = useParams();
    const user = useSelector(s => s.user?.data);
    const {posts} = useSelector(s => s.posts);
    const dispatch = useDispatch();
    const post = posts.filter(e => e._id === id)

    console.log({post});

    const onPostLike = useCallback(async (item, isLiked) => {
        dispatch(fetchToggleItemLike({ post: item, isLiked: isLiked }))
        if (isLiked) {
            const filteredCards = post.likes.filter(e => e !== user._id);
            setPost(state => ({...state, likes: filteredCards }))
            }
        else
            {
            const filteredCards = [...post.likes, user?._id];
            setPost(state => ({...state, likes: filteredCards}))
            }
    }, [dispatch, user?._id, post])


    // useEffect(() => {
    //     if (id) {
    //         apiPost.getPostById(id)
    //         .then(data => {
    //             setPost(data)})
    //         .catch(error => console.log(error.statusText))    
    //     }
    // }, [id])
    useEffect(() => {
        dispatch(fetchPostById(id))
    }, [id, dispatch])
    return (
        <div>
            <Article post={post} onPostLike={onPostLike} />
        </div>
    )
}