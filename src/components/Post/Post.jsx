import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { findItemLiked } from "../../store/utilsStore";
import { fetchToggleItemLike } from "../../store/slices/postsSlice";

export const Post = ({post}) => {
    const user = useSelector(s => s.user);
    const dispatch = useDispatch();
    const isLiked = findItemLiked(post, user?._id);
    const togglePostLike = () => {
        dispatch(fetchToggleItemLike(post, isLiked));
}
    const timeOptions = {
        day: 'numeric',
        month: 'short', year: "numeric"
    }
    return (
        <div className="post">
        <div className="post__wrapper">
            <div className="post__content">
                <Link to={`/post/${post._id}`}>
                    <img src={post.image} alt="" className="post__image" />
                </Link>
                <div className="post__info">
                    <Link to={`/post/${post._id}`} className="post__title">
                        <h2>{post.title}</h2>
                    </Link>
                    <div className="post__date">
                        <p>{new Date(post.created_at).toLocaleString('ru-RU', timeOptions)}</p>
                        <Link className="post__comment">Оставить комментарий</Link>
                    </div>
                    <p>{post.text.substr(0, 200)}...</p>
                    <Link to={`/post/${post._id}`} className="post__comment">Читать далее</Link>
                    <div className="post__icons">
                        <div className="post__icons_comment-icon">
                            <FontAwesomeIcon icon={faComment} size="lg" />
                            <div className='post__icons_comment-icon_over-num'>
                                {post.comments?.length && <span>{post.comments.length}</span>}
                            </div> 
                        </div>
                        <span onClick={togglePostLike}>{isLiked 
                        ? <FontAwesomeIcon icon={faThumbsUpSolid} size="lg" /> 
                        : <FontAwesomeIcon icon={faThumbsUp} size="lg" />}
                        </span>
                        <span className='post__icons_read-icon'>Читать позднее</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

// {
//     "image": "https://blog.postel-deluxe.ru/wp-content/uploads/2023/03/1671546672_idei-club-p-vidi-tekstilya-v-interere-dizain-oboi-84-455x320.jpg",
//     "likes": [],
//     "comments": [],
//     "tags": [
//         "textile",
//         "home",
//         "light reading"
//     ],
//     "isPublished": true,
//     "_id": "646f3369e0bf2c519baf45e1",
//     "title": "Время обновления: как выбрать весенние шторы",
//     "author": {
//         "name": "Victoria Dudkina",
//         "about": "Студент гр.12",
//         "avatar": "https://react-learning.ru/image-compressed/default-image.jpg",
//         "_id": "64416c303291d790b3fc22b3",
//         "group": "group-12"
//     },
//     "text": "Весенняя пора так и просит перемен. Хочется освободиться от теплого и зимнего и перейти на легкое, воздушное. Самый простой способ сделать это в интерьере – поменять шторы.",
//     "group": "group-12",
//     "created_at": "2023-05-25T10:07:37.698Z",
//     "updated_at": "2023-05-25T10:07:37.698Z",
//     "__v": 0
// }