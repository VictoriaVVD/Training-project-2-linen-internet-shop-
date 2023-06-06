import React, { useCallback, useContext, useState } from "react";
import s from "./index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartReg } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { TabsMenu } from "../Tabs/TabsMenu";
import { ProductRate } from "../ProductRate/ProductRate";
import { CardContext } from "../../context/cardContext";
import { Modal } from "../Modal/Modal";
import { ReviewForm } from "../Form/ReviewForm";
import { useDispatch, useSelector } from "react-redux";
import { countRateNum } from "../../store/utilsStore";
import { fetchToggleItemLike } from "../../store/slices/productsSlice";



export const Product = ({product, setProduct, rating, addReview}) => {

    const user = useSelector(s => s.user.data);  
    const dispatch = useDispatch();  
    const [isLikedProduct, setProductLike] = useState(false);
    const { modalActive, setModalActive } = useContext(CardContext);
    const isLiked = product.likes?.some(e => e === user?._id);

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    const toggleCardLike = useCallback(async () => {
        dispatch(fetchToggleItemLike(product, isLiked))
        .then((data) => {
            setProductLike(isLikedProduct);
            setProduct(data.payload.updatedItem);
        });
    }, [dispatch, isLiked, isLikedProduct, product, setProduct]);
    
    const onSendReview = (data) => {
        addReview(data);
    }

    return (
    <div className={s.product}>
        <div className={s.product__wrapper}>
            <Link to="/catalog">
                <span onClick={() => goBack()}>{'<'} Назад</span>
            </Link>
            <div className={s.product__card}>
                <div className={s.img__box}>
                    <div className={s.img__wrapper}>
                        <img className={s.img} src={product.pictures} alt="" />
                    </div>
                </div>
                <div className={s.product__info}>
                    <div className={s.product__title_wrapper}>
                        <span className={s.product__title}>{product.name}</span>
                    </div>
                    <div className={s.rating}>
                        <span>Barcode</span>
                        <ProductRate rating={Math.floor(countRateNum(product.reviews))}/>
                    </div>
                    {!!product.discount &&<div className={s.desc}>Старая цена:
                        <span className={s.old_price}>{Math.round(product.price / (1 - product.discount / 100))}&nbsp;₽</span>
                    </div>}
                    <div className={s.desc}>Цена: 
                        <span className={s.price}>{product.price}&nbsp;₽</span>
                    </div>
                    <div className={s.desc}>
                        <span title="Бесплатная доставка при заказе от 7000 руб.">Стоимость доставки</span>
                    </div>
                    <div className={s.select}>Выбрать размер:
                        <button>Односпальное</button>
                        <button>Двуспальное</button>
                        <button>Евро</button>
                    </div>
                    <div className={s.desc}>Количество 
                        <select>
                            <option value="1"> 1 </option>
                            <option value="1"> 2 </option>
                            <option value="1"> 3 </option>
                            <option value="1"> 4 </option>
                            <option value="1"> 5 </option>
                        </select>
                    </div>
                    <div className={s.desc}>
                        <button>
                            <span className={s.product__like}><FontAwesomeIcon icon={faCartPlus} size="lg" /></span>
                            <span>Добавить в корзину</span>
                        </button>
                        <button onClick={toggleCardLike}>
                            <span className={s.product__like}>{isLiked ? <FontAwesomeIcon icon={faHeart} size="lg" /> : <FontAwesomeIcon icon={faHeartReg} size="lg" />}</span>
                            <span >{isLiked ? "Добавлено в избранное" : "Добавить в избранное"}</span>
                        </button>
                    </div>
                    
                </div>
            </div> 

            <div>
                <TabsMenu product={product} setProduct={setProduct} />
                <Modal modalActive={modalActive} setModalActive={setModalActive}>
                    <ReviewForm product={product} onSendReview={onSendReview} setModalActive={setModalActive} rating={rating}  />
                </Modal>
            </div>
        </div>  
    </div>
    )
}