import React, { useEffect, useState } from "react";
import { Product } from "../../components/Product/Product";
import { api } from "../../assets/api/api";
import { useParams } from "react-router";


export const ProductPage = () => {
const [product, setProduct] = useState({})
    const { id } = useParams();
    console.log({id});

    useEffect(() => {
        if (id) {
            api.getProductById(id)
            .then(data => {console.log({data}); setProduct(data)})
        }
    }, [id])

    return (
        <>
            <Product product={product} />
        </>
    )
}