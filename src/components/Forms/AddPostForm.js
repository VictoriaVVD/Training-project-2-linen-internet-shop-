import React from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { fetchAddNewPost } from "../../store/slices/postsSlice";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../../store/slices/modalSlice";

export const AddPostForm = ({ isRequired = true }) => {


    const { register, handleSubmit, formState: { errors }, reset } = useForm({mode: "onSubmit"});

    const dispatch = useDispatch()
    const sendData = async (data) => {

        dispatch(fetchAddNewPost(
                {
                    ...data, 
                    tags: data.tags
                            .split(",")
                            .map(e => e.trim())
                }
            )
        );
        reset();
        dispatch(setModalOpen(false))
    }

    const picturesRegister = { 
        required: {
            value: isRequired,
            massage: 'Ссылка на фото'
        } 
    }

    const titleRegister = {
        required: {
            value: isRequired,
            message: 'Название статьи'
        },
    }
    const tagsRegister = {
        required: {
            value: !isRequired,
            message: 'Теги'
        },
    }
    const descriptionRegister = {
        required: {
            value: !isRequired,
            message: 'Текст'
        },
    }

    return (
        <form className="form" onSubmit={handleSubmit(sendData)}>
            <div className="form__wrapper" >
                <h3>Добавление новой статьи</h3>
                <div className="form__pass">
                    <input className="form__input" 
                        type="text" {...register("image", picturesRegister)} 
                        placeholder="Ссылка на фото"
                    />
                    {errors?.image && <span> {errors?.image.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type='text' 
                        {...register("title", titleRegister)} 
                        placeholder="Название статьи"
                    />
                    {errors?.title && <span> {errors?.title.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type='text' 
                        {...register("tags", tagsRegister)} 
                        placeholder="Теги, через запятую" />
                        
                    {errors?.tags && <span> {errors?.tags.message}</span>}
                </div>
                <div className="form__pass">
                    <textarea className="form__input" type='text'
                        {...register("text", descriptionRegister)} 
                        placeholder="Текст">    
                    </textarea>
                    {errors?.text && <span> {errors?.text.message}</span>}
                </div>
                <button className="form__btn"  type="submit">Добавить</button>
            </div>
        </form>
    )
}