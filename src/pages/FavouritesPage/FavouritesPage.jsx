import React from "react";
import  "./style.scss"
import { CardList } from "../../components/CardList/CardList";
import { useSelector } from "react-redux";
import { GoBack } from "../../components/GoBack/GoBack";
import { PostList } from "../../components/PostList/PostList";

export const FavouritesPage = () => {

    const favourites = useSelector(s => s.products?.favourites);
    const favouritePosts = useSelector(s => s.posts?.favouritePosts);

    return (
        <div className="favourites">
            <div className="favourites__wrapper">
                <GoBack />
                <div>
                    <h1>Избранное</h1>
                </div>
            
                <CardList cards={favourites} />
                <PostList posts={favouritePosts} />
            </div>
        </div>
    )
}