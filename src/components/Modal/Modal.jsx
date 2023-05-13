import React from "react";
import classes from 'classnames';
import "./style.scss";
import { Form } from "../Form/Form";


export const Modal = ({modalActive, setModalActive, children}) => {

    return (
        <></>
        // <div className={classes("modal", {'active': modalActive})}>
        //     <div className={classes("modal__content", {'active': modalActive})}>
        //         <div className="modal__close" onClick={() => setModalActive(false)}>X</div>
        //         {children}
        //     </div>
        // </div>
    )
}