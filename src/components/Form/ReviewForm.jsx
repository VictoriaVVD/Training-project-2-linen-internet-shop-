import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ProductRate } from "../ProductRate/ProductRate";
import "./style.scss";
import { UserContext } from "../../context/userContext";
import { api } from "../../assets/api/api";

export const ReviewForm = ({product, setProduct, setModalActive}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onSubmit"});
    const sendData = async (data) => {
        const res = await api.addReview(product._id, data);
        console.log(product, data);
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
        <>
            <div>

            </div>
            <div>
                <ProductRate product={product} />
            </div>
            <div className="form__wrapper">
                <form className="form" onSubmit={handleSubmit(sendData)}>
                    <textarea className="form__input" cols={35} rows={8} {...register("text", reviewRegister)} placeholder={`${user.name}, оставьте, пожалуйста, Ваш отзыв о товаре `}></textarea>
                    <button type="submit">Отправить</button>
                </form>
            </div>
            
        </>
    )
}