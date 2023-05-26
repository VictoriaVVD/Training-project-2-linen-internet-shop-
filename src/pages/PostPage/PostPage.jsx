import React from "react";
import { Article } from "../../components/Article/Article";

export const PostPage = ({post}) => {
    return (
        <div>
            <Article post={post} />
        </div>
    )
}