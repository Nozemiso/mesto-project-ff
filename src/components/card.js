import { openModal } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;

function deleteCard(evt) {
  const card = evt.target.closest(".places__item");
  card.remove();
}

function likeCard(evt) {
  evt.stopPropagation()
  evt.target.classList.toggle("card__like-button_is-active")
}

function selectCard(evt) {

  const imageModal = document.querySelector(".popup_type_image");
  const card = evt.target.closest(".card");

  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");

  const modalImage = imageModal.querySelector(".popup__image");
  modalImage.setAttribute("src", image.getAttribute("src"))
  const modalTitle = imageModal.querySelector(".popup__caption");
  modalTitle.textContent = title.textContent;
  openModal(imageModal);

}

export function createCard(link, title, likeHandler=likeCard, selectHandler=selectCard) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.setAttribute("src", link);
  imageElement.setAttribute("alt", title);

  cardElement.addEventListener("click", selectCard);

  const titleElement = cardElement.querySelector(".card__title");
  titleElement.textContent = title;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard)

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard )

  return cardElement;
}

