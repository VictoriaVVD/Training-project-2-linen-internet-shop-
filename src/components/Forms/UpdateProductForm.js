import React from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../store/slices/modalSlice";
import { fetchUpdateProduct } from "../../store/slices/productsSlice";

export const UpdateProductForm = ({ isRequired = true, product }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({mode: "onSubmit"});
    const dispatch = useDispatch()
    const sendData = (data) => {
        dispatch(fetchUpdateProduct(product._id, {...data}))
        // const res = apiProduct.updateProduct(product._id, data);
        dispatch(setModalOpen(false))
    }

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
                <h2 className="form__pass">Редактирование товара</h2>
                <div className="form__pass">
                    <label htmlFor="">Ссылка на фото товара</label>
                    <input className="form__input" 
                        type="text" {...register("pictures", picturesRegister)} 
                        placeholder="Ссылка на фото товара" 
                        defaultValue={product.pictures}
                    />
                    {errors?.pictures && <span>{errors?.pictures.message}</span>}
                </div>
                <div className="form__pass">
                    <label htmlFor="">Название</label>
                    <input className="form__input" 
                        type='text' {...register("name", nameRegister)} 
                        placeholder="Название" 
                        defaultValue={product.name}
                    />
                    {errors?.name && <span>{errors?.name.message}</span>}
                </div>
                <div className="form__pass">
                    <label htmlFor="">Цена</label>
                    <input className="form__input" 
                        type='number' {...register("price", priceRegister)} 
                        placeholder="Цена" 
                        defaultValue={product.price}
                    />
                    {errors?.price && <span>{errors?.price.message}</span>}
                </div>
                <div className="form__pass">
                    <label htmlFor="">Количество в упаковке</label>
                    <input className="form__input" 
                        type='text' {...register("wight", wightRegister)} 
                        placeholder="Количество в упаковке" 
                        defaultValue={product.wight}
                    />
                    {errors?.wight && <span>{errors?.wight.message}</span>}
                </div>
                <div className="form__pass">
                    <label htmlFor="">Размер скидки</label>
                    <input className="form__input"  
                        type='number' {...register("discount", discountRegister)} 
                        placeholder="Размер скидки" 
                        defaultValue={product.discount}
                    />
                    {errors?.discount && <span>{errors?.discount.message}</span>}
                </div>
                <div className="form__pass">
                    <label htmlFor="">Описание товара</label>
                    <input className="form__input" 
                        type='text' {...register("description", descriptionRegister)} 
                        placeholder="Описание товара" 
                        defaultValue={product.description} 
                    />
                    {errors?.description && <span>{errors?.description.message}</span>}
                </div>
                <div className="form__pass">
                    <label htmlFor="">Количество на складе</label>
                    <input className="form__input" 
                        type='number' {...register("stock", stockRegister)} 
                        placeholder="Количество на складе" 
                        defaultValue={product.stock}
                    />
                    {errors?.stock && <span>{errors?.stock.message}</span>}
                </div>
                <button className="form__btn"  type="submit">Внести изменения</button>
            </div>
        </form>
    )
}
