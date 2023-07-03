import React, { useCallback } from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { Link } from "react-router-dom";
import { apiUser } from "../../tools/api/apiUser";
import { useDispatch } from "react-redux";
import { setModalOpen, setStateByPath } from "../../store/slices/modalSlice";

export const RegisterForm = ({ isRequired = true }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onSubmit"});
    const dispatch = useDispatch();
    const sendData = useCallback(async (data) => {
        await apiUser.singup(data);
    }, []);
    const showModal = (path) => {
        dispatch(setModalOpen(true));
        dispatch(setStateByPath(path));
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
            value: isRequired,
            message: 'Введите эл.адрес'
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
        <form className="form" onSubmit={handleSubmit(sendData)}>
            <div className="form__wrapper" >
                <h2>Регистрация</h2>
                <div className="form__pass">
                    <input className="form__input" 
                        type="number" {...register("group", groupRegister)} 
                        placeholder="Номер группы"
                    />
                    {errors?.group && <span> {errors?.group.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" 
                        type="email" {...register("email", emailRegister)} 
                        placeholder="email"
                    />
                    {errors?.email && <span> {errors?.email.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" 
                        type="password" {...register("password", passwordRegister)} 
                        placeholder="Пароль"
                    />
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" 
                        type="password" {...register("password", passwordRegister)} 
                        placeholder="Подтвердите пароль"
                    />
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
                <div>
                    <Link className="form__link"
                        onClick={() => showModal("/signin")}>
                        Авторизация
                    </Link>
                </div>
                <button className="form__btn"  type="submit">Отправить</button>
            </div>
        </form>
    )
}