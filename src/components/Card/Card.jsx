import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartReg } from '@fortawesome/free-regular-svg-icons';
import { api } from "../../assets/api/api";
import { Link } from "react-router-dom";
import "./Card.css";


export const Card = ({product, userId, handleLike}) => {
    const isLiked = product.likes.some(e => e === userId);
    const toggleCardLike = () => {
        handleLike(product, isLiked);
}

    return (
<div className="card">
            <div className="card__sticky card__sticky_top-left">
                {!!product.discount && <span className="card__discount">
                    -{product.discount}%
                </span>}
            </div>
            <div className="card__sticky card__sticky_top-right">
                    <span onClick={toggleCardLike}>{isLiked ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeartReg} />}</span>
            </div>
            <Link to={`/product/${product._id}`} className="card__link">
                <img src={product.pictures} alt="madame coco linen" className="card__image"/>
                {product.tags.map((e) =>
                        <span className={`card__tag tag__type_${e}`} key={e}>{e}</span>)}  
                <div className="card__desc">
                    <span className="card__oldprice">{product.discount ? Math.round(product.price / (1 - product.discount / 100)) : null}</span>
                    <span className="card__price" style={product.discount ? {"color": "red"} : {"color": "#1A1A1A"}}>{product.price}&nbsp;₽</span>
                    <span className="card__wight">{product.wight}</span>
                    <p className="card__title">{product.name}</p>
                </div>
            </Link>
            <span className="card__button">В корзину</span>
        </div>
    )
};

/**
{
    "discount": 0,
    "stock": 30,
    "available": true,
    "pictures": "https://cdn-mgsm.akinon.net/products/2023/03/30/132921/6bbc9ec1-f868-4612-92fd-a97dc3bc3a6f_size690x862_cropCenter.jpg",
    "name": "Комплект постельного белья из шелкового атласа Ivonne",
    "price": 12000,
    "wight": "1шт",
    "description": "Технические характеристики: Тип ткани: 100% лиоцелл; Цвет: Бежевый; Характеристика: не линяет и не садится; Инструкции по стирке: Стирать при 30 градусах; Место производства: Турция; Комплектация: Пододеяльник: 1 шт. Простыня: 1 шт. Наволочка: 2 шт."
}
**/