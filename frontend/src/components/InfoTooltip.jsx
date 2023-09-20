import resultImageSuccess from "../images/Union.png"
import resultImage from "../images/UnionRed.png"
import { usePopupClose } from "./hooks/usePopupClose";

export default function InfoTooltip({ isOpen, onClose, isSuccesRegistration }) {

    usePopupClose(isOpen, onClose);

    return (

        <section className={`popup ${isOpen && ' popup_opened'}`}>
            <div className="popup__container popup__container-login">
            <button type="button" className="popup__close" onClick={onClose} />
                <img alt="" src={isSuccesRegistration ? resultImageSuccess : resultImage} className="popup__result-image"/>
                <p className="popup__result-registration">{isSuccesRegistration ? 'Вы успешно зарегистрировались' 
            : 'Что-то пошло не так! Попробуйте еще раз.'    
            }</p>
            </div>
        </section>
    )

}