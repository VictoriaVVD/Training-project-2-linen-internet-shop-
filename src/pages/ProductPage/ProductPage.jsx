import React, { useContext, useEffect, useState } from "react";
// import s from "./index.module.css";
import { Product } from "../../components/Product/Product";
import { api } from "../../assets/api/api";
import { useParams } from "react-router";
import { CardContext } from "../../context/cardContext";
import { useCallback } from "react";
import { UserContext } from "../../context/userContext";

export const ProductPage = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const {handleLike, user} = useContext(CardContext);


    const onProductLike = useCallback((product, isLikedProduct) => {
        handleLike(product, isLikedProduct);

        if (isLikedProduct) {
            const filteredCards = product.likes.filter(e => e !== user._id);
            setProduct(state => ({...state, likes: filteredCards }))
            }
        else
            {
            const filteredCards = [...product.likes, user?._id];
            setProduct(state => ({...state, likes: filteredCards}))
            }
    }, [handleLike, user._id])

    useEffect(() => {
        if (id) {
            api.getProductById(id)
            .then(data => { setProduct(data)})
            .catch(error => console.log(error.statusText))
        }
    }, [id])


    return (
        <>
            <Product product={product} onProductLike={onProductLike} setProduct={setProduct} />
        </>
    )
}