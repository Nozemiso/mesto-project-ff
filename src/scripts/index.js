import { initialCards } from './cards.js'
import { createCard } from '../components/card.js';

import { openModal, closeModal } from '../components/modal.js';


//Карточки
const imageModal = document.querySelector(".popup_type_image");
const cardContainerElement = document.querySelector(".places__list");
let cards = Object.assign(initialCards);

function renderCards() {
  cardContainerElement.innerHTML = "";
  cards.forEach((card) => {
    const cardElement = createCard(card.link, card.name);
    cardContainerElement.append(cardElement);
  });
}

renderCards();


//Профиль
const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button") ;
const profileEditForm = document.forms["edit-profile"]
const profileNameInput = profileEditForm.elements["name"];
const profileJobInput = profileEditForm.elements["description"]

function profileEditFormReset(evt) {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
}
profileEditFormReset(null)

function profileEditFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileJobElement.textContent = profileJobInput.value;
  closeModal(profileEditModal)
}
profileEditForm.addEventListener("submit", profileEditFormSubmit)

const profileEditModal = document.querySelector(".popup_type_edit");
profileEditButton.addEventListener("click", (evt) => openModal(profileEditModal, profileEditFormReset));

//Добавление мест
const addPlaceButton = document.querySelector(".profile__add-button");
const addPlaceForm = document.forms["new-place"];
const addPlaceNameInput = addPlaceForm["place-name"];
const addPlaceLinkInput = addPlaceForm["link"];

function addPlaceFormReset(evt) {
  addPlaceNameInput.value = "";
  addPlaceLinkInput.value = "";
}

function addPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: addPlaceNameInput.value,
    link: addPlaceLinkInput.value,
  }
  closeModal(addPlaceModal, addPlaceFormReset)
  cards.unshift(newCard)
  renderCards();
}

const addPlaceModal = document.querySelector(".popup_type_new-card");
addPlaceButton.addEventListener("click", (evt) => openModal(addPlaceModal, addPlaceFormReset));

addPlaceForm.addEventListener("submit", addPlaceFormSubmit);

window.addEventListener("load", () => {
  profileEditModal.classList.add("popup_is-animated");
  addPlaceModal.classList.add("popup_is-animated");
  imageModal.classList.add("popup_is-animated");
})
