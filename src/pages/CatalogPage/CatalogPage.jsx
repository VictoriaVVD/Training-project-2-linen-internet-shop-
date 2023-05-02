import React from "react";
import { CardList } from "../../components/CardList/CardList";
import s from "./index.module.css";

export const CatalogPage = ({cards, user, handleProductLike, search, onSort}) => {
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


    return (
        <>
            <div className={s.sortWrapper}>
                    {search && <p className={s.searchMessage}>По Вашему запросу {cards.length === 1 ? 'найден' : 'найдено'} {cards.length} {foundProduct(cards.length)}</p>}
                <div className={s.sortCards}>
                    {!search && sortedItems.map((e) => 
                        <span className={s.sortCardsItem} key={e.id} onClick={() => onSort(e.id)}>{e.title}</span>
                    )}
                </div>
            </div>
            <CardList cards={cards} userId={user._id} handleLike={handleProductLike} onSort={onSort} />
        </>
)
}