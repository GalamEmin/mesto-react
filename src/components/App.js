// import './App.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopup() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setConfirmDeletePopupOpen(false);
  }

  function handleUpdateUser(userData) {
    Api.setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(userData) {
    Api.setUserAvatar(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card))
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    Api.addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    Api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, [setCurrentUser]);

  React.useEffect(() => {
    Api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, [setCards]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          cards={cards}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
        />
        <Footer />
      </div>
      
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopup}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopup}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopup}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <PopupWithForm
        name="delete-element"
        title="Вы уверены?"
        buttonTitle="Да"
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopup}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopup}
      />
    </ CurrentUserContext.Provider>
  );
}

export default App;
