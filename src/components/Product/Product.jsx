import React, { useContext } from "react";
import s from "./index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {faHeart} from '@fortawesome/free-solid-svg-icons';
// import { faHeart as faHeartReg } from '@fortawesome/free-regular-svg-icons';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { TabsMenu } from "../Tabs/TabsMenu";


export const Product = ({product}) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
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
                        {/* <span className={s.product__like} onClick={toggleCardLike} title="Добавить в избранное">{liked ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeartReg} />}</span> */}
                    </div>
                    <div className={s.rating}>
                        <span>Article</span>
                        <span><FontAwesomeIcon icon={faStar} /></span>
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
                        <button>Добавить в корзину</button>
                    </div>
                    
                </div>
            </div> 


            <div>
                <TabsMenu product={product} />
            </div>


            {/* <div className={s.product__card_desc}>
                <ul className={s.product__card_desc_list}>
                    <li>Описание</li>
                    <li>Информация</li>
                    <li>Отзывы</li>
                </ul>
                <ul className={s.product__card_desc_list}>
                    <li>
                        {product.description}
                    </li>
                    <li></li>
                    <li></li>
                </ul>
                <div className={s.product__card_desc_content}>
                    <div className={s.desc}>
                        <span className={s.description}></span>
                    </div>
                    <div className={s.desc}>
                        <span className={s.description}></span>
                    </div>
                    <div className={s.desc}>
                        <span className={s.description}></span>
                    </div>
                </div>

            </div> */}
        </div>  
    </div>
    )
}