import React, { useCallback } from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { apiUser } from "../../tools/api/apiUser";
import { useDispatch, useSelector } from "react-redux";
import { setAuthorized } from "../../store/slices/userSlice";
import { openNotification } from "../Notification/Notification";
import { setModalOpen, setStateByPath } from "../../store/slices/modalSlice";


export const AuthorizationForm = ({ isRequired = true }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onSubmit"});

    const user = useSelector(s => s.user.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sendData = useCallback(async (data) => {
        const res = await apiUser.singin(data);
        localStorage.setItem("token", res.token);
        if(res.token) {
            dispatch(setAuthorized(true));
            openNotification("success", `Здравствуйте, ${user.name} `)
            navigate("/catalog");
            setModalOpen(false);
        } else
        navigate("/")
    }, [dispatch, user.name, navigate]);

    const showModal = (path) => {
        dispatch(setModalOpen(true));
        dispatch(setStateByPath(path));
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
    }

    return (

        <form className="form" onSubmit={handleSubmit(sendData)}>
            <div className="form__wrapper" >
                <h2>Авторизация</h2>
                <div className="form__pass">
                    <input className="form__input" 
                        type="text" {...register("email", emailRegister)} 
                        placeholder="email"
                    />
                    {errors?.email && <span> {errors?.email.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" 
                        type='password' {...register("password", passwordRegister)} 
                        placeholder="Пароль"
                    />
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
                <div>
                    <Link className="form__link"
                        onClick={() => showModal("/forgot_password")}>
                        Забыли пароль?
                    </Link>
                </div>
                <div>
                    <Link className="form__link"
                        onClick={() => showModal("/signup")}>
                        Регистрация
                    </Link>
                </div>
                <button className="form__btn"  type="submit">Войти</button>      
            </div>
        </form>
    )
}