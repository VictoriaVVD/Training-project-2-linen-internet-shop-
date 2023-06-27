import React from "react";
import "./style.scss"
import { useDispatch } from "react-redux";
import { fetchSearch } from "../../store/slices/productsSlice";
import { fetchSearchPosts } from "../../store/slices/postsSlice";
import { useLocation } from "react-router-dom";

export const Search = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    return (
            <input placeholder="Поиск"
                    onChange={
                        location.pathname === "/catalog"
                        ?   (e => dispatch(fetchSearch(e.target.value)))
                        :   (e => dispatch(fetchSearchPosts(e.target.value)))
                    }
                    className="search__input"
                />
    )
}