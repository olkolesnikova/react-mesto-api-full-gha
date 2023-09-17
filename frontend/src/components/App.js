import '../../src/index.css';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect, useMemo } from 'react';
import { api } from '../utils/Api';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';
import Cookies from 'js-cookie';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);
    const [cards, setCards] = useState([]);

    const [selectedCard, setSelectedCard] = useState(null);

    const [loggedIn, setLoggedIn] = useState(false);
    const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const navigate = useNavigate();

    useEffect(() => {

        api.getUserInfo()
            .then((currentUser) => {
                console.log(currentUser);
                setCurrentUser({
                    name: currentUser.name,
                    description: currentUser.about,
                    avatar: currentUser.avatar,
                    id: currentUser._id
                })
            })
            .catch(console.error)
    }, [loggedIn])

    useEffect(() => {

        api.getCards()
            .then((cards) => {

                setCards(cards);

            })
            .catch(console.error)
    }, [loggedIn])



    const isAnyPopupOpen = useMemo(() => {
        return isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen || isInfoTooltipOpen
    }, [
        isEditProfilePopupOpen,
        isAddPlacePopupOpen,
        isEditProfilePopupOpen,
        isImagePopupOpen,
        isInfoTooltipOpen

    ])

    useEffect(() => {

        if (!isAnyPopupOpen) return;

        function closePopupByEsc(event) {
            if (event.key === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', closePopupByEsc);

        return () => {
            document.removeEventListener('keydown', closePopupByEsc);
        };
    }, [isAnyPopupOpen])

    const [isLoading, setIsLoading] = useState(false);

    function handleEditProfileClick() {

        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {

        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {

        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {

        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsInfoTooltipOpen(false)
        setSelectedCard(null);
    }

    /* function closePopupByOverlay(event) {
        if (event.target === event.currentTarget) {
            closeAllPopups();
        }
    } */

    function handleCardLike(card) {

        const isLiked = card.likes.some((i) => i === currentUser.id);
       console.log(isLiked);        
        if (!isLiked) {
            api.addLike(card._id)
                .then((newCard) => {

                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
                })

                .catch(console.error)


        } else {
            api.deleteLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
                })
                .catch(console.error)
        }

    }

    function handleUpdateUser(data) {

        api.editProfileData(data)
            .then((data) => {

                setCurrentUser({
                    name: data.name,
                    description: data.about,
                    avatar: data.avatar,
                    id: data._id
                })

                closeAllPopups();
            })
            .catch(console.error);
    }

    function handleUpdateAvatar(avatar) {

        api.updateUserAvatar(avatar)
            .then((data) => {
                setCurrentUser({
                    name: data.name,
                    description: data.about,
                    avatar: data.avatar,
                    id: data._id
                })

                closeAllPopups();
            })
            .catch(console.error);
    }

    function handleAddPlaceSubmit(data) {

        const newCard = api.addNewCard(data)

            .then((newCard) => {

                setCards((cards) => [newCard, ...cards]);
                closeAllPopups();
            })
            .catch(console.error);
    }

    function handleCardDelete(card) {

        api.deleteCard(card._id)
            .then(() => {

                setCards((cards) => cards.filter((c) => c._id !== card._id))
            })
            .catch(console.error);
    }

    useEffect(() => {
        tokenCheck();
    }, [])


    const tokenCheck = () => {

        const jwt = Cookies.get('jwt');

        if (jwt) {
            auth.getContent(jwt)
                .then((data) => {

                    setLoggedIn(true);
                    setUserEmail(data.email);
                    navigate('/');

                })
                .catch(console.error)
        }

    }

    function handleRegister({ email, password }) {

        auth.register({ email, password })
            .then((res) => {
                if (!res || res.status === 400) {
                    setIsInfoTooltipOpen(true);
                    setIsSuccessRegistration(false)
                    console.log(res);
                    return res.data;
                }
                else {
                    setIsInfoTooltipOpen(true);
                    setIsSuccessRegistration(true);

                    console.log(res);
                    navigate('/signin');
                }

            })
            .catch(console.error)
    }

    function handleLogin({ email, password }) {

        if (!email || !password) return;

        auth.authorize({ email, password })
            .then((data) => {
                console.log(data);
                if (data) {
                    setUserEmail(email);
                    setLoggedIn(true);
                    navigate('/');
                }
            })
            .catch(console.error)
    }

    function handleSignOut() {

        Cookies.remove('jwt');
        setUserEmail('');
        setLoggedIn(false);
    }

    return (

        <CurrentUserContext.Provider value={currentUser}>

            <div className="page">

                <Routes>

                    <Route path="/signin" element={<Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<Register onLogin={handleRegister} />} />
                    
                    <Route path="/" element={
                        <ProtectedRoute loggedIn={loggedIn}>

                            <Main
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                                userEmail={userEmail}
                                onSignOut={handleSignOut}
                            />
                            <Footer />
                        </ProtectedRoute>
                    } />

                </Routes>



            </div>

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isLoading={isLoading}
            />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading}
            />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                isLoading={isLoading}
            />

            <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopups}
                isSuccesRegistration={isSuccessRegistration}
            />

            <PopupWithForm name="popup-with-confirmation" title="Вы уверены?" formName="popup-with-confirmation">

                <button type="submit" className="popup__submit">Да</button>

            </PopupWithForm>

            <ImagePopup card={selectedCard} onClose={closeAllPopups} />




        </CurrentUserContext.Provider>

    );
}

export default App;
