import React from "react";
import  "./style.scss"
import { useSelector } from "react-redux";
import { GoBack } from "../../components/GoBack/GoBack";
import { PostList } from "../../components/PostList/PostList";
import { useParams } from "react-router-dom";

export const AuthorPage = () => {
    const {posts} = useSelector(s => s.posts);
    const {name} = useParams();
    const sortedPosts = posts.filter(e => e.author.name === name)

    return (
        <div className="author">
            <div className="author__wrapper">
                <GoBack />
                <div>
                    <h1>Статьи автора: <span>{name}</span></h1>
                </div>
                <PostList posts={sortedPosts} />
            </div>
        </div>
    )
}