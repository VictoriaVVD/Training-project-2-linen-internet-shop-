import React from "react";
import s from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";

export const Article = ({post}) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    return (
        <div className={s.post}>
            <div className={s.post__wrapper}>
                <Link to="/catalog">
                    <span onClick={() => goBack()}>{'<'} Назад</span>
                </Link>
                <div className={s.post__card}>
                    <div className={s.img__box}>
                        <div className={s.img__wrapper}>
                            <img className={s.img} src={post.image} alt="" />
                        </div>
                    </div>
                    <div className={s.post__info}>
                        <div className={s.post__title_wrapper}>
                            <span className={s.post__title}>{post.title}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}