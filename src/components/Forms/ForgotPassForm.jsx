import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { Link } from "react-router-dom";
import { apiUser } from "../../tools/api/apiUser";
import { useDispatch } from "react-redux";
import { setModalOpen, setStateByPath } from "../../store/slices/modalSlice";

export const ForgotPassForm = ({ isRequired = true }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({mode: "onSubmit"});
    const [isGetToken, setToken] = useState(false);
    const dispatch = useDispatch();
    const sendData = async (data) => {
            const email = data.email;
            const res = await apiUser.forgotPassword(data);
                if(res.message === "Письмо успешно отправлено") {
                    reset()
                    setToken(true)
                    const resetPass = async ({email, ...data}) => {
                        const res = await apiUser.resetPassword({...data, email});
                }
            }
        }
        const showModal = (path) => {
            dispatch(setModalOpen(true));
            dispatch(setStateByPath(path));
        }
        
    const emailRegister = { 
        required: {
            value: !isRequired,
            message: 'Введите эл.адрес',
        } 
    }

    const tokenRegister = {
        required: {
            value: isRequired,
            message: 'Введите код из эл.письма',
        }
    }

    const passwordRegister = {
        required: {
            value: isRequired,
            message: 'Введите пароль',
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Пароль должен содержать минимум 8 символов, одну большую букву латинского алфавита и одну цифру',
        },
    }

    return (
            <form className="form" onSubmit={handleSubmit(sendData)}>
                {
                !isGetToken
                ?   <div className="form__wrapper" >
                        <h2>Сброс пароля</h2>
                        <div className="form__pass">
                            <p>Введите email, указанный при регистрации</p>
                            <input className="form__input" 
                                type="email" {...register("email", emailRegister)} 
                                placeholder="e-mail" 
                            />
                            {errors?.email && <span> {errors?.email.message}</span>}
                        </div>
                        <div>
                            <Link className="form__link"
                                onClick={() => showModal("/signin")}>
                                Авторизация
                            </Link>
                        </div>
                        <button className="form__btn"  type="submit">Отправить</button>  
                    </div>

                :   <div className="form__wrapper" >
                        <h3>Восстановление пароля</h3>
                        <div className="form__pass">
                            <input className="form__input" 
                                type="text" {...register("token", tokenRegister)} 
                                placeholder="Введите код из эл.письма" 
                            />
                            {errors?.token && <span> {errors?.token.message}</span>}
                        </div>
                        <div className="form__pass">
                            <input className="form__input" 
                                type="password" {...register("password", passwordRegister)} 
                                placeholder="Новый пароль"
                            />
                            {errors?.password && <span> {errors?.password.message}</span>}
                        </div>
                        <div>
                            <Link className="form__link"
                                onClick={() => showModal("/signin")}>
                                Авторизация
                            </Link>
                        </div>
                        <button className="form__btn" type="submit">Восстановить пароль</button>
                    </div>
                } 
            </form>
        )
}