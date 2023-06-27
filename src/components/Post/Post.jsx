import React, { useCallback } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeletePostById, fetchToggleItemLike } from "../../store/slices/postsSlice";
import { Modal } from "../Modal/Modal";
import { timeOptions } from "../../tools/utils";
import { setModalOpen, setStateByPath } from "../../store/slices/modalSlice";

export const Post = ({post}) => {

    const user = useSelector(s => s.user.data);
    const dispatch = useDispatch();
    const isLiked = post.likes?.some(e => e === user?._id);
    const togglePostLike = () => {
        dispatch(fetchToggleItemLike(post, isLiked));
    }
    const showModal = (path) => {
        dispatch(setModalOpen(true));
        dispatch(setStateByPath(path))
    }

    const deletePost = useCallback(async () => {
        dispatch(fetchDeletePostById(post?._id));
    }, [dispatch, post._id]);
    
    return (
        <div className="post">
            <div className="post__wrapper">
                <div className="post__content">
                    <div className="post__block_image">
                        <Link to={`/post/${post._id}`}>
                            <img src={post.image} alt="" className="post__image" />
                        </Link>
                        {user._id === post.author._id &&
                            <div className="post__block_image_hover-effect">
                                <button onClick={() => showModal("updatePost")}>Редактировать</button>
                                <button onClick={deletePost}>Удалить</button>
                            </div>
                        }
                    </div>
                    <div className="post__info">
                        <Link to={`/post/${post._id}`} className="post__title">
                            <h2>{post.title}</h2>
                        </Link>
                        <div className="post__date">
                            <p className="post__date_date">{new Date(post.created_at).toLocaleString('ru-RU', timeOptions)}</p>
                            <Link className="post__comment" onClick={() => showModal("newComment")}>Оставить комментарий</Link>
                        </div>
                        <p className="post__text">{post.text.substr(0, 200)}...</p>
                        <Link to={`/post/${post._id}`} className="post__comment">Читать далее</Link>
                        <div className="post__icons">
                            <div className="post__icons_comment-icon">
                                <FontAwesomeIcon icon={faComment} size="lg" />
                                <div className='post__icons_comment-icon_over-num'>
                                    {post.comments?.length && <span>{post.comments?.length}</span>}
                                </div> 
                            </div>
                            <div className="post__icons_comment-icon">
                                <span onClick={togglePostLike}>{isLiked 
                                ? <FontAwesomeIcon icon={faThumbsUpSolid} size="lg" /> 
                                : <FontAwesomeIcon icon={faThumbsUp} size="lg" />}
                                </span>
                                <div className='post__icons_comment-icon_over-num'>
                                    {post.likes?.length && <span>{post.likes?.length}</span>}
                                </div>
                            </div>
                            {!!post.tags &&
                                post.tags.map(tag => 
                                    <span key={tag} className="post__tag">
                                        #{tag}
                                    </span>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Modal />
        </div>
    )
}

