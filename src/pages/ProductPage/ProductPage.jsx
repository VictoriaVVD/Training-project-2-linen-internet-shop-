import React, { useEffect, useState } from "react";
import { Product } from "../../components/Product/Product";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { fetchGetProductById } from "../../store/slices/productsSlice";

export const ProductPage = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchGetProductById(id))
            .then(data => setProduct(data.payload))
    }, [dispatch, id])

    return (
        <div>
            {!!Object.keys(product).length 
                ?   <Product product={product} setProduct={setProduct} />
                :   <div>Loading...</div>
            }
        </div>
    )
}