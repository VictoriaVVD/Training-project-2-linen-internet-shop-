import React, { useEffect, useState } from "react";
import { Article } from "../../components/Article/Article";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGetPostById } from "../../store/slices/postsSlice";

export const PostPage = () => {

    const [post, setPost] = useState({});
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetPostById(id))
        .then((data) => setPost(data.payload))
    }, [id, dispatch])

    return (
        <div>
            {!!Object.keys(post).length 
                ?   <Article post={post} setPost={setPost} />
                :   <div>Loading...</div>
            }
        </div>
    )
}