import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { timeOptions } from "../../tools/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteComment } from "../../store/slices/postsSlice";

export const Comment = ({comment}) => {

    const user = useSelector(s => s.user?.data);
    const dispatch = useDispatch();
    
    return (
        <>
            <div className="comment__wrapper"> 
                <div className='comment__item' >
                    <div className='comment__author'>
                        <span> {comment.author?.name}</span>
                        <span className='comment__date'>
                            {new Date(comment?.updated_at).toLocaleString('ru-RU', timeOptions)}
                        </span>
                    </div>
                    <div className='review__text'>{comment.text}</div>
                </div>
                <div className="delete-btn">
                {comment.author?._id === user._id
                    ?   <FontAwesomeIcon icon={faCircleXmark} size="lg" 
                            onClick={() => dispatch(fetchDeleteComment({postId: comment.post, commentId: comment._id}))}
                        />
                    :   ""
                }
                </div>
            </div>
            <div className='comment__hr' />
        </>
    )
}