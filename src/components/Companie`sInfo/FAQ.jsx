import React, { useState } from "react";
import "./style.scss";
import dataFAQ from "../../assets/data/dataFAQ.json";
import { GoBack } from "../GoBack/GoBack";

export const FAQ = () => {
    const [selected, setSelected] = useState(null);
    
    const toggle = (index) => {
        if (selected === index) {
            return setSelected(null);
        }
        return setSelected(index);
    };

    return (
        <div className='about'>
            <div className="about__wrapper">
                <GoBack />
                <h2 className='about_title'>Часто спрашивают</h2>
                <div className='about__faq'>
                    {dataFAQ.map((item, index) => {
                        return (
                            <div className='about__faq_item' key={index}>
                                <div className='about__faq_title' onClick={() => toggle(index)}>
                                    <h3>{item.title}</h3>
                                </div>
                                <div className={selected === index
                                        ? 'about__faq_content show'
                                        : 'about__faq_content'}>
                                        {item.text}
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
            </div>
        </div>
    );
}