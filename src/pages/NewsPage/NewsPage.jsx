import React, { useContext } from "react";
import { PostList } from "../../components/PostList/PostList";
import { CardContext } from "../../context/cardContext";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { Modal } from "../../components/Modal/Modal";
import { AddPostForm } from "../../components/Form/AddPostForm";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/Post/Post";
import { sortingParameters } from "../../store/utilsStore";

export const NewsPage = () => {
    
    const { sortPosts, search, setModalActive, modalActive, setPosts} = useContext(CardContext);
    const {posts} = useSelector(s => s.posts);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const sendNewPost = () => {
        setPosts(posts)
        setModalActive(false)
    }
    const sortedItems = [
        {id: "popular",
        title: "Популярное"}, 
        {id: "byRate",
        title: "По рейтингу"}, 
        {id: "byAuthor",
        title: "По автору"}, 
        {id: "byAlphabet",
        title: "По алфавиту"}, 
        {id: "byDate",
        title: "По дате размещения"}
    ]

    const foundPosts = (num) => {
        let tmp = num % 10;
        
        if (tmp === 1) {
            return 'статья'
        }
        if (tmp > 1 && tmp < 5) {
            return 'статьи'
        }
        else 
            return 'статей'
    }
    
    return (
        <div>
            <div className="post-list__wrapper">
            {search && <p className="post-list__search__message">По Вашему запросу {posts.length === 1 ? 'найден' : 'найдено'} {posts.length} {foundPosts(posts.length)}</p>}
                <Link><span onClick={() => goBack()}>{'<'} Назад</span></Link>
                <div className="post-list__sorted">
                    {!search && sortedItems.map((e) => 
                        <span className="post-list__sorted_item" key={e.id} onClick={() => dispatch(sortPosts(e.id))}>{e.title}</span>
                    )}
                </div>
                <div>
                    <button onClick={() => setModalActive(true)}>Добавить статью</button>
                    <Modal setModalActive={setModalActive} modalActive={modalActive}>
                        <AddPostForm onSendNewProduct={sendNewPost} />
                    </Modal>
                </div>
            </div>
            <PostList posts={posts} />
            {/* {posts.map(item => <Post post={item} {...item} key={item.updated_at} />)} */}
        </div>
    )
}