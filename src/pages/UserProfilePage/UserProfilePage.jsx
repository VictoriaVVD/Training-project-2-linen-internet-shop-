import React, { useContext, useEffect, useState } from "react";
import { UserInfoForm } from "../../components/Form/UserInfoForm";
import "./style.scss";
import { apiUser } from "../../assets/api/apiUser";
import { CardContext } from "../../context/cardContext";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/slices/userSlice";

export const UserProfilePage = () => {
    const dispatch = useDispatch()
    // const {user} = useContext(CardContext)
    const {data} = useSelector(s => s.user)
    console.log({data});
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    return (
        <div className="user__account">
            <div className="user__account_wrapper">
                <div className="user__account_avatar">
                    <img src={data?.avatar} alt="user-avatar" />
                    <span onClick={() => {}}>Изменить аватар</span>
                </div>
                <div className="user__account_info">
                    <div>{data?.name}</div>
                    <div>{data?.email}</div>
                    <div>{data?.group}</div>
                    <div>{data?.about}</div>
                </div>
            </div>
        </div>
    )
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