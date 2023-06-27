import React from "react";
import { PostList } from "../../components/PostList/PostList";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { findWordEnd, sortPostsParameters } from "../../tools/utils";
import { GoBack } from "../../components/GoBack/GoBack";
import { sortPosts } from "../../store/slices/postsSlice";

export const NewsPage = () => {

    const {posts, search} = useSelector(s => s.posts);
    const dispatch = useDispatch();

    return (
        <div className="posts">
            <div className="posts__wrapper">
                <div className="post-list__wrapper">
                    {search && 
                        <p className="post-list__search__message">
                            По Вашему запросу {posts.length === 1 ? 'найден' : 'найдено'} 
                                <span>{posts.length}</span> 
                                    {findWordEnd(posts.length, "объект")}
                        </p>
                    }
                    <GoBack />
                    <div className="post-list__sorted">
                        {!search && sortPostsParameters.map((e) => 
                            <span className="post-list__sorted_item" key={e.id} 
                                onClick={() => dispatch(sortPosts(e.id))}>{e.title}
                            </span>
                        )}
                    </div>
                </div>
                <PostList posts={posts} />
            </div>
            </div>
    )
}