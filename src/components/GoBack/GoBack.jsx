
import { useNavigate } from "react-router-dom";
import "./style.scss";


export const GoBack = () => {
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate(-1);
    }
    return (
        <span className="back_el" onClick={() => goBack()}>{'<'} Назад</span>
    )
}
