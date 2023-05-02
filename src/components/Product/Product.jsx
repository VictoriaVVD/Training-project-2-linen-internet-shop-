import React from "react";
import s from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";

export const Product = ({product}) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return (
    <div className={s.product}>
        <div className={s.productWrapper}>
            <div className={s.titleWrapper}>
                <Link to="/catalog">
                    <span onClick={() => goBack()}>{'<'} Назад</span>
                </Link>
                <span className={s.productTitle}>{product.name}</span>
            </div>
            <div className={s.rating}>
                <span>Article</span>
                <span>Rate</span>
            </div>
            <div className={s.imgWrapper}>
                <img className={s.img} src={product.pictures} alt="" />
            </div>
            <div className={s.desc}>
                <span className={s.oldPrice}>{product.discount ? Math.round(product.price / (1 - product.discount / 100)) : null}</span>
            </div>
            <div className={s.desc}>Цена
                <span className={s.price}>{product.price}&nbsp;₽</span>
            </div>
            <div className={s.desc}>
                <span className={s.description}>{product.description}</span>
            </div>
        </div>  
    </div>
    )
}