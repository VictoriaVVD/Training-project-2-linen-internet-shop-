import { useNavigate } from "react-router-dom";
import { Carousel } from 'antd';
import dataPromo from "../../assets/data/dataPromoCarousel.json";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen, setStateByPath } from "../../store/slices/modalSlice";

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
    const {isAuthorized} = useSelector(s => s.user);
    const dispatch = useDispatch();
    const handleClick = () => {
        if (isAuthorized) {
            navigate("/promo");
        } else {
            dispatch(setModalOpen(true));
            dispatch(setStateByPath("warning"));
        }
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

