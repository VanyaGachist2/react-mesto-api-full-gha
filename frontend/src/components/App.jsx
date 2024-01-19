import complete from '../images/yes.svg';
import error from '../images/no.svg';

import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import { api } from "../utils/Api.js";
import ImagePopup from "./ImagePopup.jsx";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddCardPopup from "./AddCardPopup.jsx";
import { Route, Routes, useNavigate } from "react-router";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import { authApi } from "../utils/Auth.js";
import InfoTooltip from './InfoTooltip.jsx';
import DeletePopup from './DeletePopup.jsx';

function App() {

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);

  const [userData, setUserData] = useState({})
  const [userMail, setUserMail] = useState('');

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);

  const [deletePopup, setDeletePopup] = useState(null);

  const [avatarStatusRegisterPopup, setAvatarStatusRegisterPopup] = useState(null);
  const [statusRegisterPopup, setStatusRegisterPopup] = useState(false);
  const [textStatusRegisterPopup, setTextStatusRegisterPopup] = useState('');

  const [statusTextForApi, setStatusTextForApi] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = (email, password) => {
    setStatusTextForApi(true);
    authApi.registration(email, password)
      .then(() => {
        setStatusRegisterPopup(true);
        setTextStatusRegisterPopup('Вы успешно зарегистрировались!');
        setAvatarStatusRegisterPopup(complete);
        navigate("/sign-in", {replace: true});
      })
      .catch((err) => {
        setStatusRegisterPopup(true);
        setTextStatusRegisterPopup('Что-то пошло не так! Попробуйте ещё раз.');
        setAvatarStatusRegisterPopup(error);
        console.log(err);
      })
      .finally(() => {
        setInterval(() => {
          setStatusTextForApi(false);
        }, 1000)
      });
  }

  const handleLogin = (email, password) => {
    setStatusTextForApi(true);
    authApi.Login(email, password)
      .then((res) => {
        if(res) {
          localStorage.setItem('jwt', res.token);
          setUserMail(email);
          setLoggedIn(true);
          navigate("/", {replace: true});
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInterval(() => {
          setStatusTextForApi(false);
        }, 800)
      });
  }

  const handleCheckToken = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      authApi.checkToken(jwt)
        .then((res) => {
          if(res) {
            setUserMail(res.data.email);
            setLoggedIn(true)
            navigate('/', {replace: true});
          }
        })
    }
  }

  useEffect(() => {
    handleCheckToken();
  }, []);


  const handleExit = () => {
    localStorage.removeItem('jwt');
    setUserMail('');
    navigate('/sign-in', {replace: true});
  }

  useEffect(() => {
    if(loggedIn) {
      api.getInfo()
      .then((data) => {
        setUserData(data)
      })
      .catch((err) => {
        console.log(err);
      });
    api.getCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [loggedIn])

  const handleOpenEditPopup = () => {
    setIsEditPopupOpen(true);
  }

  const handleOpenAddPopup = () => {
    setIsAddPopupOpen(true);
  }

  const handleOpenAvatarPopup = () => {
    setIsAvatarPopupOpen(true);
  }

  const handleOpenFullImageCard = useCallback((title, image) => {
    setSelectedCard({title, image})
  }, []);

  const handleDeletePopupOpen = (card) => {
    setDeletePopup(card);
  }


  // Закрытие попапов по клику за область и по нажатию на кнопку escape
  useEffect(() => {
    const handleCloseEscape = (evt) => {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    const handleCloseToClick = (evt) => {
      if(evt.target.classList.contains('popup')) {
        closeAllPopups();
      }
    }

    window.addEventListener('keydown', handleCloseEscape);
    document.addEventListener('click', handleCloseToClick);

    return () => {
      window.removeEventListener('keydown', handleCloseEscape);
      document.removeEventListener('click', handleCloseToClick);
    }
  }, [])

  function closeAllPopups() {
    setIsAddPopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsEditPopupOpen(false);
    setSelectedCard(null);
    setStatusRegisterPopup(false);
    setDeletePopup(null);
  }


  function handleCardDelete (card) {
    setStatusTextForApi(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInterval(() => {
          setStatusTextForApi(false);
        }, 800)
      })
  }

  function handleUptadeUserInfo(userData) {
    setStatusTextForApi(true);
    api.editProfile(userData.name, userData.about)
      .then((newUser) => {
        setUserData(newUser)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInterval(() => {
          setStatusTextForApi(false);
        }, 800)
      });
  }

  function handleUpdateAvatarForPage (data) {
    setStatusTextForApi(true);
    api.changeAvatar(data)
      .then((d) => {
        setUserData(d);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInterval(() => {
          setStatusTextForApi(false);
        }, 800)
      });
  }

  function handleAddCard (data) {
    setStatusTextForApi(true);
    api.addCard(data)
     .then((newCards) => {
      setCards((cards) => [newCards, ...cards]);
      closeAllPopups();
     })
     .catch((err) => {
      console.log(err);
     })
     .finally(() => {
      setInterval(() => {
        setStatusTextForApi(false);
      }, 800)
    });
  }

  function  handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === userData._id);
    const checkLike = !isLiked ? api.addLiked(card._id) : api.deleteLike(card._id);
    checkLike
      .then((newCard) => {
        setCards((newCards) =>
          newCards.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
      console.log(err);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={userData}>
        <EditProfilePopup
        isOpen={isEditPopupOpen}
        onClose={closeAllPopups}
        updateInfo={handleUptadeUserInfo}
        statusText={statusTextForApi}
        />
        <EditAvatarPopup
        isOpen={isAvatarPopupOpen}
        onClose={closeAllPopups}
        updateAvatar={handleUpdateAvatarForPage}
        statusText={statusTextForApi}
        />
        <AddCardPopup
        isOpen={isAddPopupOpen}
        onClose={closeAllPopups}
        addCard={handleAddCard}
        statusText={statusTextForApi}
        />
        <ImagePopup
          card={selectedCard}
          isClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={statusRegisterPopup}
          onClose={closeAllPopups}
          logo={avatarStatusRegisterPopup}
          name={textStatusRegisterPopup}
       />
       <DeletePopup
        card={deletePopup}
        deleteCard={handleCardDelete}
        isOpen={deletePopup}
        onClose={closeAllPopups}
        statusText={statusTextForApi}
       />
        <Header mail={userMail} exit={handleExit} />
        <>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                avatarPopup={handleOpenAvatarPopup}
                editPopup={handleOpenEditPopup}
                addPopup={handleOpenAddPopup}
                cards={cards}
                userData={userData}
                imagePopup={handleOpenFullImageCard}
                onDelete={handleDeletePopupOpen}
                onLike={handleCardLike}
              />
            } />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} statusText={statusTextForApi} />} />
            <Route path="/sign-up" element={<Register handleRegister={handleRegistration} statusText={statusTextForApi} />} />
          </Routes>
        </>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
