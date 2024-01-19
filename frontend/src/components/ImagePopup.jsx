function ImagePopup({card, isClose}) {
  return (
    <div className={`popup popup_full ${card ? 'popup_opened' : ''}`}>
      <div className="popup__overlay">
        <img className="popup__image" alt={card?.title} src={card?.image} />
        <p className="popup__subtitle">{card?.title}</p>
        <button className="popup__close popup__close_third" onClick={isClose}></button>
      </div>
    </div>
  )
}

export default ImagePopup;
