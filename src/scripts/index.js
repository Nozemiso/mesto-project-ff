import { createCardElement } from '../components/card.js';

import { openModal, closeModal, initModals } from '../components/modal.js';
import { validateForm, enableValidation } from './validation.js';

import { getCards, getUser, updateUser, createCard, updateAvatar } from './api.js';

//Карточки
const imageModal = document.querySelector(".popup_type_image");
const imageModalPicture = imageModal.querySelector(".popup__image");
const imageModalTitle = imageModal.querySelector(".popup__caption");
export let cards;
function selectCard(link, title) {
  imageModalPicture.setAttribute("src", link);
  imageModalPicture.setAttribute("alt", title);
  imageModalTitle.textContent = title;
  openModal(imageModal);
}

const cardContainerElement = document.querySelector(".places__list");

function renderCard(card, method = "prepend"){
  const cardElement = createCardElement(card, selectCard);
  cardContainerElement[method](cardElement);
}

function renderCards(cards) {
  cardContainerElement.innerHTML = "";
  cards.forEach((card) => renderCard(card, "append"));
}

//Профиль
export let userData;
const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileImage = document.querySelector(".profile__image");
const profileEditForm = document.forms["edit-profile"]
const profileNameInput = profileEditForm.elements["name"];
const profileJobInput = profileEditForm.elements["description"]

function fillProfileInputs() {s
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
}

function submitProfileEditForm(evt) {
  evt.preventDefault();
  displayLoading(evt.target)
  updateUser(profileNameInput.value, profileJobInput.value)
  .then((res) => {
    userData = res;
    renderProfile()
  })
  .then(
    closeModal(profileEditModal)
  )
  .finally(removeLoading(evt.target))
  .catch((err) => {
    console.log(err);
  });
}
profileEditForm.addEventListener("submit", submitProfileEditForm)

const profileEditModal = document.querySelector(".popup_type_edit");
profileEditButton.addEventListener("click", () => {
  fillProfileInputs();
  validateForm(profileEditForm);
  openModal(profileEditModal);
});

//Добавление мест
const addPlaceButton = document.querySelector(".profile__add-button");
const addPlaceForm = document.forms["new-place"];
const addPlaceNameInput = addPlaceForm["place-name"];
const addPlaceLinkInput = addPlaceForm["link"];

function submitAddPlaceForm(evt) {
  evt.preventDefault();
  displayLoading(evt.target);
  const newCard = {
    name: addPlaceNameInput.value,
    link: addPlaceLinkInput.value,
  }
  evt.target.reset()

  createCard(newCard.name, newCard.link)
  .then((card) =>{
    cards[card._id] = card
    closeModal(addPlaceModal)
    renderCard(card);
  })
  .finally(removeLoading(evt.target))
  .catch((err) => {
    console.log(err);
  });
}

const addPlaceModal = document.querySelector(".popup_type_new-card");
addPlaceButton.addEventListener("click", () => {
  validateForm(addPlaceForm);
  openModal(addPlaceModal);
});

addPlaceForm.addEventListener("submit", submitAddPlaceForm);


//Обновление аватарки
const avatarUpdateModal = document.querySelector(".popup_type_avatar")
const profilePic = document.querySelector(".profile__image")
const avatarUpdateForm = document.forms["edit-avatar"]

profilePic.addEventListener('click', () => {
  openModal(avatarUpdateModal)
})

avatarUpdateForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  displayLoading(evt.target);
  updateAvatar(evt.target.elements["link"].value)
  .then((res) => {
    userData = res;
    renderProfile()
  })
  .then(closeModal(avatarUpdateModal))
  .finally(removeLoading(evt.target))
  .catch((err) => {
    console.log(err);
  });
})

window.addEventListener("load", () => {
  profileEditModal.classList.add("popup_is-animated");
  addPlaceModal.classList.add("popup_is-animated");
  imageModal.classList.add("popup_is-animated");
})

function renderProfile() {
  profileNameElement.textContent = userData.name;
  profileJobElement.textContent = userData.about;
  profileImage.setAttribute("style", `background-image: url('${userData.avatar}')`)
}

function initProfile() {
  return getUser().then((res) => {
    userData = res;
    renderProfile();
  })
}

function initPage() {
  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inputErrorSelector: ".popup__input_error",
})
  initModals([imageModal, addPlaceModal, profileEditModal, avatarUpdateModal])

  const initialCardsPromise = getCards()
  .then((cardList) => {
    cards = {};
    cardList.forEach((card) => {
      cards[card._id] = Object.assign(card)
    })
  })
  .catch((err) => {
    console.log(err);
  });

  const initProfilePromise = initProfile().catch(console.log)
  Promise.all([initialCardsPromise, initProfilePromise]).then(() => renderCards(Object.values(cards))).catch(console.log)
}

function displayLoading(form) {
  const submitButton = form.querySelector(".popup__button");
  submitButton.textContent = "Сохранение..."
}

function removeLoading(form) {
  const submitButton = form.querySelector(".popup__button");
  submitButton.textContent = "Сохранить"
}

initPage()
