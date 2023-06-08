import React, { useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartReg } from '@fortawesome/free-regular-svg-icons';
import "./style.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteProduct, fetchToggleItemLike } from "../../store/slices/productsSlice";
import { findItemLiked } from "../../store/utilsStore";


export const Card = ({product}) => {
    const location = useLocation();
    const user = useSelector(s => s.user?.data);
    const dispatch = useDispatch();
    const isLiked = findItemLiked(product, user?._id);
    
    const toggleCardLike = () => {
        dispatch(fetchToggleItemLike(product, isLiked));
    }
    const deleteCard = useCallback(async () => {
        dispatch(fetchDeleteProduct(product._id))
    }, [dispatch, product._id]);

    return (
            <div className="card">
                <div className="card__sticky card__sticky_top-left">
                    {!!product.discount && <span className="card__discount">
                        -{product.discount}%
                    </span>}
                </div>
                {location.pathname === "/catalog" &&
                <div className="card__sticky card__sticky_top-right">
                    <span onClick={toggleCardLike}>{isLiked ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeartReg} />}</span>
                </div>}
                <Link to={`/product/${product._id}`} className="card__link">
                    <img src={product.pictures} alt="madame coco linen" className="card__image"/>
                    {product.tags.map((e) =>
                        <span className={`card__tag tag__type_${e}`} key={e}>{e}</span>)} 
                    {!!product.discount && <span className="card__tag tag__type_sale"></span>}  

                    <div className="card__desc">
                        <span className="card__oldprice">{product.discount ? Math.round(product.price / (1 - product.discount / 100)) : null}</span>
                        <span className="card__price" style={product.discount ? {"color": "red"} : {"color": "#1A1A1A"}}>{product.price}&nbsp;₽</span>
                        <span className="card__wight">{product.wight}</span>
                        <p className="card__title">{product.name}</p>
                    </div>
                </Link>
                {location.pathname === "/catalog" &&
                <div>
                    <span className="card__button">В корзину</span>
                    <div >
                        <span className="card__sticky_bottom-right"><FontAwesomeIcon icon={faTrash} size="lg" onClick={deleteCard} /></span>
                    </div>
                </div>}
            </div>
    )
};
