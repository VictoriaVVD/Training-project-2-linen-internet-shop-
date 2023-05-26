import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";
import { Link } from "react-router-dom";
import { apiUser } from "../../assets/api/apiUser";

export const ForgotPassForm = ({ isRequired = true }) => {
    const [isGetToken, setToken] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onSubmit"});

    const sendData = async (data) => {
        const res = await apiUser.forgotPassword(data);
        if(res.message === "Письмо успешно отправлено") {
            setToken(true)
        }
    }
    const resetPass = async (data, token) => {
        const res = await apiUser.resetPassword({password: data.password}, data.token);

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
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Пароль должен содержать минимум 8 символов, одну большую букву латинского алфавита и одну цифру'
        },
    }

    return (
        <div className="form__wrapper" >
                        {!isGetToken
                        ?
                <form className="form" onSubmit={handleSubmit(sendData)}>
                        <h3>Сброс пароля</h3>
                        <div>
                            <input className="form__input" type="text" {...register("email", emailRegister)} placeholder="email" />
                            {errors?.email && <span> {errors?.email.message}</span>}
                        </div>
                        <div>
                            <Link className="form__link" to={'/singin'}>Авторизация</Link>
                        </div>
                        <button className="form__btn"  type="submit">Отправить</button>    
                    </form>

                :   <form className="form" onSubmit={handleSubmit(resetPass)}>
                        <h3>Восстановление пароля</h3>
                        <div>
                            <input className="form__input" type="text" {...register("token")} placeholder="Код, указанный в email" />
                            {errors?.token && <span> {errors?.token.message}</span>}
                        </div>
                        <div>
                            <input className="form__input" type="password" {...register("password", passwordRegister)} placeholder="Новый пароль" />
                            {errors?.password && <span> {errors?.password.message}</span>}
                        </div>
                        <div>
                            <Link className="form__link" to={'/singin'}>Авторизация</Link>
                        </div>
                        <button className="form__btn" type="submit">Восстановить пароль</button>
                    </form>

                } 
        </div>
    )
}