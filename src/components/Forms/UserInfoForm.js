import React from "react";
import { useForm } from "react-hook-form";import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateUser } from "../../store/slices/userSlice";

export const UserInfoForm = () => {

    const { register, handleSubmit } = useForm({mode: "onSubmit"});
    const {data: user} = useSelector(s => s.user);
    const dispatch = useDispatch();
    const sendData = (data) => {
        dispatch(fetchUpdateUser(data));
    };

    return (
        <form className="form" onSubmit={handleSubmit(sendData)}>
                    <div className="form__content">
                        <div className="form__content_image">
                            <img className="form__image" src={user?.avatar} alt="user-avatar" />
                            <figcaption>Ссылка на изображение</figcaption>
                            <div className="form__pass">
                                <input className="form__input" type="text" 
                                    {...register("avatar")} 
                                    defaultValue={user.avatar}                                         
                                />
                            </div>
                        </div>
                        <div className="form__content_info">
                            <div className="form__input_block">
                                <label>Имя</label>
                                <input className="form__input_profile" type="text" 
                                    {...register("name")} 
                                    defaultValue={user.name} 
                                />
                            </div>
                            <div className="form__input_block">
                                <label>О себе</label>
                                <input className="form__input_profile" type="text" 
                                    {...register("about")} 
                                    defaultValue={user.about}
                                />
                            </div>
                            <div className="form__input_block">
                                <label>Номер группы</label>
                                <input className="form__input_profile" type="text" 
                                    {...register("group")} 
                                    defaultValue={user.group} 
                                />
                            </div>
                            <div className="form__input_block">
                                <label>email</label>
                                <input className="form__input_profile" type="email" 
                                    {...register("email")} 
                                    defaultValue={user.email} 
                                />
                            </div>
                            <button className="form__btn"  type="submit">Изменить</button>
                        </div>
                    </div>
            </form>
    )
}

