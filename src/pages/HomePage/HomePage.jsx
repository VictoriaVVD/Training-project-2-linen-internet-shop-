import React from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { CarouselPromo } from "../../components/Carousel/Carousel";
import { setModalOpen, setStateByPath } from "../../store/slices/modalSlice";
import { openNotification } from "../../components/Notification/Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

export const HomePage = () => {
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({mode: "onSubmit"});

    const navigate = useNavigate();
    const {isAuthorized} = useSelector(s => s.user);
    const dispatch = useDispatch();

    const emailRegister = { 
        required: {
            value: true,
            message: 'Введите эл.адрес'
        } 
    }
    const sendData = (data) => {
        openNotification("success", "Вы подписаны на новости");
        reset()
    }

    const navigateToCatalog = () => {
        if (isAuthorized) {
            navigate("/catalog");
        } else {
            dispatch(setModalOpen(true));
            dispatch(setStateByPath("warning"));
        }
    }
    

    return (
            <div className="home">
                <div className="home__wrapper">
                    <div className="home__banner">
                        <button className="home__btn" onClick={navigateToCatalog}>Перейти в каталог</button>
                    </div>
                    <CarouselPromo />
                    <div className="home__promo_block">
                        <h3><FontAwesomeIcon icon={faTruck} size="lg" /> Бесплатная доставка</h3>
                        <div className="label">от 15 000 руб.</div>
                        <Link to={"/catalog"}>За покупками</Link>
                    </div> 
                    <div className="home__promo_subscribe">
                        <h2>Подпишитесь на новости</h2>
                        <div>
                            <form onSubmit={handleSubmit(sendData)}>
                                <div className="form__pass">
                                    <input className="form__input" 
                                        type="email" {...register("email", emailRegister)} 
                                        placeholder="Введите e-mail"
                                    />
                                    {errors?.email && <span> {errors?.email.message}</span>}
                                </div>
                                <button type="submite">ПОДПИСАТЬСЯ</button>
                            </form>
                        </div>
                    </div>
                </div>
                <Modal />
            </div>
    );
}
