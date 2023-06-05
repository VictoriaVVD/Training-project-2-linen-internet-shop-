import React from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { apiUser } from "../../assets/api/apiUser";

export const AuthorizationForm = ({ isRequired = true }) => {


    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onSubmit"});
    const sendData = async (data) => {
        const res = await apiUser.singin(data);
        localStorage.setItem("token", res.token);
        alert("Успешно!");
        <Navigate to={"/profile"} />
    }

    const emailRegister = { 
        required: {
            value: isRequired,
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
                    <input className="form__input" type="text" {...register("email", emailRegister)} placeholder="email" />
                    {errors?.email && <span> {errors?.email.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type='password' {...register("password", passwordRegister)} placeholder="Пароль" />
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
                <div>
                    <Link className="form__link" to={'/forgot-password'}>Забыли пароль</Link>
                </div>
                <div>
                    <Link className="form__link" to={'/singup'}>Регистрация</Link>
                </div>
                <button className="form__btn"  type="submit">Войти</button>
            </form>
        </div>
    )
}