import React from 'react';
import "./style.scss";
import { ReactComponent as Logo } from "../../assets/images/logo 1.svg";
import { Search } from '../Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthorized } from '../../store/slices/userSlice';
import { setModalOpen, setStateByPath } from '../../store/slices/modalSlice';
import { Modal } from '../Modal/Modal';


export const Header = () => {

    const location = useLocation();
    const {favourites} = useSelector(s => s.products);
    const {favouritePosts} = useSelector(s => s.posts);
    const {isAuthorized} = useSelector(s => s.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cart} = useSelector(s => s.cart);
    const getTotalQuantity = () => {
            let total = 0;
            
            if (!!cart) {
                cart.forEach(e => 
                    total += e.quantity
                )
            }
            return total;
        }
    const countFavTotal = favourites.length + favouritePosts.length;
    const logIn = () => {
        dispatch(setModalOpen(true));
        dispatch(setStateByPath("/signin"));
    }
    const logOut = () => {
        localStorage.removeItem("token");
        dispatch(setAuthorized(false));
        navigate("/");
    }
    
    return <header className="header">
        <div className="header__wrapper">
            <Link to={"/"}>
                <Logo className="header__logo"/>
                <p className="header__logo_subtitle">Магазин постельных принадлежностей</p>
            </Link>
            <div className="header__info_block">
                {(location.pathname === "/catalog" || location.pathname === "/news") && <Search />}
            </div>
            <div className="header__info_block">
                <div className="icons__wrapper">

                    {isAuthorized && location.pathname !== "/" && location.pathname !== "/catalog" &&
                        <div className="icons">
                            <Link to={"/catalog"}>
                                <button className="header__btn" title="Каталог">
                                    Каталог
                                </button>
                            </Link>  
                        </div>}
                
                    {isAuthorized && 
                    <div className="icons">
                        <Link to={"/favourites"}>
                            <FontAwesomeIcon icon={faHeart} title="Избранное" size="lg" />
                            {!!favourites?.length &&
                                <div className="icons__favourite-over-num">
                                    <span>{countFavTotal}</span>
                                </div>}
                        </Link>  
                    </div>}
                    {isAuthorized && 
                    <div className="icons">
                        <Link to={"/cart"} className="icon__cart" >
                            <FontAwesomeIcon icon={faCartShopping} title="Корзина" size="lg" />
                                <div className="icons__favourite-over-num">
                                    <span>{getTotalQuantity()}</span>
                                </div>
                        </Link>  
                    </div>}
                    {isAuthorized && 
                    <div className="icons">
                        <Link to={"/profile"} className="icon__profile">
                            <FontAwesomeIcon icon={faUser} title="Личный кабинет" size="lg" />
                        </Link>
                    </div>}
                    <div className="icons">
                        {!isAuthorized
                            ? <button className="header__btn" onClick={logIn} >Вход / Регистрация</button>
                            : <button className="header__btn" onClick={logOut} >Выйти</button>
                        }
                    </div> 
                    <Modal />
                </div>
            </div>
        </div>
    </header>
}
