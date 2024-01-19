

function PopupWithForm({ title, isOpen, name, click, buttonText, onClose, onSubmit, children }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
            {children}
            <button type="submit" className={`popup__button popup__${click}`}>{buttonText}</button>
          </form>
          <button type="button" className="popup__close" onClick={onClose}></button>
        </div>
      </div>
  )
}

export default PopupWithForm;
