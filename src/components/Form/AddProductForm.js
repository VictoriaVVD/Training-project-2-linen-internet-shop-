import React, { useCallback } from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { apiProduct } from "../../assets/api/apiProduct";
import { useDispatch } from "react-redux";
import { fetchAddProduct, fetchGetProductList } from "../../store/slices/productsSlice";

export const AddProductForm = ({ isRequired = true, onSendNewProduct }) => {


    const { register, handleSubmit, formState: { errors }, reset } = useForm({mode: "onSubmit"});
    const dispatch = useDispatch();


    const sendData = useCallback(async (data) => {
        dispatch(fetchAddProduct(data))
        // .then(() => dispatch(fetchGetProductList()))
        // const res = await apiProduct.addNewProduct(data);
        // onSendNewProduct(data)
        reset()
    }, [dispatch])

    const picturesRegister = { 
        required: {
            value: isRequired,
            massage: 'Ссылка на фото товара'
        } 
    }

    const nameRegister = {
        required: {
            value: isRequired,
            message: 'Название'
        },
    }
    const priceRegister = {
        required: {
            value: isRequired,
            message: 'Цена товара'
        },
    }
    const discountRegister = {
        required: {
            value: !isRequired,
            message: 'Размер скидки'
        },
    }
    const descriptionRegister = {
        required: {
            value: isRequired,
            message: 'Описание товара'
        },
    }

    return (
        <div className="form__wrapper" >
            <h3>Добавление нового товара</h3>
            <form className="form" onSubmit={handleSubmit(sendData)}>

                <div>
                    <input className="form__input" type="text" {...register("pictures", picturesRegister)} placeholder="Ссылка на фото товара" />
                    {errors?.pictures && <span> {errors?.pictures.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type='text' {...register("name", nameRegister)} placeholder="Название" />
                    {errors?.name && <span> {errors?.name.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type='number' {...register("price", priceRegister)} placeholder="Цена" />
                    {errors?.price && <span> {errors?.price.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type='number' {...register("discount", discountRegister)} placeholder="Размер скидки" />
                    {errors?.discount && <span> {errors?.discount.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type='text' {...register("description", descriptionRegister)} placeholder="Описание товара" />
                    {errors?.description && <span> {errors?.description.message}</span>}
                </div>
                <button className="form__btn"  type="submit">Добавить</button>
            </form>
        </div>
    )
}