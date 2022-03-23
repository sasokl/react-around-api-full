import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from "react";

function Card({cardData, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = cardData.owner === currentUser._id;

  const cardDeleteButtonClassName = (
    `card__delete-button${isOwn ? ' card__delete-button_enabled' : ''}`
    // When I use the && operator in css class name, I get a 'false' string in returned DOM
  );

  const isLiked = cardData.likes.some(item => item === currentUser._id);

  const cardLikeButtonClassName = `card__like-button${isLiked ? ' card__like-button_active' : ''}`;

  const handleCardClick = () => {
    onCardClick({
      name: cardData.name,
      link: cardData.link
    });
  }


  return (
    <div className="card">
      <button
        onClick={() => {
          onCardDelete(cardData._id);
        }}
        type="button"
        className={cardDeleteButtonClassName}/>
      <img
        src={cardData.link}
        onClick={handleCardClick}
        alt={cardData.name}
        className="card__image"/>
      <div className="card__content">
        <h2 className="card__title">{cardData.name}</h2>
        <div className="card__like-container">
          <button
            onClick={() => {
              onCardLike(cardData);
            }}
            type="button"
            className={cardLikeButtonClassName}
          />
          <span className="card__likes-count">{cardData.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;