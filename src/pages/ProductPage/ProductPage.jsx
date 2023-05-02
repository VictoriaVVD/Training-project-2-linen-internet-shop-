import React, { useEffect, useState } from "react";
import s from "./index.module.css";
import { Product } from "../../components/Product/Product";
import { api } from "../../assets/api/api";
import { useParams } from "react-router";


export const ProductPage = () => {
const [product, setProduct] = useState({})
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            api.getProductById(id)
            .then(data => { setProduct(data)})
        }
    }, [id])

    return (
        <>
            <Product product={product} />
        </>
    )
}