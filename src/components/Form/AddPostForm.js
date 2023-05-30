import React from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { apiPost } from "../../assets/api/apiPost";

export const AddPostForm = ({ isRequired = true, onSendNewProduct }) => {


    const { register, handleSubmit, formState: { errors }, reset } = useForm({mode: "onSubmit"});

    const sendData = async (data) => {
        const res = await apiPost.addNewPost(data);
        onSendNewProduct(data);
        reset()
    }

    const picturesRegister = { 
        required: {
            value: isRequired,
            massage: 'Ссылка на фото'
        } 
    }

    const nameRegister = {
        required: {
            value: isRequired,
            message: 'Название статьи'
        },
    }
    // const tagsRegister = {
    //     required: {
    //         value: !isRequired,
    //         message: 'Теги'
    //     },
    // }
    const descriptionRegister = {
        required: {
            value: isRequired,
            message: 'Текст'
        },
    }

    return (
        <div className="form__wrapper" >
            <h3>Добавление новой статьи</h3>
            <form className="form" onSubmit={handleSubmit(sendData)}>

                <div>
                    <input className="form__input" type="text" {...register("image", picturesRegister)} placeholder="Ссылка на фото" />
                    {errors?.image && <span> {errors?.image.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type='text' {...register("title", nameRegister)} placeholder="Название статьи" />
                    {errors?.title && <span> {errors?.title.message}</span>}
                </div>
                {/* <div className="form__pass">
                    <input className="form__input" type='text' {...register("tags", tagsRegister)} placeholder="Теги" />
                    {errors?.tags && <span> {errors?.tags.message}</span>}
                </div> */}
                <div className="form__pass">
                    <input className="form__input" type='text' {...register("text", descriptionRegister)} placeholder="Текст" />
                    {errors?.text && <span> {errors?.text.message}</span>}
                </div>
                <button className="form__btn"  type="submit">Добавить</button>
            </form>
        </div>
    )
}