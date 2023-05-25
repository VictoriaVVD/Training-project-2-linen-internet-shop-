import React from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { Link } from "react-router-dom";

export const RegisterForm = ({ isRequired = true }) => {


    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onSubmit"});

    const sendData = (data) => {
        console.log({ data })
        //    await  api.updateUser(data)
    }

    const groupRegister = {
        required: {
            value: isRequired,
            message: 'Введите номер группы'
        },
        maxLength: { value: 2, message: 'Максимальная длина 2 символа' },
        minLength: { value: 1, message: 'Минимальная длина 1 символ' },
    }
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
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Пароль должен содержать минимум 8 символов, одну большую букву латинского алфавита и одну цифру'
        },
    }

    return (
        <div className="form__wrapper" >
            <h3>Регистрация</h3>
            <form className="form" onSubmit={handleSubmit(sendData)}>

                <div>
                    <input className="form__input" type="number" {...register("group", groupRegister)} placeholder="Номер группы" />
                    {errors?.group && <span> {errors?.group.message}</span>}
                </div>
                <div>
                    <input className="form__input" type="email" {...register("email", emailRegister)} placeholder="email" />
                    {errors?.email && <span> {errors?.email.message}</span>}
                </div>
                <div className="">
                    <input className="form__input" type="password" {...register("password", passwordRegister)} placeholder="Пароль" />
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
                <div className="">
                    <input className="form__input" type="password" {...register("password", passwordRegister)} placeholder="Подтвердите пароль" />
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
                <div>
                    <Link className="form__link" to={'/singin'}>Авторизация</Link>
                </div>
                <button type="submit">Отправить</button>
            </form>
        </div>
    )
}