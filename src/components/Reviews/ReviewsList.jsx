import React, { useContext } from "react";
import "./style.scss";
import { Review } from "../Review/Review";
import { CardContext } from "../../context/cardContext";
import { Modal } from "../Modal/Modal";
import { ReviewForm } from "../Form/ReviewForm";

export const ReviewsList = ({product, setProduct, review}) => {
    const {modalActive, setModalActive} = useContext(CardContext)
    
    return (
    <div className="reviews__list">
        <button onClick={() => setModalActive(true)}>Оставить отзыв</button>
        <Modal modalActive={modalActive} setModalActive={setModalActive}>
            <ReviewForm product={product} setProduct={setProduct} setModalActive={setModalActive} />
        </Modal> 
        <div>
            {product.reviews.map(item => <Review review={item} key={item.updated_at} />)}
        </div>
        
    </div>)
}
