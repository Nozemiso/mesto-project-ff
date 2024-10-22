import { initialCards } from './cards.js'

const cardTemplate = document.querySelector("#card-template").content;

const cardContainerElement = document.querySelector(".places__list");

function createCard(link, title, deleteHandler) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.setAttribute("src", link);
  imageElement.setAttribute("alt", title);

  const titleElement = cardElement.querySelector(".card__title");
  titleElement.textContent = title;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteHandler)

  return cardElement;
}

function deleteCard(evt) {
  const card = evt.target.closest(".places__item");
  card.remove();
}

function renderCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card.link, card.name, deleteCard);
    cardContainerElement.append(cardElement);
  });
}

renderCards();
