import React from 'react';
import "./style.scss";
import { ReactComponent as Logo} from "../../assets/images/logo 1.svg";
import { faTelegram, faWhatsapp, faViber, faVk } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const Footer = () => {

    const {isAuthorized} = useSelector(s => s.user);

    return <footer className='footer'>
        <div className='footer__wrapper'>
            <div className='footer__logo_wrapper'>
                <div className='footer__logo'>
                    <Link to={"/"}>
                        <Logo />
                    </Link>
                </div>
                <p>© «Интернет-магазин Linen-shop.ru»</p>
            </div>
            <div className='footer__links'>
                <Link to={"/about"}>О нас</Link>
                <Link to={"/delivery"}>Оплата и доставка</Link>
                <Link to={"/faq"}>Часто спрашивают</Link>
                <Link to={"/feedback"}>Напишите нам</Link>
            </div>
            {isAuthorized &&
                <div className='footer__links'>
                    <Link to={"/news"}>Блог</Link>
                    <Link to={"/promo"}>Акции</Link>
                    <Link to={""}></Link>
                    <Link to={""}></Link>
                    {/* <Link to={"/contacts"}>Контакты</Link> */}
                </div>
            }
            <div className='footer__links'>
                <div className='footer__contacts'>
                    <h4>Мы на связи</h4>
                    <a href="tel">8 (999) 00-00-00</a>
                </div>
                {/* <a href="">linen_shop.ru@gmail.com</a> */}
                <div className='social-icons'>
                    <a href="https://t.me/telegram" target='blank'><FontAwesomeIcon icon={faTelegram}/></a>
                    <a href="https://www.whatsapp.com/" target='blank'><FontAwesomeIcon icon={faWhatsapp}/></a>
                    <a href="https://www.viber.com/ru/" target='blank'><FontAwesomeIcon icon={faViber}/></a>
                    <a href="https://vk.com" target='blank'><FontAwesomeIcon icon={faVk}/></a>
                </div>
            </div>
        </div>    
    </footer>
}
