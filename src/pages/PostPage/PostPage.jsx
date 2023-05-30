import React, { useEffect, useState } from "react";
import { Article } from "../../components/Article/Article";
import { useParams } from "react-router-dom";
import { apiPost } from "../../assets/api/apiPost";

export const PostPage = () => {
    const [post, setPost] = useState({});
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            apiPost.getPostById(id)
            .then(data => setPost(data))
            .catch(error => console.log(error.statusText))
            
        }
    }, [id])
    return (
        <div>
            <Article post={post} />
        </div>
    )
}