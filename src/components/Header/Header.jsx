import React from 'react';
import "./Header.css";
import { ReactComponent as Logo } from "../../assets/images/logo 1.svg";
import s from "./style.modules.css";
import { Search } from './Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Header = (props) => {

    const setSearchData = (el) => {
        props.setSearch(el);
    };
    const location = useLocation();

    return <header>
        <div className='header__wrapper'>
            <Link to={"/"}>
                <Logo className='header__logo'/>
            </Link>

            {location.pathname === "/" && <Search setSearch={setSearchData} />}
            <div className='icons__wrapper'>
                <div className='icons'>
                    <Link to={"/favourites"}>
                        <FontAwesomeIcon icon={faHeart} title='Избранное' />
                    </Link>
                    <div className='icon-favourite-over-num'>
                        {/* <span>{props.favourites.length > 0 ? props.favourites.length : ""}</span> */}
                    </div>   
                </div>
                <div className='icons'>
                    <a className="icon-cart" href="">
                    <FontAwesomeIcon icon={faCartShopping} />
                    </a>
                </div>
                <div className="icons">
                    <a className="icon-profile" href="">
                    <FontAwesomeIcon icon={faUser} />
                    </a>
                </div> 
            </div>
        </div>
    </header>
}
