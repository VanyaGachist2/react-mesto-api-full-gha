import PopupWithForm from "./PopupWithForm.jsx";
import { useRef } from "react";

function EditAvatarPopup ({ isOpen, onClose, updateAvatar, statusText}) {

  const avatarRef = useRef('');

  const handleUpdateAvatar = (evt) => {
    evt.preventDefault();

    const avatarValue = avatarRef.current.value;

    updateAvatar({
      avatar: avatarValue
    })

  }

  return (
    <PopupWithForm
          title="Обновить аватар"
          isOpen={isOpen}
          name="avatar"
          click="save"
          buttonText={statusText ? 'Сохранение...' : 'Сохранить'}
          onClose={onClose}
          onSubmit={handleUpdateAvatar}
          >
          <label className="popup__label popup__label_one">
            <input
              type="url"
              id="href-avatar"
              name="input_avatar"
              className="popup__input popup__input_href-avatar"
              placeholder="ссылка на аватарку"
              required
              ref={avatarRef}
              />
            <span className="popup__error popup__error-href-avatar"></span>
          </label>
        </PopupWithForm>
  )
}


export default EditAvatarPopup;
