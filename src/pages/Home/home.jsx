import React from "react";
import { Carousel } from 'antd';
import "./style.scss"
import { CardList } from "../../components/CardList/CardList";
import { Card } from "../../components/Card/Card"
import { useSelector } from "react-redux";


export const Home = () => {
    const contentStyle = {
        width: '100%',
        height: '50vh',
        backgroundColor: '#f5efec',
        color: '#f5efec',
        lineHeight: '160px',
        textAlign: 'center',
        margin: '0px auto',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center'
    };

    const products = useSelector(s => s.products.products)
    let data = Array.from(products)?.sort((a, b) => b.likes.length - a.likes.length).slice(0, 3);


    return (
            <div className="home">
                <div className="home__wrapper">
                    <Carousel autoplay >
                        <div style={{backgroundSize: 'auto'}}>
                            <img src="https://cozyhome.ru/upload/iblock/c94/Main_banner_1249x468-1-_1_.png" style={contentStyle} alt="promo"></img>
                        </div>
                        <div >
                            <img src="https://s22221.cdn.ngenix.net/media/wysiwyg/banners/slider/24052023_towels_1343.webp" alt="promo" style={contentStyle}></img>
                        </div>
                        <div >
                            <img src="https://s22221.cdn.ngenix.net/media/wysiwyg/banners/slider/odeyal_pod_1600x540.webp" style={contentStyle} alt="promo"></img>
                        </div>
                        <div >
                            <img src="https://onsilk.ru/wp-content/uploads/2019/06/banner_she-lkovyie-odeyala.jpg" style={contentStyle} alt="promo"></img>
                        </div>
                    </Carousel>
                    <div className="home__promo-block">
                        <h3>Популярные товары</h3>
                        <CardList cards={data} />
                    </div>  
                </div>
            </div>
    );
}

// Шапка
// Каталог кнопка
// Слайдер с рекламными слоганами
// Популярные товары
// Новинки
// Отзывы
// Футер