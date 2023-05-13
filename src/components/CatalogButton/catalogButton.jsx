import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import "./style.css";
import { Link } from 'react-router-dom';

export const CatalogButton = () => {
    
  return (
    <Menu>
        <a href='/catalog' className="menu-item">
            Каталог товаров
        </a>
        <Link to={""}>
            <span className="menu-item">Новинки</span>
        </Link>
        <Link to={""}>
            <span className="menu-item">SALE</span>
        </Link>
        <Link to={""}>
            <span className="menu-item">О нас</span>
        </Link>
        <Link to={""}>
            <span className="menu-item">Доставка</span>
        </Link>
        <Link to={""}>
            <span className="menu-item">Контакты</span>
        </Link>
    </Menu>
  );
};
