import React from "react";
import s from "./index.module.css"
import { useNavigate } from "react-router";
import { CardList } from "../../components/CardList/CardList";
import { Link } from "react-router-dom";

export const FavouritesPage = ({ favourites, userId, handleProductLike}) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    return (
        <div className={s.favouritesPage}>
            <div className={s.favouritePageWrapper}>
                <Link to="/catalog">
                    <span onClick={() => goBack()} className={s.favourites__back}>{'<'} Назад</span>
                </Link>
                <h1 className={s.favourites__title}>Избранное</h1>
            </div>
            <CardList cards={favourites} handleLike={handleProductLike} userId={userId} />
        </div>
    )
}