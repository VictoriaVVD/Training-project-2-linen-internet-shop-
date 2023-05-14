import React from "react";
import classes from 'classnames';
import "./style.scss";
import { RegisterForm } from "../Form/RegisterForm";



export const Modal = ({modalActive, setModalActive, children}) => {

    return (
        <div className={classes("modal", {'active': modalActive})}>
            <div className={classes("modal__content", {'active': modalActive})}>
                <div className="modal__close" onClick={() => setModalActive(false)}>X</div>
                {/* <Authorization /> */}
                {children}
            </div>
        </div>
    )
}