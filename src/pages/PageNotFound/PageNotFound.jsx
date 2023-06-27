import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faFrown } from "@fortawesome/free-regular-svg-icons";
import "./style.scss";
import { Link } from "react-router-dom";


export const PageNotFound = () => {
    return (
        <div className="not__found">
            <div className="not__found_wrapper">
            <FontAwesomeIcon icon={faFrown} className="icon_sad" />
                <h1>404</h1>
                <h2>Страница не найдена</h2>
                <p>Возможно, Вы пытались загрузить несуществующую или удаленную страницу.</p>
                <Link to={"/"} className="not__found_link">На главную</Link>
            </div>
        </div>
    )
}