import React from "react";
import "./style.scss";
import { useDispatch, useSelector } from 'react-redux';
import { CardList } from '../CardList/CardList';
import { filterItemsByAuthor } from '../../tools/utils';
import { setModalOpen, setStateByPath } from '../../store/slices/modalSlice';
import { Modal } from '../Modal/Modal';
import { Pagination } from '../Pagination/Pagination';


export const UserProfileProducts = ({product}) => {

    const {data: user, loading} = useSelector(s => s.user);
    const {products} = useSelector(s => s.products);
    const {currentPage, productsOnPage} = useSelector(s => s.paginate);
    const dispatch = useDispatch();
    const lastProductIndex = currentPage * productsOnPage;
    const firstProductIndex = lastProductIndex - productsOnPage;

    const myProducts = filterItemsByAuthor(products, user?._id)
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .slice(firstProductIndex, lastProductIndex);
    const showModal = (path) => {
        dispatch(setModalOpen(true));
        dispatch(setStateByPath(path))
    };

    return (
            <div className="profile__block_content">
                {user.about === "Admin" &&
                    <button className="profile__block_btn" 
                        onClick={() => showModal("newProduct")} title='Добавить новый товар'> 
                            Добавить новый товар 
                    </button>
                }    
                <CardList cards={myProducts} item={product} />
                <Modal />
                <Pagination items={products} />
            </div>
    )
};
