import React, { useContext } from "react";
import { CardList } from "../../components/CardList/CardList";
import s from "./index.module.scss";
import { CardContext } from "../../context/cardContext";
import { Link, useNavigate } from "react-router-dom";
import { AddProductForm } from "../../components/Form/AddProductForm";
// import { useSelector } from "react-redux";
import { Modal } from "../../components/Modal/Modal"
import { useDispatch, useSelector } from "react-redux";
import { sortingParameters } from "../../store/utilsStore";
import { sortProducts } from "../../store/slices/productsSlice";


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

    const {products} = useSelector(s => s.products);
    const dispatch = useDispatch();

    const {cards, setCards, search, setModalActive, modalActive} = useContext(CardContext);

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    // const sendNewProduct = (data) => {
    //     setCards(data)
    //     setModalActive(false)
    // }

    // const onDeleteCards = (id) => {
    //     const filtered = products.filter(e => e._id !== id)
    //     setCards(filtered) 
    // }

    return (
        <>
            <div className={s.sort__wrapper}>
                    {search && <p className={s.search__message}>По Вашему запросу {products.length === 1 ? 'найден' : 'найдено'} {products.length} {foundProduct(products.length)}</p>}
                <Link>
                    <span onClick={() => goBack()}>{'<'} Назад</span>
                </Link>
                <div className={s.sort__cards}>
                    {!search && sortedItems.map((e) => 
                        <span className={s.sort__cards_item} key={e.id} onClick={() => dispatch(sortProducts(e.id))}>{e.title}</span>
                    )}
                </div>
                <div>
                    <button onClick={() => setModalActive(true)}>Добавить товар</button>
                    <Modal setModalActive={setModalActive} modalActive={modalActive}>
                        <AddProductForm />
                    </Modal>
                </div>
            </div>
            <CardList cards={products} />
        </>
)
}