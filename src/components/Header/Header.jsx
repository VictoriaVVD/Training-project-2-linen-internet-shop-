import React, { useContext, useState } from 'react';
import "./style.scss";
import { ReactComponent as Logo } from "../../assets/images/logo 1.svg";
import { Search } from './Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { CardContext } from '../../context/cardContext';
import { CatalogButton } from '../CatalogButton/catalogButton';
import { useSelector } from 'react-redux';

export const Header = ({setSearch, setModalActive, isAuthorized, setAuthorized}) => {

    // const setSearchData = (el) => {
    //     setSearch(el);
    // };
    const location = useLocation();
    const {favourites} = useSelector(s => s.products);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate()

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setLoggedIn(false);
        setAuthorized(false);
        <Navigate to={"/"} />;

    }
    
    return <header className='header'>
        <div className='header__wrapper'>
            <div className='header__info_block'>
                {/* {isAuthorized ? <CatalogButton pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /> : ""} */}
                <Link to={"/"}>
                    <Logo className='header__logo'/>
                </Link>
            </div>
            <div className='header__info_block'>
                {(location.pathname === "/catalog" || location.pathname === "/news") && <Search setSearch={setSearch} />}
            </div>
            <div className='header__info_block'>
                <div className='icons__wrapper'>
                    {isAuthorized && 
                    <div className='icons'>
                        <Link to={"/favourites"}>
                            <FontAwesomeIcon icon={faHeart} title='Избранное' size='lg' />
                            <div className='icons__favourite-over-num'>
                                {favourites?.length && <span>{favourites.length}</span>}
                            </div> 
                        </Link>  
                    </div>}
                    {isAuthorized && 
                    <div className='icons'>
                        <Link className="icon__cart" href="">
                            <FontAwesomeIcon icon={faCartShopping} title='Корзина' size='lg' />
                        </Link>
                    </div>}
                    <div className="icons">
                        <Link to={'/singin'} className="icon__profile">
                        {/* <FontAwesomeIcon icon={faUser} title='LogOut' /> */}
                            <button className='header__btn' onClick={() => setModalActive(true)} >Вход / Регистрация</button>
                        </Link>
                    </div> 
                </div>
            </div>
            <Link to={'/'} className="icon__profile"></Link>
        </div>
    </header>
}
