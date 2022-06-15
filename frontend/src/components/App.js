import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import {useEffect, useState} from "react";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import * as auth from '../utils/auth'
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";


function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isImagePreviewPopupOpen, setIsImagePreviewPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [cardToDelete, setCardToDelete] = useState('');

  function logError(err) {
    console.log(err);
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn)
      api.getUser()
        .then(user => {
          setCurrentUser(user.data);

          api.getCards()
            .then((cardsResultList) => {
              setCards(cardsResultList.data);
            })
            .catch(logError);
        })
        .catch(logError);
  }, [isLoggedIn])

  const clearData = () => {
    setCurrentUser({});
    setUserEmail('');
    setCards([]);
    setIsLoggedIn(false);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddCardClick = () => {
    setIsAddCardPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setIsImagePreviewPopupOpen(true);
  }

  function handleCardDeleteClick(cardID) {
    setCardToDelete(cardID);
    setIsDeleteCardPopupOpen(true);
  }


  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? newCard.data : item));
      })
      .catch(logError);
  }

  const handleUpdateUser = (user) => {
    return api.setUser(user.name, user.about)
      .then(res => {
        setCurrentUser(res.data);
      });
  }

  const handleUpdateAvatar = (avatar) => {
    return api.setAvatarPicture(avatar)
      .then(res => {
        setCurrentUser(res.data);
      });
  }

  const handleAddPlace = (card) => {
    return api.addCard(card.name, card.link)
      .then(newCard => {
        setCards([newCard.data , ...cards]);
      });
  }

  function handleCardDelete(cardID) {
    return api.deleteCard(cardID)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== cardID));
      });
  }

  const handleRegister = (password, email) => {
    return auth.register(password, email)
      .then((res) => {
        if (res) setIsRegisterSuccess(true);
        else setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
        return res;
      })
  }

  const handleLogin = (password, email) => {
    return auth.authorize(password, email)
      .then((res) => {
        if (res) {
          api.updateToken(res.token)
          setIsLoggedIn(true)
          setUserEmail(email);

        }
        return res;
      })
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setUserEmail(res.data.email);
            props.history.push('/');
          }
        });
    }
  }


  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);

    setSelectedCard({name: '', link: ''});
    setIsImagePreviewPopupOpen(false);
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header
            email={userEmail}
            isLoggedIn={isLoggedIn}
            onLogout={clearData}/>
          <Switch>
            <Route path="/signin">
              <Login
                onSubmit={handleLogin}/>
            </Route>
            <Route path="/signup">
              <Register
                onSubmit={handleRegister}/>
            </Route>
            <ProtectedRoute path="/" loggedIn={isLoggedIn}>
              <Main
                cards={cards}
                onEditAvatarClick={handleEditAvatarClick}
                onEditProfileClick={handleEditProfileClick}
                onAddCardClick={handleAddCardClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteClick}/>
            </ProtectedRoute>
          </Switch>
          <Footer/>
        </div>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isRegisterSuccess}/>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}/>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}/>
        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onAddPlace={handleAddPlace}
          onClose={closeAllPopups}/>
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          cardToDelete={cardToDelete}
          onDeleteCard={handleCardDelete}
          onClose={closeAllPopups}/>
        <ImagePopup
          isOpen={isImagePreviewPopupOpen}
          selectedCard={selectedCard}
          onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
