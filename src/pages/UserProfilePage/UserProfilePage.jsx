import React, { useEffect } from "react";
import "./style.scss";
import { useDispatch} from "react-redux";
import { fetchGetUser } from "../../store/slices/userSlice";
import { GoBack } from "../../components/GoBack/GoBack";
import { TabsMenuForProfile } from "../../components/Tabs/TabsMenuForProfile";

export const UserProfilePage = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchGetUser())
    }, [dispatch]); 

    return (
        <div className="profile">
            <div className="profile__wrapper">
                <GoBack />
                <h1>Личный кабинет</h1>
                <TabsMenuForProfile  />
            </div>
        </div>
    )
}
