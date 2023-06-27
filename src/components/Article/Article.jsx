import React, { useCallback, useState } from "react";
import "./style.scss";
import dataPromo from "../../assets/data/dataPromoCarousel.json";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchToggleItemLike } from "../../store/slices/postsSlice";
import { Modal } from "../Modal/Modal";
import { TabsMenuForPosts } from "../Tabs/TabsMenuForPosts";
import { timeOptions } from "../../tools/utils";
import { GoBack } from "../GoBack/GoBack";
import { setModalOpen, setStateByPath } from "../../store/slices/modalSlice";

export const Article = ({post, setPost}) => {

    const [isPostLiked, setPostLike] = useState(false);
    const user = useSelector(s => s.user.data);

    const dispatch = useDispatch();
    const isLiked = post.likes?.some(e => e === user?._id);
    const navigate = useNavigate();
    
    const togglePostLike = () => {
        dispatch(fetchToggleItemLike(post, isLiked))
        .then(data => {
            setPostLike(isPostLiked);
            setPost(data.payload.updatedItem);
        });
    }

    const showModal = () => {
        dispatch(setModalOpen(true));
        dispatch(setStateByPath("newComment"));
    }

    const updatePost = useCallback(() => {
        dispatch(setModalOpen(true));
        dispatch(setStateByPath("updatePost"));
    }, [dispatch]); 

return (
    <div className="article">
        <div className="article__wrapper">
            <GoBack />
            <div className="article__content">
                <div className="article__card">
                    <div className="img__box">
                        <img className="img__box_img" src={post.image} alt="" />
                    </div>
                    <div className="article__card_tags">
                        {!!post.tags &&
                            post.tags.map(e => 
                                <span key={e}>  
                                    #{e}
                                </span>
                            )
                        }
                    </div>
                    <div className="article__info">
                        <div className="article__title_wrapper">
                            <h2 className="article__title">{post.title}</h2>
                        </div>
                        <div className="article__info_char">
                            <span>
                                Автор: 
                                    <Link to={`/author/${post.author?.name}`} className="article__info_char_links">
                                        {post.author?.name}
                                    </Link>
                            </span>
                            <span>{new Date(post.created_at).toLocaleString('ru-RU', timeOptions)} </span>
                            <Link className="article__info_char_links" onClick={showModal}>
                                <FontAwesomeIcon icon={faComment} size="lg" /> 
                                Оставить комментарий
                            </Link>
                        </div>
                        <div dangerouslySetInnerHTML={{__html: post.text}} className="article__info_text"></div>
                        <button className="article__like_btn" onClick={togglePostLike}>
                            {!isLiked && <span>Понравилось? </span>}
                            <span className="article__like" onClick={togglePostLike}>{isLiked 
                            ? <FontAwesomeIcon icon={faThumbsUpSolid} size="lg" /> 
                            : <FontAwesomeIcon icon={faThumbsUp} size="lg" />}
                            </span>
                        </button>
                        <button className="article__like_btn" onClick={updatePost}>Редактировать</button>
                        <div className="article__comment_block">
                            <TabsMenuForPosts post={post} setPost={setPost} />
                        </div>
                    </div>
                </div>
                <div className="article__sidebar">
                {dataPromo.map(e => {
                    return (
                        <div className="article__sidebar_item" key={e.url}>
                            <img src={e.url} alt="promo"></img>
                            <div className="article__sidebar_adv">
                                <button id={e.id} onClick={(e) => navigate("/promo")}>Перейти</button>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
        <Modal />
    </div>
    )
}
