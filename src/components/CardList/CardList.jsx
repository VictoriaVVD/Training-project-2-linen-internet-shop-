import React from 'react';
import "./CardList.css";
import { Card } from '../Card/Card';

const CardList = ({cards, userId, handleLike}) => {
    return (
        <section className="main">
            <div className="cards__wrapper">
            <div className='cards'>
                {cards.map(item => <Card key={item.updated_at} product={item} {...item} userId={userId} handleLike={handleLike}/>)}
            </div>
        </div>
        </section> 
    );
};

export default CardList;