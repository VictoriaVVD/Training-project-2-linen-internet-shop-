import React from 'react';
import "./style.scss";
import { Card } from '../Card/Card';

export const CardList = ({ cards }) => {
    return (
            <div className='cards'>
                {cards
                    .map(item => 
                        <Card key={item.updated_at} product={item} {...item} 
                        />
                    )
                }
            </div>
    );
};
