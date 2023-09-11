import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);
    const isOwner = card.owner === currentUser.id;
    
    const isLiked = card.likes.some(i => i._id === currentUser.id);
        
    const cardLikeButtonClassName = `element__button-like ${isLiked && 'element__button-like_type_active'}`;

    const handleCardClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {

        onCardDelete(card);
    }

    return (

        <div className="element">
            <div className="element__icon">
                <img src={card.link} alt={card.name} onClick={handleCardClick} className="element__image" />
                {isOwner && (
                    <button type="button" className="element__button-trash" onClick={handleDeleteClick} />
                )}

            </div>
            <div className="element__description">
                <h3 className="element__name">{card.name}</h3>
                <div className="element__likes">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <div className="element__counter">{card.likes.length}</div>
                </div>

            </div>
        </div>
    )
}