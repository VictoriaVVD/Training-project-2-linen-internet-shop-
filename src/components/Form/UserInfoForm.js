import React from "react";
import { useForm } from 'react-hook-form';

export const UserInfoForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onSubmit"});
    
    const nameRegister = {
        required: {
            value: 1,
        }
    }
    const groupRegister = {
        required: {
            value: 1,
        }
    }
    const emailRegister = { 
        required: {
            value: 1,
        } 
    }

    const passwordRegister = {
        required: {
            value: 1,
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Пароль должен содержать минимум 8 символов, одну большую букву латинского алфавита и одну цифру'
        },
    }

    return (
        <div className="form__wrapper" >
            <h3>Личный кабинет</h3>
            <form className="form" onSubmit={handleSubmit()}>
                <div>
                    <input className="form__input" type="text" {...register("name", nameRegister)} placeholder="Имя" />
                </div>
                <div>
                    <input className="form__input" type="number" {...register("group", groupRegister)} placeholder="Номер группы" />
                </div>
                <div>
                    <input className="form__input" type="email" {...register("email", emailRegister)} placeholder="email" />
                    {errors?.email && <span> {errors?.email.message}</span>}
                </div>
                <div className="">
                    <input className="form__input" type="password" {...register("password", passwordRegister)} placeholder="Пароль" />
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
                {/* <div>
                    <Link className="form__link" to={'/singin'}>Авторизация</Link>
                </div>
                <button className="form__btn"  type="submit">Отправить</button> */}
            </form>
        </div>
    )
}
