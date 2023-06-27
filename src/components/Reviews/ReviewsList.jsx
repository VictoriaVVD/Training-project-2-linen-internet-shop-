import React from "react";
import "./style.scss";
import { Review } from "../Review/Review";
import { useDispatch, useSelector} from "react-redux";
import { setModalOpen, setStateByPath } from "../../store/slices/modalSlice";
import { Modal } from "../Modal/Modal";

export const ReviewsList = () => {

    const {reviews} = useSelector(s => s.products);
    const dispatch = useDispatch();
    const showModal = (path) => {
        dispatch(setModalOpen(true));
        dispatch(setStateByPath(path))
    }
    return (
    <div className="reviews__list">
        <button onClick={()=> showModal("newReview")}>Оставить отзыв</button>
        <div>
            {reviews
                .map(item => 
                    <Review review={item} key={item.created_at} 
                    />
                )
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            }
        </div>
        <Modal />
    </div>)
}
