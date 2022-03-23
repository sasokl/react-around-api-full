import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({cards, onEditAvatarClick, onEditProfileClick, onAddCardClick, onCardClick, onCardLike, onCardDelete}) {


  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div
            onClick={onEditAvatarClick}
            className="profile__avatar">
            <img
              src={currentUser.avatar}
              className="profile__avatar-image"
              alt="Profile avatar"/>
            <div className="profile__avatar-overlay">
              <div className="profile__avatar-edit-icon"/>
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfileClick}
                type="button"
                className="profile__edit-button"/>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddCardClick}
          type="button"
          className="profile__add-button"/>
      </section>
      <section className="cards">
        {cards.reverse().map(cardItem => {
          return (
            <Card
              key={cardItem._id}
              cardData={cardItem}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;