import React, { useCallback, useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { api } from "../../assets/api/api";
import { ProductRate } from "../ProductRate/ProductRate";


const timeOptions = {
    day: 'numeric',
    month: 'short', year: "numeric"
}

export const Review = ({review, setProduct}) => {
    
    const deleteReview = useCallback(async () => {
    const res = await api.deleteReview(review.product, review._id);
    setProduct({...res});

    }, [review._id, review.product])
    console.log(review.rating);


    return (
        <>
            <div className="review__wrapper"> 
                <div className='review__item' >
                    <div className='review__author'>
                        <span> {review.author.name}</span>
                        <span className='review__date'> {new Date(review.updated_at).toLocaleString('ru-RU', timeOptions)}</span>
                    </div>
                    <ProductRate rating={review.rating} />
                    <div className='review__text'>{review.text}</div>
                </div>
                <div><FontAwesomeIcon icon={faCircleXmark} size="lg" onClick={() => deleteReview()}/></div>
            </div>
            <div className='review__hr' />
        </>
    )
}