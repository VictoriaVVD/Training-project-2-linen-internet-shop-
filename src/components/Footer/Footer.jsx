import React from 'react';
import "./Footer.css";
import { ReactComponent as Logo} from "../Header/img/logo 1.svg";
import { faTelegram, faWhatsapp, faViber, faInstagram, faVk } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const Footer = () => {
    return <footer>
        <div className="footer__wrapper">
            <div className='footer__logo_wrapper'>
                <Logo />
                <p>© «Интернет-магазин Linen-shop.ru»</p>
            </div>
            <div className='footer__links'>
                <a href="#">Каталог</a>
                <a href="#">Акции</a>
                <a href="">Новости</a>
                <a href="">Отзывы</a>
            </div>
            <div className='footer__links'>
                <a href="">Оплата и доставка</a>
                <a href="">Часто спрашивают</a>
                <a href="">Обратная связь</a>
                <a href="">Контакты</a>
            </div>
            <div className='footer__links'>
                <div className='footer__contacts'>
                    <h4>Мы на связи</h4>
                    <a href="tel">8 (999) 00-00-00</a>
                </div>
                <a href="">linen_shop.ru@gmail.com</a>
                <div className='social-icons'>
                    <a href=""><FontAwesomeIcon icon={faTelegram}/></a>
                    <a href=""><FontAwesomeIcon icon={faWhatsapp}/></a>
                    <a href=""><FontAwesomeIcon icon={faViber}/></a>
                    <a href=""><FontAwesomeIcon icon={faInstagram}/></a>
                    <a href=""><FontAwesomeIcon icon={faVk}/></a>
                </div>
            </div>
        </div>    
    </footer>
}
