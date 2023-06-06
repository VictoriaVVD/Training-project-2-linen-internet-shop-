import React, { useEffect, useState } from "react";
// import s from "./index.module.css";
import { Product } from "../../components/Product/Product";
import { useParams } from "react-router";
import { useCallback } from "react";
import { apiProduct } from "../../assets/api/apiProduct";

export const ProductPage = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    const addReview = useCallback(async data => {
        const result = await apiProduct.addReview(product._id, data);
        setProduct(() => ({ ...result }))
    }, [product._id])

    useEffect(() => {
        if (id) {
            apiProduct.getProductById(id)
            .then(data => { setProduct(data)})
            .catch(error => console.log(error.statusText))
        }
    }, [id])


    return (
        <>
            <Product product={product} addReview={addReview} setProduct={setProduct} />
        </>
    )
}