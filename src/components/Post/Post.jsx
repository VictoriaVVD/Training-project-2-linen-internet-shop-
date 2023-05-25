import React, { useContext } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";

export const Post = ({post}) => {
    const handleLike = useContext(CardContext);
    const user = useContext(UserContext);
    const isLiked = post.likes.some(e => e === user._id);
    const toggleCardLike = () => {
        handleLike(post, isLiked);
}
    const timeOptions = {
        day: 'numeric',
        month: 'short', year: "numeric"
    }
    return (
        <div className="post">
        <div className="post__wrapper">
            <div className="post__content">
                <Link to={`/news/postID`}>
                    <img src={post.image} alt="" className="post__image" />
                </Link>
                <div className="post__info">
                    <Link className="post__title">
                        <h2>{post.title}</h2>
                    </Link>
                    <div className="post__date">
                        <p>{new Date(post.created_at).toLocaleString('ru-RU', timeOptions)}</p>
                        <Link className="post__comment">Оставить комментарий</Link>
                    </div>
                    <p>{post.text}</p>
                    <Link to={"/news/postID"}>Читать далее</Link>
                    <div>
                        <span onClick={toggleCardLike}>{isLiked ? <FontAwesomeIcon icon={faThumbsUpSolid} size="lg" /> : <FontAwesomeIcon icon={faThumbsUp} size="lg" />}</span>
                        <span>Читать позднее(в избранное)</span>
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