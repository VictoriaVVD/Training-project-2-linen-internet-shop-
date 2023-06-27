import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ProductRate } from "../ProductRate/ProductRate";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../store/slices/modalSlice";
import { fetchAddProductReview } from "../../store/slices/productsSlice";

export const ReviewForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({mode: "onSubmit"});

    const product = useSelector(s => s.products?.currentProduct)

    const dispatch = useDispatch()
    const user = useSelector(s => s.user?.data);
    const [rate, setRate] = useState();

    const sendData = ({text}) => {
        dispatch(fetchAddProductReview({productId: product?._id, body:{ text: text, rating: rate }}))
        reset();
        dispatch(setModalOpen(false))
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

    return (
        <form className="form" onSubmit={handleSubmit(sendData)}>
            <div className="form__wrapper">
                <div className="form__review_wrapper">
                    <div className="form__image_block">
                        <img className="form__image review_img" src={product.pictures} alt="" />
                        <div className="form__review_info">
                            <p className="form__review_info_title">{product.name}</p>
                            <span>Оцените товар</span>
                            <ProductRate rating={rate} setRate={setRate} isEditable={true} />
                        </div>
                    </div>
                    <textarea className="review_input" 
                        cols={30} rows={8} 
                        {...register("text", reviewRegister)} 
                        placeholder={`${user.name}, оставьте, пожалуйста, Ваш отзыв о товаре `}>
                    </textarea>
                    <button type="submit">Отправить</button>
                </div>
            </div>
        </form>
    )
}