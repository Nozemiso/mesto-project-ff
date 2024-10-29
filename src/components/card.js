import { deleteCard } from "./api";
import { setLike, removeLike } from "./api";
const cardTemplate = document.querySelector("#card-template").content;

function deleteCardHandler(evt, cardId) {
  const card = evt.target.closest(".places__item");
  deleteCard(cardId)
  .then(() => {card.remove()})
  .catch(console.log)
}

function likeButtonHandler(evt, cardId){
  const cardElement = evt.target.closest(".card");
  const likedCounterElement = cardElement.querySelector(".card__like_counter")
  const isLiked = evt.target.classList.contains("card__like_button_is-active")

  if (!isLiked) {
    setLike(cardId)
    .then(() => {
      evt.target.classList.add("card__like_button_is-active")
      likedCounterElement.textContent = +likedCounterElement.textContent + 1
    })
    .catch(console.log)
  } else {
    removeLike(cardId)
    .then(() => {
      evt.target.classList.remove("card__like_button_is-active")
      likedCounterElement.textContent = likedCounterElement.textContent - 1
    })
    .catch(console.log)
  }
}

export function createCardElement(card, selectHandler, currentUserId, likeHandler=likeButtonHandler) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  const imageElement = cardElement.querySelector(".card__image");
  imageElement.setAttribute("src", card.link);
  imageElement.setAttribute("alt", card.name);
  imageElement.addEventListener("click", () => selectHandler(card.link, card.name));

  const titleElement = cardElement.querySelector(".card__title");
  titleElement.textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", (evt) => deleteCardHandler(evt, card._id));
  if (card.owner._id !== currentUserId) deleteButton.remove()

  const likeButton = cardElement.querySelector(".card__like_button");
  likeButton.addEventListener("click", (evt) => likeHandler(evt, card._id))
  if (card.likes.some((user) => {return currentUserId === user._id})) likeButton.classList.add("card__like_button_is-active");

  const likeCounterElement = cardElement.querySelector(".card__like_counter")
  likeCounterElement.textContent = card.likes.length

  return cardElement;
}

