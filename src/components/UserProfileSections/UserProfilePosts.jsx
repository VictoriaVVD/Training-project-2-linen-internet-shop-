import React from "react";
import "./style.scss";
import { useDispatch, useSelector } from 'react-redux';
import { filterItemsByAuthor } from '../../tools/utils';
import { setModalOpen, setStateByPath } from '../../store/slices/modalSlice';
import { PostList } from '../PostList/PostList';
import { Modal } from '../Modal/Modal';
import { Pagination } from '../Pagination/Pagination';


export const UserProfilePosts = ({post}) => {

    const {data: user} = useSelector(s => s.user);
    const {posts} = useSelector(s => s.posts);
    const {currentPage, productsOnPage} = useSelector(s => s.paginate);
    const dispatch = useDispatch();
    const lastProductIndex = currentPage * productsOnPage;
    const firstProductIndex = lastProductIndex - productsOnPage;

    const myPosts = filterItemsByAuthor(posts, user?._id)
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .slice(firstProductIndex, lastProductIndex);;
    const showModal = (path) => {
        dispatch(setModalOpen(true));
        dispatch(setStateByPath(path))
    }

    return (
            <div className="profile__block_content">            
                <button className="profile__block_btn" 
                    onClick={() => showModal("newPost")} title='Добавить новую статью'> 
                        Добавить новую статью 
                </button>
                <PostList posts={myPosts} item={post} />
                <Modal />
                <Pagination items={posts} />
            </div>
    )
};
