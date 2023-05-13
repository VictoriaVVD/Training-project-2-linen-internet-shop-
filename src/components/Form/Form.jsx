import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import "./style.scss";

export const Form = ({ isRequired = true }) => {

    const [type, setType] = useState(true)


    const { register, handleSubmit, formState: { errors } } = useForm({mode: "onBlur"});

    const sendData = (data) => {
        console.log({ data })
        //    await  api.updateUser(data)
    }

    console.log({ errors });

    const nameRegister = {
        required: {
            value: isRequired,
            message: 'Введите имя'
        },
        maxLength: { value: 4, message: '4 is max' },
        minLength: { value: 2, message: '2 is min' },
    }
    const emailRegister = { required: 'Введите эл.адрес' }
    const passwordRegister = {
        required: {
            value: isRequired,
            message: 'Введите пароль'
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Пароль должен содержать минимум 8 символов, одну большую букву латинского алфавита и одну цифру'
        }
    }


    return (
        <div className="form__wrapper" >
            <h3>Регистрация</h3>
            <form className="form" onSubmit={handleSubmit(sendData)}>

                <div>
                    <input className="form__input" type="text" {...register("name", nameRegister)} placeholder="Имя" />
                    {errors?.name && <span> {errors?.name.message}</span>}
                </div>
                <div>
                    <input className="form__input" type="text" {...register("email", { ...emailRegister })} placeholder="email" />
                    {errors?.email && <span> {errors?.email.message}</span>}
                </div>
                <div className="form__pass">
                    <input className="form__input" type={!type ? 'password' : 'text'} {...register("password", { ...passwordRegister })} placeholder="Пароль" />
                    {errors?.password && <span> {errors?.password.message}</span>}
                </div>
                <button type="submit">Отправить</button>
            </form>
        </div>
    )
}