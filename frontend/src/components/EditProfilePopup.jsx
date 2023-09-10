import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { usePopupClose } from "./hooks/usePopupClose";
import { useForm } from "./hooks/useForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

    const currentUser = useContext(CurrentUserContext);
    const {values, handleChange, setValues} = useForm({name: "", description: ""});

    /* const [name, setName] = useState(null);
    const [description, setDescription] = useState(null); */

    usePopupClose(isOpen, onClose);

    /* function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    } */

    function handleSubmit(e) {

        e.preventDefault();
        onUpdateUser({
            name: values.name,
            description: values.description
        });
    }

    useEffect(() => {
        setValues({ name: currentUser?.name, description: currentUser?.description});
        
    }, [currentUser, isOpen])

    

    return (

        <PopupWithForm name="popup-edit-profile" title="Редактировать профиль" formName="popup-edit-profile"
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}>

            <input id="profile-name" type="text" name="name" className="popup__input popup__input_type_name"
                placeholder='Имя'
                value={values.name || ''}
                onChange={handleChange}
                minLength={2}
                maxLength={30}
                required />
            <span className="profile-name-error popup__input-error"></span>
            <input id="description" type="text" name="description"
                className="popup__input popup__input_type_description"
                placeholder='О себе'
                value={values.description || ''}
                onChange={handleChange}
                minLength={2}
                maxLength={30}
                required/>
                
            <span className="description-error popup__input-error"></span>
            

        </PopupWithForm>

    )
}