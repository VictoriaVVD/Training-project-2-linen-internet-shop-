import React, { useState } from "react";
import s from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchToggleItemLike } from "../../store/slices/postsSlice";

export const Article = ({post, setPost}) => {
    const [isPostLiked, setPostLike] = useState(false);
    
    const user = useSelector(s => s.user.data);
    const dispatch = useDispatch();
    const isLiked = post.likes?.some(e => e === user?._id);
    
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const timeOptions = {
        day: 'numeric',
        month: 'short', year: "numeric"
    }

    const togglePostLike = () => {
        dispatch(fetchToggleItemLike(post, isLiked))
        .then(data => {
            setPostLike(isPostLiked);
            setPost(data.payload.updatedItem);
        });
}

    return (
        <div className={s.post}>
            <div className={s.post__wrapper}>
                <Link>
                    <span onClick={() => goBack()}>{'<'} Назад</span>
                </Link>
                <div className={s.post__content}>
                    <div className={s.post__card}>
                        <div className={s.img__box}>
                            <div className={s.img__wrapper}>
                                <img className={s.img} src={post.image} alt="" />
                            </div>
                        </div>
                        {/* <div>{post.tags}</div> */}
                        <div className={s.post__info}>
                            <div className={s.post__title_wrapper}>
                                <h2 className={s.post__title}>{post.title}</h2>
                            </div>
                            <div className={s.post__info_char}>
                                <Link className={s.post__info_char_links}>{post.author?.name}</Link>
                                <span>{new Date(post.created_at).toLocaleString('ru-RU', timeOptions)} </span>
                                <Link className={s.post__info_char_links}><FontAwesomeIcon icon={faComment} size="lg" /> Оставить комментарий</Link>
                            </div>
                            
                            <div className={s.post__info_text}>{post.text}</div>
                            {/* <button onClick={toggleCardLike}> */}
                                <span className={s.product__like} onClick={togglePostLike}>{isLiked 
                                ? <FontAwesomeIcon icon={faThumbsUpSolid} size="lg" /> 
                                : <FontAwesomeIcon icon={faThumbsUp} size="lg" />}
                                </span>
                            {/* </button> */}
                        </div>
                    </div>
                    <div className={s.post__sidebar}>
                        <div>
                            <img src="https://blog.postel-deluxe.ru/wp-content/uploads/2022/08/Bez-imeni-5.png" alt="promo"></img>
                        </div>
                        <div >
                            <img src="https://blog.postel-deluxe.ru/wp-content/uploads/2022/08/satin_2008_prilojenie.jpg" alt="promo"></img>
                        </div>
                        <div >
                            <img src="https://cozyhome.ru/upload/iblock/625/0vu38gxex1p17e97an7223kqt4kirbfo/aktsii-koren_576kh776-_10_.webp" alt="promo"></img>
                        </div>
                        <div >
                            <img src="https://s22221.cdn.ngenix.net/media/wysiwyg/banners/top/11052023_odpod_ban_335.webp" alt="promo"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}