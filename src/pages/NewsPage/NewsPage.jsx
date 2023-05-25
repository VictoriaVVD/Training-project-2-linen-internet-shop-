import React, { useContext } from "react";
import { PostList } from "../../components/PostList/PostList";
import { CardContext } from "../../context/cardContext";

export const NewsPage = () => {
    
    const {posts} = useContext(CardContext);

    return (
        <div>
        <div>Карусель популярных статей</div>
        <div>Сортировка(новости, полезное...)</div>
        <div>Сайд бар с акциями</div>
            <PostList posts={posts}/>
        </div>
    )
}