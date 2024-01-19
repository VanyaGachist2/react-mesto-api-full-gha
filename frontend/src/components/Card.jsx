import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { useContext } from "react";

function Card({card, id, title, image, likeCounter, onClick, onDelete, onLike}) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id !== currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  console.log(isLiked);
  const handleCardClick = () => {
    onClick(title, image)
  }

  const handleCardDelete = () => {
    onDelete(card);
  }

  const handleCardLike = () => {
    onLike(card);
  }

  return (
    <li className="element__item" key={id}>
      <img className="element__image" src={image} alt={title} onClick={handleCardClick} />
      <div className="element__info">
        <h2 className="element__heading">{title}</h2>
        <div className="element__group">
          <button type="button" className={`element__button ${isLiked ? "element__button_color_black" : ''}`} onClick={handleCardLike}></button>
          <p className="element__counter">{likeCounter}</p>
        </div>
      </div>
      <button type="button" className={`element__trash ${isOwn ? 'element__trash_hide' : ''}`}
      onClick={handleCardDelete}></button>
    </li>
  )
}

export default Card;
