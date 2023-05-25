import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductRate } from "../ProductRate/ProductRate";
import "./style.scss";
import { UserContext } from "../../context/userContext";
import { api } from "../../assets/api/api";

export const ReviewForm = ({product, setProduct, setModalActive, rating}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onSubmit"});
    const [rate, setRate] = useState();
    const sendData = async (data) => {
        const res = await api.addReview(product._id, data);
        console.log({res});
        setProduct({...res});
        setModalActive(false)
        
    }
    const reviewRegister = {
        required: {
            value: true,
            message: "Обязательное поле!",
        },
        maxLength: {
            value: 1000,
            message: "Максимальная длина отзыва - 1000 символов",
        },
    }


    const user = useContext(UserContext);
    return (
        <div className="form__review_wrapper">
            <div className="form__wrapper">
                <form className="form" onSubmit={handleSubmit(sendData)}>
                    <div className="form__image_block">
                        <img className="form__image" src={product.pictures} alt="" />
                        <div className="form__review_info">
                            <p className="form__review_info_title">{product.name}</p>
                            <span>Оцените товар</span>
                            <ProductRate product={product} setRate={setRate} isEditable={true} />
                        </div>
                    </div>
                    <textarea className="form__input" cols={60} rows={8} {...register("text", reviewRegister)} placeholder={`${user.name}, оставьте, пожалуйста, Ваш отзыв о товаре `}></textarea>
                    <button type="submit">Отправить</button>
                </form>
            </div>
        </div>
    )
}