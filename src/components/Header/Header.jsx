import React, { useContext } from 'react';
import "./Header.scss";
import { ReactComponent as Logo } from "../../assets/images/logo 1.svg";
import { Search } from './Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { CardContext } from '../../context/cardContext';
import { CatalogButton } from '../CatalogButton/catalogButton';

export const Header = (props) => {

    const setSearchData = (el) => {
        props.setSearch(el);
    };
    const location = useLocation();
    const {favourites, setModalActive} = useContext(CardContext);
    
    return <header className='header'>
        <div className='header__wrapper'>
            <CatalogButton pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <Link to={"/"}>
                <Logo className='header__logo'/>
            </Link>

            {location.pathname === "/catalog" && <Search setSearch={setSearchData} />}
            <div className='icons__wrapper'>
                <div className='icons'>
                    <Link to={"/favourites"}>
                        <FontAwesomeIcon icon={faHeart} title='Избранное' />
                        <div className='icons__favourite-over-num'>
                            {favourites?.length && <span>{favourites.length}</span>}
                        </div> 
                    </Link>  
                </div>
                <div className='icons'>
                    <Link className="icon__cart" href="">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>
                </div>
                <div className="icons">
                    <Link to={'/singin'} className="icon__profile" onClick={() => setModalActive(true)}>
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                    <Link to={"/profile"}></Link>
                </div> 
            </div>
        </div>
    </header>
}
