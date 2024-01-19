import PopupWithForm from "./PopupWithForm";

function DeletePopup({ card, deleteCard, isOpen, onClose, statusText }) {

  const handleSubmit = (evt) => {
    evt.preventDefault();

    deleteCard(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      isOpen={isOpen}
      name="deletePopup"
      click="delete"
      buttonText={statusText ? 'Удаление...' : 'Да'}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={<></>}
    />
  )
}

export default DeletePopup;
