import { useNavigate } from "react-router-dom";
import { Carousel } from 'antd';
import dataPromo from "../../assets/data/dataPromoCarousel.json";
import "./style.scss";

export const CarouselPromo = () => {
    const contentStyle = {
        width: '100%',
        height: '70vh',
        backgroundColor: '',
        objectFit: 'cover',
        color: '#1686FF',
        lineHeight: '160px',
        textAlign: 'center',
        margin: '30px auto',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
    };

    const navigate = useNavigate();
    const handleClick = (e) => {
        console.log(e.currentTarget.id);
        navigate("/promo");
    }
        

    return (
        <Carousel autoplay style={contentStyle} className="carousel__wrapper carousel">
            {dataPromo.map(e => {
                return (
                    <div className="carousel__promo" key={e.id}>
                        <img src={e.url} style={contentStyle} alt="promo"></img>
                        <div className="carousel__promo_adv">
                            <h2>{e.title}</h2>
                            <button id={e.id} onClick={(e) => handleClick(e)}>Перейти</button>
                        </div>
                    </div>
                )
            })}
        </Carousel>
    )
}

