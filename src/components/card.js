const cardTemplate = document.querySelector("#card-template").content;

function deleteCard(evt) {
  const card = evt.target.closest(".places__item");
  card.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active")
}

export function createCard({link, title, likeHandler=likeCard, selectHandler }) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.setAttribute("src", link);
  imageElement.setAttribute("alt", title);

  imageElement.addEventListener("click", () => selectHandler(link, title));

  const titleElement = cardElement.querySelector(".card__title");
  titleElement.textContent = title;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard)

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeHandler )

  return cardElement;
}

