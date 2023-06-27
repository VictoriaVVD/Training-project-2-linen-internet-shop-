import React from "react";
import "./style.scss";
import { CardList} from "../../components/CardList/CardList";
import { useSelector } from "react-redux";

export const PromoPage = () => {

    const {products} = useSelector(s => s.products);
    const promoProductsSale = products.filter(e => e.discount >= 20)
    return (
        <div className="promo">
            <div className="promo__wrapper">
                <h1>Распродажа</h1>
                <CardList cards={promoProductsSale} />
            </div>
        </div>
    )
}