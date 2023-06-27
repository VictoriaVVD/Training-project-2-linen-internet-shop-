import React from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProductInCart, deleteProductInCart } from "../../store/slices/productCartSlice";

export const CartItem = ({product, quantity}) => {

    const dispatch = useDispatch();

    return (
        <>
            <div className="item__info">
                <div className="item__info_wrapper">
                    <Link to={`/product/${product._id}`}>
                        <img className="item__image" src={product.pictures} alt='item__image'/>
                    </Link>
                </div>
                <div className="item__info_wrapper">
                    {product.name}
                </div>
                <div className="item__info_wrapper">

                    <strong>{Math.round(product.price / (1 - product.discount / 100))}&nbsp;₽</strong>
                </div>
                <div className="item__info_wrapper">

                    {!!product.discount
                    ? <span>{product.discount}&nbsp;%</span>
                    : <span> - </span>}
                </div>
                <div className="item__info_wrapper">

                    <div className="item__count">
                        <span onClick={() => dispatch(deleteProductInCart({ product, quantity: 1 }))}>-</span>
                        <p>{quantity}</p>
                        <span onClick={() => dispatch(addProductInCart({ product, quantity: 1 }))}>+</span>
                    </div>
                </div>
                <div className="item__info_wrapper">
                    {product.price * quantity}&nbsp;₽
                </div>
            </div>
        </>
    )
}
