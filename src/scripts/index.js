import { initialCards } from './cards.js'
import { createCard } from '../components/card.js';

import { openModal, closeModal } from '../components/modal.js';


//Карточки
const imageModal = document.querySelector(".popup_type_image");
const imageModalPicture = imageModal.querySelector(".popup__image");
const imageModalTitle = imageModal.querySelector(".popup__caption");

function selectCard(evt) {
  const card = evt.target.closest(".card");
  const image = card.querySelector(".card__image");
  const title = card.querySelector(".card__title");

  imageModalPicture.setAttribute("src", image.getAttribute("src"))
  imageModalTitle.textContent = title.textContent;
  openModal(imageModal);
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active")
}

const cardContainerElement = document.querySelector(".places__list");


function renderCard(card, method = "prepend"){
  const cardElement = createCard({
    link: card.link,
    title: card.name,
    likeHandler: likeCard,
    selectHandler: selectCard
  });

  cardContainerElement[method](cardElement);
}

function renderInitialCards() {
  cardContainerElement.innerHTML = "";
  initialCards.forEach((card) => renderCard(card));
}
renderInitialCards();

//Профиль
const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button") ;
const profileEditForm = document.forms["edit-profile"]
const profileNameInput = profileEditForm.elements["name"];
const profileJobInput = profileEditForm.elements["description"]

function fillProfileInputs(evt) {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
}
fillProfileInputs()

function submitProfileEditForm(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closeModal(profileEditModal)
}
profileEditForm.addEventListener("submit", submitProfileEditForm)

const profileEditModal = document.querySelector(".popup_type_edit");
profileEditButton.addEventListener("click", (evt) => openModal(profileEditModal, fillProfileInputs));

//Добавление мест
const addPlaceButton = document.querySelector(".profile__add-button");
const addPlaceForm = document.forms["new-place"];
const addPlaceNameInput = addPlaceForm["place-name"];
const addPlaceLinkInput = addPlaceForm["link"];

function resetAddPlaceForm(evt) {
  addPlaceForm.reset();
  //addPlaceNameInput.value = "";
  //addPlaceLinkInput.value = "";
}

function submitAddPlaceForm(evt) {
  evt.preventDefault();
  const newCard = {
    name: addPlaceNameInput.value,
    link: addPlaceLinkInput.value,
  }
  evt.target.reset()
  closeModal(addPlaceModal)
  renderCard(newCard);
}

const addPlaceModal = document.querySelector(".popup_type_new-card");
addPlaceButton.addEventListener("click", (evt) => openModal(addPlaceModal));

addPlaceForm.addEventListener("submit", submitAddPlaceForm);

window.addEventListener("load", () => {
  profileEditModal.classList.add("popup_is-animated");
  addPlaceModal.classList.add("popup_is-animated");
  imageModal.classList.add("popup_is-animated");
})
