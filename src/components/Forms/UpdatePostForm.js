import React, { useCallback } from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../store/slices/modalSlice";
import { fetchUpdatePost } from "../../store/slices/postsSlice";

export const UpdatePostForm = ({ isRequired = true }) => {

    const {currentPost: post} = useSelector(s => s.posts);
    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onSubmit"});
    const dispatch = useDispatch();
    const sendData = useCallback((data) => {
        dispatch(fetchUpdatePost({postId: post?._id, data}))
        dispatch(setModalOpen(false))
    }, [dispatch, post])

    const imageRegister = { 
        required: {
            value: isRequired,
            massage: 'Ссылка на фото'
        } 
    }

    const titleRegister = {
        required: {
            value: isRequired,
            message: 'Название'
        },
    }
    
    const textRegister = {
        required: {
            value: isRequired,
            message: 'Текст'
        },
    }

    const tagsRegister = {
        required: {
            value: isRequired,
            message: 'Теги'
        },
    }


    return (
        <form className="form" onSubmit={handleSubmit(sendData)}>
            <div className="form__wrapper" >
                <h2 className="form__pass">Редактирование статьи</h2>
                <div className="form__pass">
                    <label htmlFor="">Ссылка на фото</label>
                    <input className="form__input" 
                        type="text" {...register("image", imageRegister)} 
                        placeholder="Ссылка на фото" defaultValue={post.image}
                    />
                    {errors?.image && <span>{errors?.image.message}</span>}
                </div>
                <div className="form__pass">
                    <label htmlFor="">Название</label>
                    <input className="form__input" 
                        type='text' {...register("title", titleRegister)} 
                        placeholder="Название" defaultValue={post.title}
                    />
                    {errors?.title && <span>{errors?.title.message}</span>}
                </div>
                <div className="form__pass">
                    <label htmlFor="">Текст</label>
                    <textarea className="form__input" 
                        type='text' {...register("text", textRegister)} 
                        placeholder="Текст" defaultValue={post.text}
                    />
                    {errors?.text && <span>{errors?.text.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type='text' {...register("tags", tagsRegister)} placeholder="Теги" defaultValue={post.tags} />
                    {errors?.tags && <span>{errors?.tags.message}</span>}
                </div>
                <button className="form__btn"  type="submit">Внести изменения</button>
            </div>
        </form>
    )
}
