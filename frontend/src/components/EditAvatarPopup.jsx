import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";
import { usePopupClose } from "./hooks/usePopupClose";


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

    const refLink = useRef();

    usePopupClose(isOpen, onClose);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({

            avatar: refLink.current.value
        })

    }

    useEffect(() => {
        
        refLink.current.value = '';
    }, [isOpen])


    return (

        <PopupWithForm name="popup-edit-avatar" title="Обновить аватар" formName="popup-edit-avatar"
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}>

            <input id="link-avatar" type="url" className="popup__input popup__input_type_link" name="avatar"
                placeholder="Новая ссылка" required="" ref={refLink} />
            <span className="link-avatar-error popup__input-error"></span>

        </PopupWithForm>
    )

}