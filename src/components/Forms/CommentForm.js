import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddComment } from "../../store/slices/postsSlice";
import { setModalOpen } from "../../store/slices/modalSlice";

export const CommentForm = () => {
    const { register, handleSubmit, reset } = useForm({mode: "onSubmit"});
    const post = useSelector(s => s.posts?.currentPost);
    const dispatch = useDispatch();

    const sendData = useCallback((text) => {
        dispatch(fetchAddComment({postId: post?._id, text}))
        reset();
        dispatch(setModalOpen(false));
    }, [dispatch, post, reset])

    const commentRegister = {
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
                        <img className="form__image review_img" src={post.image} alt="" />
                        <div className="form__review_info">
                            <p className="form__review_info_title">{post?.title}</p>
                        </div>
                    </div>
                    <textarea className="review_input" 
                        cols={30} rows={8} 
                        {...register("text", commentRegister)} 
                        placeholder="Введите текст">
                    </textarea>
                    <button type="submit">Отправить</button>
                </div>
            </div>
        </form>
    )
}
