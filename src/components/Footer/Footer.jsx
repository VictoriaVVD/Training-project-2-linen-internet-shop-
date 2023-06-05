import React from 'react';
import "./Footer.scss";
import { ReactComponent as Logo} from "../../assets/images/logo 1.svg";
import { faTelegram, faWhatsapp, faViber, faInstagram, faVk } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


export const Footer = () => {
    return <footer className='footer'>
        <div className='footer__wrapper'>
            <div className='footer__logo_wrapper'>
                <Link to={"/"}>
                    <Logo />
                </Link>
                <p>© «Интернет-магазин Linen-shop.ru»</p>
            </div>
            {/* <div className='footer__links'>
                <a href="">Каталог</a>
                <a href="">Акции</a>
                <a href="">Новости</a>
                <a href="">Отзывы</a>
            </div> */}
            <div className='footer__links'>
                <Link to={"/about"}>О нас</Link>
                <a href="">Оплата и доставка</a>
                <a href="">Часто спрашивают</a>
                <a href="">Напишите нам</a>
                <a href="">Контакты</a>
            </div>
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
                    {/* <a href="" target='blank'><FontAwesomeIcon icon={faInstagram}/></a> */}
                    <a href="https://vk.com" target='blank'><FontAwesomeIcon icon={faVk}/></a>
                </div>
            </div>
        </div>    
    </footer>
}
