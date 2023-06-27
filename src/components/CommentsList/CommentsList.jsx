import React from "react";
import "./style.scss";
import { Comment } from "../CommentItem/Comment";
import { useDispatch } from "react-redux";
import { setModalOpen, setStateByPath } from "../../store/slices/modalSlice";

export const CommentsList = ({post}) => {
    const dispatch = useDispatch();
    const showModal = () => {
        dispatch(setModalOpen(true));
        dispatch(setStateByPath("newComment"));
    }
    return (
    <div className="comments__list">
        <button onClick={showModal}>Добавить комментарий</button>
        <div>
            {post?.comments
                .map(item => 
                    <Comment comment={item} key={item.updated_at}  
                    />
                )
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            }
        </div>    
    </div>)
}
