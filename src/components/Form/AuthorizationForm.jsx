import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { Link } from "react-router-dom";

export const AuthorizationForm = ({ isRequired = true }) => {

    const [type, setType] = useState(true)


    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onSubmit"});

    const sendData = (data) => {
        console.log({ data })
        //    await  api.updateUser(data)
    }

    console.log({ errors });

    const emailRegister = { 
        required: {
            value: true,
            massage: 'Введите эл.адрес'
        } 
    }

    const passwordRegister = {
        required: {
            value: isRequired,
            message: 'Введите пароль'
        },
    }

    return (
        <div className="form__wrapper" >
            <h3>Авторизация</h3>
            <form className="form" onSubmit={handleSubmit(sendData)}>

                <div>
                    <input className="form__input" type="email" {...register("email", emailRegister)} placeholder="email" />
                    {errors?.email && <span> {errors?.email.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type={!type ? 'password' : 'text'} {...register("password", passwordRegister)} placeholder="Пароль" />
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
                <div>
                    <Link className="form__link" to={'/singup'}>Регистрация</Link>
                </div>
                <button type="submit">Войти</button>
            </form>
        </div>
    )
}