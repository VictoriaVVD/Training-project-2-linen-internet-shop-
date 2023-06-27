import React, { useCallback } from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { useDispatch } from "react-redux";
import { fetchAddProduct } from "../../store/slices/productsSlice";
import { setModalOpen } from "../../store/slices/modalSlice";

export const AddProductForm = ({ isRequired = true }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({mode: "onSubmit"});
    const dispatch = useDispatch();

    const sendData = useCallback(async (data) => {
        dispatch(fetchAddProduct(data));
        reset();
        dispatch(setModalOpen(false));
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
    const wightRegister = {
        required: {
            value: !isRequired,
            message: 'Количество единиц в упаковке'
        },
    }
    const stockRegister = {
        required: {
            value: !isRequired,
            message: 'Количество на складе'
        },
    }

    return (
        <form className="form" onSubmit={handleSubmit(sendData)}>
            <div className="form__wrapper" >
                <h2 className="form__pass">Добавление нового товара</h2>
                <div className="form__pass">
                    <input className="form__input" 
                        type="text" {...register("pictures", picturesRegister)} 
                        placeholder="Ссылка на фото товара"
                    />
                    {errors?.pictures && <span>{errors?.pictures.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" 
                        type='text' {...register("name", nameRegister)} 
                        placeholder="Название"
                    />
                    {errors?.name && <span>{errors?.name.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" 
                        type='number' {...register("price", priceRegister)} 
                        placeholder="Цена"
                    />
                    {errors?.price && <span>{errors?.price.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" 
                        type='text' {...register("wight", wightRegister)} 
                        placeholder="Количество в упаковке"
                    />
                    {errors?.wight && <span>{errors?.wight.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" 
                        type='number' {...register("discount", discountRegister)} 
                        placeholder="Размер скидки"
                    />
                    {errors?.discount && <span>{errors?.discount.message}</span>}
                </div>
                <div className="form__pass">
                    <textarea className="form__input" 
                        type='text' {...register("description", descriptionRegister)} 
                        placeholder="Описание товара"
                    />
                    {errors?.description && <span>{errors?.description.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input"
                    type='number' {...register("stock", stockRegister)} 
                    placeholder="Количество на складе"
                />
                    {errors?.stock && <span>{errors?.stock.message}</span>}
                </div>
                <button className="form__btn"  type="submit">Добавить</button>
            </div>
        </form>
    )
}

