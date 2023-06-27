import React from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { ProductRate } from "../ProductRate/ProductRate";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteProductReview } from "../../store/slices/productsSlice";


const timeOptions = {
    day: 'numeric',
    month: 'short', year: "numeric"
}

export const Review = ({review}) => {
    const user = useSelector(s => s.user?.data);
    const dispatch = useDispatch()

    return (
        <>
            <div className="review__wrapper"> 
                <div className='review__item' >
                    <div className='review__author'>
                        <span> {review.author?.name}</span>
                        <span className='review__date'> {new Date(review?.updated_at).toLocaleString('ru-RU', timeOptions)}</span>
                    </div>
                    <ProductRate rating={review?.rating} />
                    <div className='review__text'>{review?.text}</div>
                </div>
                <div className="delete-btn">
                {review.author?._id === user._id
                    ?   <FontAwesomeIcon icon={faCircleXmark} size="lg" 
                            onClick={() => dispatch(fetchDeleteProductReview({productId: review.product, reviewId: review._id}))}
                        />
                    :   ""
                }
                </div>
            </div>
            <div className='review__hr' />
        </>
    )
}