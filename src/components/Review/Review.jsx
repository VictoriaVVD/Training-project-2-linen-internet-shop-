import React, { useCallback, useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import { api } from "../../assets/api/api";


const timeOptions = {
    day: 'numeric',
    month: 'short', year: "numeric"
}

export const Review = ({review}) => {
    const deleteReview = useCallback(async () => {
        const res = await api.deleteReview(review.product, review._id);
        console.log(res);
        

    }, [review._id, review.product])
    return (
        <>
            <div className="review__wrapper"> 
                <div className='review__item' >
                    <div className='review__author'>
                        <span> {review.author.name}</span>
                        <span className='review__date'> {new Date(review.updated_at).toLocaleString('ru-RU', timeOptions)}</span>
                    </div>
                    {/* <div className='review__rate'>{new Array(review?.rating ?? 1).fill(<FontAwesomeIcon icon={faStar} />)}</div> */}
                    <div className='review__text'>{review.text}</div>
                </div>
                <div><FontAwesomeIcon icon={faRectangleXmark} onClick={() => deleteReview()}/></div>
            </div>
            <div className='review__hr' />
        </>
    )
}
