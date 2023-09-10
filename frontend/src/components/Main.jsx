import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards, userEmail, onSignOut }) {

    const currentUser = useContext(CurrentUserContext);

    return (

        <>
            <Header>
                <div className="header__container">
                    <p className="header__email">{userEmail}</p>
                    <Link to='/signout' onClick={onSignOut} className="header__link">Выйти</Link>

                </div>
            </Header>

            <main>

                <section className="profile page__profile">

                    <button className="profile__avatar-hover" type="button" onClick={onEditAvatar}>
                        <img type="button" className="profile__avatar" name="link" src={currentUser?.avatar}
                            alt="Уменьшенная фотография профиля" />
                    </button>

                    <div className="profile__info">
                        <div className="profile__title">
                            <h1 className="profile__name">{currentUser?.name}</h1>
                            <button type="button" aria-label="Кнопка редактирования профиля"
                                className="profile__edit-button" onClick={onEditProfile}></button>
                        </div>

                        <p className="profile__description">{currentUser?.description}</p>
                    </div>

                    <button type="button" aria-label="Кнопка добавления" className="profile__add-button" onClick={onAddPlace}></button>
                </section>

                <section className="elements page__elements">

                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        ></Card>
                    ))}

                </section>
            </main></>
    )

}

export default Main;