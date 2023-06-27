import React, { useCallback, useState } from "react";
import s from "./index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from '@fortawesome/free-regular-svg-icons';
import { TabsMenuForProducts } from "../Tabs/TabsMenuForProducts";
import { ProductRate } from "../ProductRate/ProductRate";
import { Modal } from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { countRateNum } from "../../tools/utils";
import { fetchToggleItemLike } from "../../store/slices/productsSlice";
import { addProductInCart, deleteProductInCart } from "../../store/slices/productCartSlice";
import { findWordEnd } from "../../tools/utils";
import { GoBack } from "../GoBack/GoBack";
import { useLocation } from "react-router-dom";
import { setModalOpen, setStateByPath } from "../../store/slices/modalSlice";


export const Product = ({product, setProduct}) => {

    const user = useSelector(s => s.user.data);  
    const {cart} = useSelector(s => s.cart);

    const dispatch = useDispatch(); 
    const location = useLocation();
    const [isLikedProduct, setProductLike] = useState(false);
    const isLiked = product.likes?.some(e => e === user?._id);

    const toggleCardLike = useCallback(() => {
        dispatch(fetchToggleItemLike(product, isLiked))
        .then((data) => {
            setProductLike(isLikedProduct);
            setProduct(data.payload?.updatedItem);
        });
    }, [dispatch, isLiked, isLikedProduct,product]);

    const updateCard = useCallback(() => {
        dispatch(setModalOpen(true));
        dispatch(setStateByPath("updateProduct"));
    }, [dispatch]); 


    return (
    <div className={s.product}>
        <div className={s.product__wrapper}>
            <GoBack />
            <div className={s.product__card}>
                <div className={s.img__box}>
                    <div className={s.img__wrapper}>
                        <img className={s.img} src={product.pictures} alt="" />
                        {location.pathname === `/product/${product._id}` && 
                            <div className={s.img__hover_effect}>
                                <button id={product._id} onClick={updateCard}>Редактировать</button>
                            </div>
                        }
                    </div>
                </div>
                <div className={s.product__info}>
                    <div className={s.product__title_wrapper}>
                        <span className={s.product__title}>{product.name}</span>
                    </div>
                    <div className={s.rating}>
                        <ProductRate rating={Math.floor(countRateNum(product.reviews))}/>
                        <span>{product.reviews?.length}</span>
                            {findWordEnd(product.reviews.length, " отзыв")}

                    </div>
                    {!!product.discount &&<div className={s.desc}>Старая цена:
                        <span className={s.old_price}>
                            {Math.round(product.price / (1 - product.discount / 100))}&nbsp;₽
                        </span>
                    </div>}
                    <div className={s.desc}>Цена: 
                        <span className={s.price}>{product.price}&nbsp;₽</span>
                    </div>
                    <div className={s.desc}>
                    </div>
                    <div className={s.btn}>
                    {!cart.find(e => e.product._id === product._id) 
                        ? <button onClick={()=> dispatch(addProductInCart({product, quantity: 1}))}>
                            <FontAwesomeIcon icon={faCartPlus} size="lg" className={s.product__like} /> 
                                Добавить в корзину
                        </button>
                        : <div className={s.cart_btn}>
                                <button onClick={() => dispatch(deleteProductInCart({ product, quantity: 1 }))}>
                                    -
                                </button>
                                <span>{cart.map(e => e.product._id === product._id ? e.quantity : "")}</span>
                                <button onClick={() => dispatch(addProductInCart({ product, quantity: 1 }))}>
                                    +
                                </button>
                            </div>
                        }
                        <button className={s.btn_inner} onClick={toggleCardLike}>
                            {isLiked 
                            ? <FontAwesomeIcon icon={faHeart} size="lg" className={s.product__like} /> 
                            : <FontAwesomeIcon icon={faHeartReg} size="lg" className={s.product__like} />}
                            <span>{isLiked ? "Добавлено в избранное" : "Добавить в избранное"}</span>
                        </button>
                    </div>
                </div>
            </div> 
            <div>
                <TabsMenuForProducts product={product} setProduct={setProduct} />
                <Modal />
            </div>
        </div>  
    </div>
    )
}