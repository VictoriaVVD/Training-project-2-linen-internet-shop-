import React from "react";
import "./style.scss"

export const Search = ({setSearch}) => {
    return (
        <input placeholder="Поиск" 
        onChange={(e) => setSearch(e.target.value)}
        className="search__input"
        />
    )
}