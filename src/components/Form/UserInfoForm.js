import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/slices/userSlice";

export const UserInfoForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({mode: "onSubmit"});
    
    const {data: user} = useSelector(s => s.user);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(updateUser())
    // }, [dispatch])
    const sendData = (data) => {
        console.log({data});
        dispatch(updateUser(data));
        reset()
    }
    const changeInput = (e) => {

    }

    return (
        <div className="form__wrapper" >
            <h3>Личный кабинет</h3>
            <div className="form__content">
                <form className="form" onSubmit={handleSubmit(sendData)}>
                    <div>
                        <img className="form__image" src={user.avatar} alt="user-avatar" />
                        <input className="form__input" type="text" defaultValue={user.avatar} />
                    </div>
                    <button className="form__btn"  type="submit">Изменить аватар</button>
                </form>
                <form className="form" onSubmit={handleSubmit(sendData)}>
                    <div className="form__content_info">
                        <div className="form__input_changing">
                            <input className="form__input" type="text" {...register("name")} placeholder="Имя" defaultValue={user.name} />
                            <div className="form__input_changing_btn" onClick={changeInput}><FontAwesomeIcon icon={faPenToSquare} /></div>
                        </div>
                        <div className="form__input_changing">
                            <input className="form__input" type="text" {...register("about")} placeholder="О себе" defaultValue={user.about} />
                            <div className="form__input_changing_btn" onClick={changeInput}><FontAwesomeIcon icon={faPenToSquare} /></div>
                        </div>
                        <div>
                            <input className="form__input" type="text" {...register("group")} placeholder="Номер группы" value={user.group} />
                        </div>
                        <div>
                            <input className="form__input" type="email" {...register("email")} placeholder="email" value={user.email} />
                        </div>
                    </div>
                    <button className="form__btn"  type="submit">Изменить</button>
                </form>
            </div>
        </div>
    )
}
