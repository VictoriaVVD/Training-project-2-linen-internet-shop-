import React, { useEffect } from "react";
import { UserInfoForm } from "../../components/Form/UserInfoForm";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetUser, fetchUpdateUser } from "../../store/slices/userSlice";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

export const UserProfilePage = () => {
    // const dispatch = useDispatch()
    // // const {user} = useContext(CardContext)
    // const {data: user, loading} = useSelector(s => s.user)
    // useEffect(() => {
    //     dispatch(getUser())
    // }, [dispatch])

    const { register, handleSubmit, formState: { errors }, reset } = useForm({mode: "onSubmit"});
    
    const {data: user, loading} = useSelector(s => s.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchGetUser())
    }, [dispatch])
    const sendData = (data) => {
        dispatch(fetchUpdateUser(data));
        reset()
    }
    const changeInput = (e) => {

    }

    return (
        <>
        {loading || !user._id ? "LOADING" :
        <div className="form__wrapper" >
            <h3>Личный кабинет</h3>
            <div className="form__content">
                <form className="form" onSubmit={handleSubmit(sendData)}>
                    <div>
                        <img className="form__image" src={user?.avatar} alt="user-avatar" />
                        <div>
                            <input className="form__input" type="text" {...register("avatar")} placeholder="Аватар" defaultValue={user.avatar} />
                        </div>
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
        </div>}
        </>
    )


    // return (
    //     <div className="user__account">
    //         <div className="user__account_wrapper">
    //         {loading || !user._id 
    //         ? "LOADING"
    //         : <UserInfoForm />}
    //         </div>
    //     </div>
    // )
}

// user
// : 
// about
// : 
// "Студент гр.12"
// avatar
// : 
// "https://react-learning.ru/image-compressed/default-image.jpg"
// email
// : 
// "pinchukovavictoria@gmail.com"
// group
// : 
// "group-12"
// name
// : 
// "Victoria Dudkina"
// __v
// : 
// 0
// _id
// : 
// "64416c303291d790b3fc22b3"