import React from 'react';
import "./CardList.scss";
import { Card } from '../Card/Card';

export const CardList = ({ cards, onDeleteCards}) => {
    return (
        <section className="main">
            <div className="cards__wrapper">
            <div className='cards'>
                {cards.map(item => <Card key={item.updated_at} product={item} {...item} onDeleteCards={onDeleteCards} />)}
            </div>
        </div>
        </section> 
    );
};
