import { deleteCard } from "../scripts/api";
import { userData, cards } from "../scripts/index";
import { setLike, removeLike } from "../scripts/api";
const cardTemplate = document.querySelector("#card-template").content;

function deleteCardHandler(evt) {
  const card = evt.target.closest(".places__item");
  const id = card.getAttribute("data-card-id");
  deleteCard(id).then((res) => {console.log(res)});
  card.remove();
}

function isLiked(card) {
  const cardId = card.getAttribute("data-card-id");
  return cards[cardId].likes.some((user) => {
    return user._id === userData._id
  })
}

function renderLikeButton(card){
  const likeButton = card.querySelector(".card__like_button")
  const likedCounter = card.querySelector(".card__like_counter")
  const cardId = card.getAttribute("data-card-id");

  if (isLiked(card)) {
    likeButton.classList.add("card__like_button_is-active")
  } else {
    likeButton.classList.remove("card__like_button_is-active")
  }
  likedCounter.textContent = cards[cardId].likes.length;
}

function likeButtonHandler(evt){
  const cardElement = evt.target.closest(".card");
  const cardId = cardElement.getAttribute("data-card-id");
  const likedCounter = cardElement.querySelector(".card__like_counter")
  const isLiked = cards[cardId].likes.some((user) => {
    return user._id === userData._id
  })
  console.log(cards[cardId])
  console.log(isLiked)

  let likePromise;
  if (!isLiked) {
    likePromise = setLike(cardId)
    .then((res) => {
      cards[cardId] = res
    })
  } else {
    likePromise = removeLike(cardId)
    .then((res) => {
      cards[cardId] = res
    })
  }

  likePromise.then(() => {
    renderLikeButton(cardElement)
  })

}


export function createCardElement(card, selectHandler, likeHandler=likeButtonHandler) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  cardElement.setAttribute("data-card-id", card._id)

  imageElement.setAttribute("src", card.link);
  imageElement.setAttribute("alt", card.name);

  imageElement.addEventListener("click", () => selectHandler(card.link, card.name));

  const titleElement = cardElement.querySelector(".card__title");
  titleElement.textContent = card.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCardHandler);
  if (card.owner._id !== userData._id) deleteButton.remove()

  const likeButton = cardElement.querySelector(".card__like_button");
  likeButton.addEventListener("click", likeHandler)
  renderLikeButton(cardElement)



  return cardElement;
}

