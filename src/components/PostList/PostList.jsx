import React from "react";
import { Post } from "../Post/Post";

export const PostList = ({posts}) => {

    return (
        <div className="list__wrapper">
            <div>
                {posts.map(item => <Post post={item} {...item} key={item.updated_at} />)}
            </div>
        </div>
    )
}