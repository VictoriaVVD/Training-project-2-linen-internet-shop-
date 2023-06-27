import React from "react";
import { CardList } from "../../components/CardList/CardList";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { sortProducts } from "../../store/slices/productsSlice";
import { findWordEnd, sortProductsParameters } from "../../tools/utils";
import { GoBack } from "../../components/GoBack/GoBack";
import { Pagination } from "../../components/Pagination/Pagination";

export const CatalogPage = () => {

    const {products, search} = useSelector(s => s.products);
    const {currentPage, productsOnPage} = useSelector(s => s.paginate);
    const dispatch = useDispatch();
    const lastProductIndex = currentPage * productsOnPage;
    const firstProductIndex = lastProductIndex - productsOnPage;
    const currentProducts = products.slice(firstProductIndex, lastProductIndex);  

    return (
        <div className="catalog">
            <div className="catalog__wrapper">
                <div className="sort__wrapper">
                        <div className="search__message_wrapper">
                            {search && 
                                <p className="search__message">
                                    По Вашему запросу {products.length === 1 ? 'найден ' : 'найдено '} 
                                        <span>{products.length}</span> 
                                            {findWordEnd(products.length, " товар")}
                                </p>
                            }
                        </div>
                        <GoBack />
                        <div className="sort__cards">
                            {!search && sortProductsParameters.map((e) => 
                                <span className="sort__cards_item" key={e.id} 
                                    onClick={() => dispatch(sortProducts(e.id))}>{e.title}
                                </span>
                            )}
                        </div>
                    </div>
                <CardList cards={currentProducts} />
                <Pagination items={products} />
            </div>
        </div>
    )
}