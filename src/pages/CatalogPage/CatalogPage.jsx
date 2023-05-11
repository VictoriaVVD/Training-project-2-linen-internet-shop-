import React, { useContext } from "react";
import { CardList } from "../../components/CardList/CardList";
import s from "./index.module.scss";
import { CardContext } from "../../context/cardContext";
import { Link, useNavigate } from "react-router-dom";

export const CatalogPage = () => {
    const foundProduct = (num) => {
        let tmp = num % 10;
        
        if (tmp === 1) {
            return 'товар'
        }
        if (tmp > 1 && tmp < 5) {
            return 'товара'
        }
        else 
            return 'товаров'
    }

    const sortedItems = [
        {id: "popular",
        title: "Популярное"}, 
        {id: "byRate",
        title: "По рейтингу"}, 
        {id: "newProduct",
        title: "Новинки"}, 
        {id: "cheapFirst",
        title: "По убыванию цены"}, 
        {id: "expensiveFirst",
        title: "По возрастанию цены"}, 
        {id: "sale",
        title: "По размеру скидки"}
    ]

    const {cards, onSort, search} = useContext(CardContext);

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return (
        <>
            <div className={s.sort__wrapper}>
                    {search && <p className={s.search__message}>По Вашему запросу {cards.length === 1 ? 'найден' : 'найдено'} {cards.length} {foundProduct(cards.length)}</p>}
                <Link to="/catalog">
                    <span onClick={() => goBack()}>{'<'} Назад</span>
                </Link>
                <div className={s.sort__cards}>
                    {!search && sortedItems.map((e) => 
                        <span className={s.sort__cards_item} key={e.id} onClick={() => onSort(e.id)}>{e.title}</span>
                    )}
                </div>
            </div>
            <CardList cards={cards} />
        </>
)
}