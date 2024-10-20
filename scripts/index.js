const cardTemplate = document.querySelector("#card-template").content;

const cardContainerElement = document.querySelector(".places__list");

function createCard(link, title, deleteHandler) {
  let cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  let imageElement = cardElement.querySelector(".card__image");
  imageElement.setAttribute("src", link);

  let titleElement = cardElement.querySelector(".card__title");
  titleElement.textContent = title;

  let deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteHandler)

  return cardElement;
}

function deleteCard(evt) {
  const card = evt.target.closest(".places__item");
  card.remove();
}

function renderCards() {
  initialCards.forEach((card) => {
    let cardElement = createCard(link=card.link, title=card.name, deleteHandler=deleteCard);
    cardContainerElement.append(cardElement);
  });
}

renderCards();
