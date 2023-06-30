import React, { useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartReg } from '@fortawesome/free-regular-svg-icons';
import "./style.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteProduct, fetchToggleItemLike } from "../../store/slices/productsSlice";
import { findItemLiked } from "../../tools/utils";
import { addProductInCart, deleteProductInCart } from "../../store/slices/productCartSlice";


export const Card = ({product}) => {
    
    const {cart} = useSelector(s => s.cart);
    const user = useSelector(s => s.user?.data);
    const dispatch = useDispatch();
    const location = useLocation();
    
    const isLiked = findItemLiked(product, user?._id);
    
    const toggleCardLike = () => {
        dispatch(fetchToggleItemLike(product, isLiked));
    }

    const deleteCard = useCallback(async () => {
        dispatch(fetchDeleteProduct(product._id));
    }, [dispatch, product._id]);

    return (
            <div className="card">
                <div className="card__icon_top-left">
                    {!!product.discount && <span className="card__discount">
                        -{product.discount}%
                    </span>}
                </div>
                {(location.pathname === "/catalog" || location.pathname === "/favourites")  &&
                    <div className="card__icon_top-right">
                        <span onClick={toggleCardLike}>{isLiked 
                            ? <FontAwesomeIcon icon={faHeart} /> 
                            : <FontAwesomeIcon icon={faHeartReg} />}
                        </span>
                    </div>}
                <div className="card__info_block">
                    <div className="card__info_img-box">
                        <Link to={`/product/${product._id}`} className="card__link">
                            {location.pathname !== "/catalog"
                                ? <img src={product.pictures} alt="madame coco linen" className="card__info_img" />
                                : <img src={product.pictures} alt="madame coco linen" className="card__info_img card__info_img_grey-effect" />
                            }
                            {product.tags.map((e) =>
                                <span className={`card__tag tag__type_${e}`} key={e}>{e}</span>)} 
                            {!!product.discount && <span className="card__tag tag__type_sale"></span>}  
                        </Link>
                            {location.pathname === "/catalog" && product.author?._id === user._id &&
                                <div className="card__hover_effect">
                                    <button onClick={deleteCard}>Удалить</button>
                                </div>
                            }
                    </div>
                    <div className="card__info_description">
                        <span className="card__oldprice">
                            {product.discount ? Math.round(product.price / (1 - product.discount / 100)) + ' ₽' : null}
                        </span>
                        <span className="card__price" style={product.discount 
                            ? {"color": "red"} 
                            : {"color": "#1A1A1A"}}
                        >
                            {product.price}&nbsp;₽
                        </span>
                        <span className="card__wight">{product.wight}</span>
                        <Link to={`/product/${product._id}`}>
                            <p className="card__title">{product.name}</p>
                        </Link>
                    </div>
                </div>
                    {!cart.find(e => e.product._id === product._id) 
                        ?   <button
                                onClick={()=> dispatch(addProductInCart({product, quantity: 1}))}> 
                                Добавить в корзину
                            </button>
                        :   <div className="card__cart">
                                <button onClick={() => dispatch(deleteProductInCart({ product, quantity: 1 }))}>
                                    -
                                </button>
                                    <span>{cart.map(e => e.product._id === product._id ? e.quantity : "")}</span>
                                <button onClick={() => dispatch(addProductInCart({ product, quantity: 1 }))}>
                                    +
                                </button>
                            </div>
                    }
            </div>
    )
};
