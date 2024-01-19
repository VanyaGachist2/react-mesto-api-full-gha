import { useState } from "react";
import PopupWithForm from "./PopupWithForm.jsx";

function AddCardPopup({ isOpen, onClose, addCard, statusText }) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const getName = (evt) => {
    setName(evt.target.value);
  }

  const getLink = (evt) => {
    setLink(evt.target.value);
  }

  const handleAddCard = (evt) => {
    evt.preventDefault();

    addCard({
      name: name,
      link: link
    })
  }

  return (
    <PopupWithForm
          title="Новое Место"
          isOpen={isOpen}
          name="add"
          click="save"
          buttonText={statusText ? 'Создание...' : 'Создать'}
          onClose={onClose}
          onSubmit={handleAddCard}
          >
          <label className="popup__label">
            <input
              type="text"
              id="name-image"
              name="input_name_second"
              className="popup__input popup__input_text_name-image"
              placeholder="Название"
              value={name}
              required
              minLength="2"
              maxLength="30"
              onChange={getName}
              />
            <span className="popup__error popup__error-name-image"></span>
          </label>
          <label className="popup__label">
            <input type="url"
              id="href-image"
              name="input_image"
              className="popup__input popup__input_href-image"
              placeholder="Ссылка на картинку"
              value={link}
              required
              onChange={getLink}
              />
            <span className="popup__error popup__error-href-image"></span>
          </label>
        </PopupWithForm>
  )
}

export default AddCardPopup;
