import React, { useCallback } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { ProductRate } from "../ProductRate/ProductRate";
import { apiProduct } from "../../assets/api/apiProduct";
import { openNotification } from "../Notification/Notification";


const timeOptions = {
    day: 'numeric',
    month: 'short', year: "numeric"
}

export const Review = ({review, setProduct}) => {

    const deleteReview = useCallback(async () => {
    const res = await apiProduct.deleteReview(review.product, review._id);
    setProduct({...res});
    openNotification("success", "Отзыв удален!")

    }, [review._id, review.product])

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