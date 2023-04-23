import React from 'react';
import "./Header.css";
import { ReactComponent as Logo } from "./img/logo 1.svg";
import s from "./style.modules.css";
import { Search } from './Search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';

export const Header = (props) => {

    const setSearchData = (el) => {
        props.setSearch(el);
    };


    return <header>
        <div className='header__wrapper'>
            <Logo className='header__logo'/>
            <Search setSearch={setSearchData} />
            {/* <div className='icons__wrapper'>
                <div className='icons'>
                    <a className="icon-favourite-over" href="">
                    <FontAwesomeIcon icon={faHeart} /></a>
                    <div className='icon-favorite'></div>
                </div>
                <div className='icons'>
                    <a className="icon-cart" href="">
                    <FontAwesomeIcon icon={faBriefcaseBlank} />
                    </a>
                </div>
                <div className="icons">
                    <a className="icon-profile" href=""></a>
                </div>
            </div> */}
        </div>
    </header>
}
