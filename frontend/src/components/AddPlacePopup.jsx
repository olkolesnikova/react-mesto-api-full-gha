import { useState, useEffect } from "react"
import PopupWithForm from "./PopupWithForm";
import { usePopupClose } from "./hooks/usePopupClose";
import { useForm } from "./hooks/useForm";

export default function AddPopupPlace({ isOpen, onClose, onAddPlace, isLoading }) {

    /* const [name, setName] = useState('');
    const [link, setLink] = useState(''); */

    const {values, handleChange, setValues} = useForm({name: "", link: ""});

    usePopupClose(isOpen, onClose);

    /* function handleCardTitleChange(e) {

        setName(e.target.value);
    }

    function handleCardLinkChange(e) {
        setLink(e.target.value);
    } */

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: values.name,
            link: values.link
        })
    }

    useEffect(() => {
        
        setValues({name: "", link: ""});

    }, [isOpen]);


    return (

        <PopupWithForm name="popup-add-card" title="Новое место" formName="popup-add-card"
            isOpen={isOpen} onClose={onClose}
            onSubmit={handleSubmit}
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}>

            <input id="title" type="text" name="name" className="popup__input popup__input_type_title"
                placeholder="Название"
                minLength={2}
                maxLength={30}
                value={values.name}
                onChange={handleChange} />
            <span className="title-error popup__input-error"></span>
            <input id="link" type="url" name="link" className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку"
                value={values.link}
                onChange={handleChange}
                required />
            <span className="link-error popup__input-error"></span>


        </PopupWithForm>
    )


}