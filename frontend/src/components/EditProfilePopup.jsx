import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, updateInfo, statusText }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  const changeName = (evt) => {
    setName(evt.target.value);
  }

  const changeAbout = (evt) => {
    setDescription(evt.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleUpdateInformation = (evt) => {
    evt.preventDefault();

    updateInfo({
      name,
      about: description
    })
  }

  return (
    <PopupWithForm
          title="Редактировать профиль"
          isOpen={isOpen}
          name="edit"
          click="save"
          buttonText={statusText ? 'Сохранение...' : 'Сохранить'}
          onClose={onClose}
          onSubmit={handleUpdateInformation}
          >
          <label className="popup__label">
            <input
              type="text"
              id="username"
              name="input_name"
              value={name}
              className="popup__input popup__input_text_name"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40"
              onChange={changeName}
              />
            <span className="popup__error popup__error-username"></span>
          </label>
          <label className="popup__label">
            <input
              type="text"
              id="job"
              name="input_job"
              value={description}
              className="popup__input popup__input_text_after"
              placeholder="Должность"
              minLength="2"
              maxLength="200"
              required
              onChange={changeAbout}
              />
            <span className="popup__error popup__error-job"></span>
          </label>
        </PopupWithForm>
  )
}

export default EditProfilePopup;
