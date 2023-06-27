import React from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../store/slices/paginationSlice';
import cn from "classnames";

export const Pagination = ({items}) => {

    const {currentPage, productsOnPage} = useSelector(s => s.paginate);
    const dispatch = useDispatch();
    const pageNumbersArr = [];
    let count = Math.ceil(items?.length / productsOnPage);
        
    for (let i = 1; i <= count; i++) {
        pageNumbersArr.push(i);
    }

    const prevPage = () => {
        dispatch(setCurrentPage(currentPage - 1));
    };
    const nextPage = () => {
        dispatch(setCurrentPage(currentPage + 1));
    };
    

    return (
        <div className="pagination">
            <button 
                    className={cn("pagination__btn", {
                        "hidden": (currentPage === 1)}
                    )} 
                    onClick={prevPage}>
                        &#8249; Пред.
                </button>
                <ul className="pagination__page_list">
                    {pageNumbersArr.map((num) =>
                        <li 
                            key={num}
                            onClick={() => dispatch(setCurrentPage(num))}
                            className={cn("pagination__page", {
                                "active": (num === currentPage)}
                            )}
                        >
                            {num}
                        </li>
                    )}
                </ul>
                <button 
                    className={cn("pagination__btn", {
                        "hidden": (currentPage === pageNumbersArr.length)}
                    )} 
                    onClick={nextPage}>
                        След. &#8250;
                </button>
        </div>
    );
};
