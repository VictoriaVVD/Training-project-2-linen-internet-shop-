import React from "react";
import s from "./index.module.scss"
import { useNavigate } from "react-router";
import { CardList } from "../../components/CardList/CardList";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import { PostList } from "../../components/PostList/PostList";

export const FavouritesPage = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const {favourites, favouritesPosts} = useContext(CardContext);

    return (
        <div className={s.favouritesPage}>
            <div className={s.favouritesPage__wrapper }>
                <Link>
                    <span onClick={() => goBack()} className={s.favourites__back}>{'<'} Назад</span>
                </Link>
                <h1 className={s.favourites__title}>Избранное</h1>
            </div>
            <CardList cards={favourites} />
            <PostList posts={favouritesPosts} />
        </div>
    )
}