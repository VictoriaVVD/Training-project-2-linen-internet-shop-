import React, { useCallback } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { AuthorizationForm } from "../Forms/AuthorizationForm";
import { RegisterForm } from "../Forms/RegisterForm";
import { ForgotPassForm } from "../Forms/ForgotPassForm";
import { AddPostForm } from "../Forms/AddPostForm";
import { AddProductForm } from "../Forms/AddProductForm";
import { ReviewForm } from "../Forms/ReviewForm";
import { CommentForm } from "../Forms/CommentForm";
import { UpdateProductForm } from "../Forms/UpdateProductForm";
import { UpdatePostForm } from "../Forms/UpdatePostForm";
import { setModalOpen } from "../../store/slices/modalSlice";
import { Warning } from "../Warning/Warning";


export const Modal = () => {

    const {isModalOpened, path} = useSelector(s => s.modal);
    const dispatch = useDispatch();

    const changeModalChildren = useCallback((path) => {
            switch(path) {
                case "/signin": return <AuthorizationForm />;
                case "/signup": return <RegisterForm />;
                case "/forgot_password": return <ForgotPassForm />;
                case "newProduct": return <AddProductForm />;
                case "newPost": return <AddPostForm />;
                case "newReview": return <ReviewForm />;
                case "newComment": return <CommentForm />;
                case "updateProduct": return <UpdateProductForm />;
                case "updatePost": return <UpdatePostForm />;
                case "warning": return <Warning />;
                default: return;
            }
    }, [])


    return (
        isModalOpened &&
            <div className="modal active" id="modal">
                <div className="modal__content active">
                    <div className="modal__close" onClick={() => dispatch(setModalOpen(false))}>X</div>
                    {changeModalChildren(path)}
                </div>
            </div>
    )
}