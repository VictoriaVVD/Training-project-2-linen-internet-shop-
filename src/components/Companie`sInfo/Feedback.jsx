
import React from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import { openNotification } from "../Notification/Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export const Feedback = () => {

    const { register, handleSubmit, reset } = useForm({mode: "onSubmit"});
    
    const sendData = (data) => {
        openNotification("success", "Письмо отправлено");
        reset();
    };

    return (
            <div className="about">
                <div className="about__wrapper">
                    <h2><FontAwesomeIcon icon={faEnvelope} /> Напишите нам </h2>
                    <h3>Заполните форму ниже, если у Вас есть вопросы, пожелания или предложения.</h3>
                    <form className="feedback" onSubmit={handleSubmit(sendData)}>
                        <div className="feedback__content">
                            <div className="feedback__pass">
                                <label>Имя</label>
                                <input className="feedback__input" type="text" 
                                    {...register("name")} 
                                />
                            </div>
                            <div className="feedback__pass">
                                <label>Email</label>
                                <input className="feedback__input" type="email" 
                                    {...register("email")} 
                                />
                            </div>
                                <div className="feedback__pass">
                                    <label>Телефон</label>
                                    <input className="feedback__input" type="tel" 
                                        {...register("phone")} 
                                    />
                            </div>
                        </div>
                        <div className="feedback__pass">
                            <label> Текст обращения</label>
                            <textarea className="feedback__input" type="text" rows={8}
                                {...register("text")}  
                            />
                        </div>
                        <div className="feedback__pass">
                            <label>Добавьте вложения</label>
                            <input className="feedback__input" type="file" 
                            />
                        </div>
                        <button className="feedback__btn"  type="submit">Отправить</button>
                    </form>
                </div>
            </div>
    )
}

