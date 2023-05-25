import React from "react";
import { Carousel } from 'antd';
import "./style.scss"


export const Home = () => {
    const contentStyle = {
        width: '100%',
        height: 'calc(100vh - 96px - 200px)',
        backgroundColor: '#f5efec',
        color: '#f5efec',
        lineHeight: '160px',
        textAlign: 'center',
        margin: '0px auto'

    };

    return (
            <div className="home__wrapper">
                <div className="home__container">
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