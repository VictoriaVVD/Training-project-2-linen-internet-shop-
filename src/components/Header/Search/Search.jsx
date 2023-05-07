import React from "react";
import "./Search.scss"

export const Search = ({setSearch}) => {
    return (
        <input placeholder="Поиск" 
        onChange={(e) => setSearch(e.target.value)}
        className="search__input"
        />
    )
}