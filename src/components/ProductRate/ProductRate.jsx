import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-regular-svg-icons";
// import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Star } from "../../assets/images/star.svg";
import cn from "classnames";

export const ProductRate = ({rating, setRate = () => {}, isEditable=false }) => {
    const emptyState = new Array(5).fill(<Star />)
    const [ratingArr, setRating] = useState(emptyState);
    const changeRate = useCallback((r) => {
        if(!isEditable) return;
        setRate(r)
    }, [setRate, isEditable])
    const changeStarRateOnMove = (r) => {
        if(!isEditable) return;
        rateConstructor(r)
    }
    const rateConstructor = useCallback((rate) => {
        const updatedRatingArr = emptyState.map((item, index) => 
            <Star className={cn("star", {
                "filled": index < rate,
                "editable": isEditable,
                })}
        onMouseEnter={() => changeStarRateOnMove(index + 1)}
        onMouseLeave={() => changeStarRateOnMove(rating)}
        onClick={() => changeRate(index + 1)}
        />
        )
        
        
        setRating(updatedRatingArr)
    }, [rating, isEditable])

    useEffect(() => rateConstructor(rating), [rateConstructor])

    return (
        <div>
            {ratingArr.map((e, index) => (
                <span key={index}>{e}</span>
            ))}
        </div>
    )
}