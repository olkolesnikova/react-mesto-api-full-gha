import { usePopupClose } from "./hooks/usePopupClose"

export default function ImagePopup({card, onClose}) {

    usePopupClose(card?.link, onClose);

    return (

        <section className={`popup popup-open-image ${card && 'popup_opened'}`}>
            <div className="popup__container popup__container_type_image">

                <button type="button" className="popup__close" onClick={onClose}></button>

                <figure className="popup__figure">
                    <img role="button" src={card?.link} className="popup__zoom-image"
                        alt={card?.link} />
                    <figcaption className="popup__image-caption">{card?.name}</figcaption>
                </figure>

            </div>
        </section>
    )
}