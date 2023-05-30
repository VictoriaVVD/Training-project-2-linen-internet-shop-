import React, { useContext } from "react";
import { PostList } from "../../components/PostList/PostList";
import { CardContext } from "../../context/cardContext";

export const NewsPage = ({handlePostLike}) => {
    
    const {posts} = useContext(CardContext);
    
    return (
        <div>

            <PostList posts={posts} handlePostLike={handlePostLike} />
        </div>
    )
}