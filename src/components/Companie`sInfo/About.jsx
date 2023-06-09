import React from "react";
import "./style.scss";
import { GoBack } from "../GoBack/GoBack";

export const About = () => {
    return (
        <div className="about">
            <div className="about__wrapper">
                <GoBack />
                <h2 className="about_title">О компании</h2>
                <img src="https://akn-coco.b-cdn.net/cms/2023/02/24/b16781ef-b9a9-42f6-9703-356024727307.jpg" alt="" />
                <p className="about_title">Добро пожаловать в наш уютный дом! Мы занимаемся продажей домашнего текстиля с 2008 года, 
                    и постоянно стремимся к совершенству.
                </p>
                <div className="about__content-block">
                    <div className="about__content-info">
                        <h3>Более 150 производителей из 10 стран</h3>
                        <p>В интернет-магазине Postel Deluxe Вы найдёте более 150 производителей из 10 стран. 
                        Но мы не останавливаемся, каждый день мы ищем новых производителей по всему миру и отбираем лучшие коллекции домашнего текстиля, 
                        чтобы радовать Вас и украшать Ваш дом красивыми и качественными вещами.
                        </p>
                    </div>
                    <img src="https://venera-mart.ru/images/companies/1/web/%D1%85%D0%BB%D0%BE%D0%BF%D0%BE%D0%BA%20%D1%81%D0%BA%D0%BB%D0%B0%D0%B4%20%D0%B8%D0%B7%D0%B4%D0%B5%D0%BB%D0%B8%D0%B9%20%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%B1%D0%B5%D0%BB%D1%8C%D0%B5%20venera-mart.ru.jpg?1423749418944" alt="" />
                </div>
                <div className="about__content-block">
                    <img src="https://mediacat.com/wp-content/uploads/2019/04/madame-coconun-pr-ajansi-00.jpg" alt="" />
                    <div className="about__content-info">
                        <h3>Работаем более 10 лет</h3>
                        <p>Мы закупаем товары крупными оптовыми партиями и стабильно работаем уже больше десяти лет, 
                        поэтому производители нам доверяют, и предлагают большие скидки. 
                        За счёт этого мы снижаем цены на многие коллекции домашнего текстиля.
                        </p>
                    </div>
                </div>
                <div className="about__content-block">
                    <div className="about__content-info">
                        <h3>Круглосуточная служба поддержки</h3>
                        <p>Среди огромного ассортимента вы обязательно найдёте то, 
                        что понравится Вам и подойдёт к интерьеру Вашего дома. 
                        Если у Вас нет времени или желания выбирать самостоятельно, 
                        наши менеджеры помогут Вам с выбором и расскажут об особенностях каждого товара.
                        </p>
                    </div>
                    <img src="https://sc02.alicdn.com/kf/HTB15mS5kNPI8KJjSspf763CFXXal/229206465/HTB15mS5kNPI8KJjSspf763CFXXal.png" alt="" />
                </div>
                <h4>Наши реквизиты</h4>

                    <p>ООО «OOO»</p>
                    <p>ИНН 7721111111</p>
                    <p>КПП 772101001</p>
                    <p>ОГРН 1057721010101</p>
                    <p>Р/сч 40700010100010101010 ПАО «Сбербанк» г. Москва</p>
                    <p>Корр/сч 30101810400000000225</p>
                    <p>БИК 044525225</p>
                    <p>Юридический адрес: 109202, город Москва, 1-я Карачаровская улица, д. 1, стр. 1, помещение 1</p>
                    <p>Телефон: +7 (999) 00-00-00</p>
                    <p>e-mail: linen_shop.ru@gmail.com</p>
            </div>
        </div>
    )
}