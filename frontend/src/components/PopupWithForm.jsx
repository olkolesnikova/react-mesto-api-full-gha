export default function PopupWithForm({ title, name, children, buttonText, isOpen, onClose, onCloseByOverlay, onSubmit }) {


    return (

        <section className={`popup ${name + (isOpen && ' popup_opened')}`} onClick={onCloseByOverlay}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose} />
                <h1 className="popup__title">{title}</h1>
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__submit">{buttonText}</button>
                </form>

            </div>

        </section>
    )

}