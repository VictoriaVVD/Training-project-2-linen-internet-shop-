import React, { useCallback, useContext } from "react";
import "./style.scss";
import { Review } from "../Review/Review";
import { CardContext } from "../../context/cardContext";
import { Modal } from "../Modal/Modal";
import { ReviewForm } from "../Form/ReviewForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import { api } from "../../assets/api/api";

export const ReviewsList = ({product, setProduct, rating}) => {
    const {modalActive, setModalActive} = useContext(CardContext)

    
    return (
    <div className="reviews__list">
        <button onClick={() => setModalActive(true)}>Оставить отзыв</button>
        <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <ReviewForm product={product} setProduct={setProduct} setModalActive={setModalActive} rating={rating} />
        </Modal> 
        <div>
            {product.reviews
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .map(item => <Review review={item} key={item.updated_at} setProduct={setProduct} />)}
        </div>
        
    </div>)
}
