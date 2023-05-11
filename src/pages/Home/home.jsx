import React from "react";
import { Carousel } from 'antd';


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

    <Carousel autoplay >
        <div style={{backgroundSize: 'contain'}}>
            <img src="https://cdn-mgsm.akinon.net/cms/2023/05/01/281cfcc2-e836-4456-8a3f-fbf1006061a4.jpg" style={contentStyle} alt="promo"></img>
        </div>
        <div >
            <img src="https://www.shopmarriott.com/images/products/v2/xlrg/Marriott-platinum-stitch-bed-bedding-set-mar-101-st-gy_xlrg.jpg" alt="promo" style={contentStyle}></img>
        </div>
        <div >
            <img src="https://cozyhome.ru/upload/resize_cache/iblock/561/xabmb2mxmthj9dfrtz7bo73i0jhc52wt/1320_360_2/QI0A1745.jpg" style={contentStyle} alt="promo"></img>
        </div>
        <div >
            <img src="https://cdn-mgsm.akinon.net/cms/2023/02/27/0cc1577e-4026-46ef-a28b-95924cd5ff8a.jpg" style={contentStyle} alt="promo"></img>
        </div>
    </Carousel>
    );
}

// Шапка
// Каталог кнопка
// Слайдер с рекламными слоганами
// Популярные товары
// Новинки
// Отзывы
// Футер