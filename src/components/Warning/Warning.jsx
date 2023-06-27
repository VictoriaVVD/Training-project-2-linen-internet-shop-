import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { setModalOpen, setStateByPath } from "../../store/slices/modalSlice";
import { useDispatch } from "react-redux";

export const Warning = () => {

    const dispatch = useDispatch();

    const signIn = () => {
        dispatch(setModalOpen(true));
        dispatch(setStateByPath("/signin"))
    }
    const signUp = () => {
        dispatch(setModalOpen(true));
        dispatch(setStateByPath("/signup"))
    }

    return (
        <div className="warning__wrapper">
            <h3>Доступ только авторизованным пользователям!</h3>
            <p>
                <Link className="warning__link" onClick={signIn}>Авторизуйтесь </Link> 
                или пройдите 
                <Link className="warning__link" onClick={signUp}> регистрацию</Link>
            </p> 
        </div>
    )
}