import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import { ReactComponent as Star } from "../../assets/images/star.svg";
import cn from "classnames";

const emptyStarsState = new Array(5).fill(<Star />)

export const ProductRate = ({rating, setRate = () => {}, isEditable=false }) => {
    const [ratingArr, setRating] = useState(emptyStarsState);
    
    const changeRate = useCallback((r) => {
        if(!isEditable) return;
        rateConstructor(r)
        setRate(r)
    }, [setRate, isEditable]);
    
    const changeStarRateOnMove = (r) => {
        if(!isEditable) return;
        rateConstructor(r)
    }
    const rateConstructor = useCallback((rate) => {
        const updatedRatingArr = emptyStarsState.map((item, index) => 
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

    useEffect(() => rateConstructor(rating), [rateConstructor, rating])

    return (
        <div>
            {ratingArr.map((e, index) => (
                <span key={index}>{e}</span>
            ))}
        </div>
    )
}