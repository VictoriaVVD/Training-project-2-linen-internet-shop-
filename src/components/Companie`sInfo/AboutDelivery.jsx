import React from "react";
import "./style.scss";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AboutDelivery = () => {
    return (
        <div className="about delivery">
            <div className="about__wrapper">
                <div className="about__delivery">
                    <FontAwesomeIcon icon={faTruck} size="lg" />
                    <h2>Доставка</h2>
                </div>
                <p>Доставка заказов осуществляется по всей России. 
                Сроки доставки зависят от города и могут составлять от 2 до 14 дней.
                </p>
                <div>
                    <h3 className="about__delivery">Доступные способы оплаты</h3>
                        <li>Безналичный расчет</li>
                        <li>Наличный расчет при получении заказа</li>
                        <li>Яндекс.деньги</li>
                </div>
            </div>
        </div>
    )
}