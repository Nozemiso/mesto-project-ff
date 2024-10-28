import { createCardElement } from '../components/card.js';

import { openModal, closeModal, initModals } from '../components/modal.js';
import { validateForm, enableValidation, clearValidation } from '../components/validation.js';

import { getCards, getUser, updateUser, createCard, updateAvatar } from '../components/api.js';

const validationSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorSelector: ".popup__input_error",
  inputContainerSelector: ".popup__input_container",
}

//Карточки
const imageModal = document.querySelector(".popup_type_image");
const imageModalPicture = imageModal.querySelector(".popup__image");
const imageModalTitle = imageModal.querySelector(".popup__caption");

let cards;

function selectCard(link, title) {
  imageModalPicture.setAttribute("src", link);
  imageModalPicture.setAttribute("alt", title);
  imageModalTitle.textContent = title;
  openModal(imageModal);
}

const cardContainerElement = document.querySelector(".places__list");

function renderCard(card, method = "prepend"){
  const cardElement = createCardElement(card, selectCard, userData._id);
  cardContainerElement[method](cardElement);
}

function renderCards(cards) {
  cardContainerElement.innerHTML = "";
  cards.forEach((card) => renderCard(card, "append"));
}

function initCardList() {
  return getCards().then((res) => {
    cards = res;
  })
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

function fillProfileInputs() {
  profileNameInput.value = profileNameElement.textContent;
  profileJobInput.value = profileJobElement.textContent;
}

function submitProfileEditForm(evt) {
  evt.preventDefault();
  displayLoading(evt.target);
  updateUser(profileNameInput.value, profileJobInput.value)
  .then((res) => {
    userData = res;
    renderProfile()
    closeModal(profileEditModal)
    removeLoading(evt.target)
  })
  .catch((err) => {
    console.log(err);
    removeLoading(evt.target)
  })
}
profileEditForm.addEventListener("submit", submitProfileEditForm)

const profileEditModal = document.querySelector(".popup_type_edit");
profileEditButton.addEventListener("click", () => {
  fillProfileInputs();
  clearValidation(profileEditForm, validationSelectors);
  openModal(profileEditModal);
});

//Добавление мест
const addPlaceButton = document.querySelector(".profile__add-button");
const addPlaceForm = document.forms["new-place"];
const addPlaceNameInput = addPlaceForm["place-name"];
const addPlaceLinkInput = addPlaceForm["link"];

function submitAddPlaceForm(evt) {
  evt.preventDefault();
  const newCard = {
    name: addPlaceNameInput.value,
    link: addPlaceLinkInput.value,
  }

  displayLoading(evt.target);
  createCard(newCard.name, newCard.link)
  .then((card) =>{
    evt.target.reset();
    closeModal(addPlaceModal);
    renderCard(card);
    removeLoading(evt.target)
  })
  .catch((err) => {
    console.log(err);
    removeLoading(evt.target)
  });
}

const addPlaceModal = document.querySelector(".popup_type_new-card");
addPlaceButton.addEventListener("click", () => {
  clearValidation(addPlaceForm, validationSelectors);
  openModal(addPlaceModal);
});

addPlaceForm.addEventListener("submit", submitAddPlaceForm);


//Обновление аватарки
const avatarUpdateModal = document.querySelector(".popup_type_avatar")
const profilePic = document.querySelector(".profile__image")
const avatarUpdateForm = document.forms["edit-avatar"]

profilePic.addEventListener('click', () => {
  clearValidation(avatarUpdateForm, validationSelectors)
  openModal(avatarUpdateModal)
})

avatarUpdateForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  displayLoading(evt.target);
  updateAvatar(evt.target.elements["link"].value)
  .then((res) => {
    userData = res;
    renderProfile();
    avatarUpdateForm.reset();
    closeModal(avatarUpdateModal);
    removeLoading(evt.target)
  })
  .catch((err) => {
    console.log(err);
    removeLoading(evt.target);
  });
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
  enableValidation(validationSelectors)
  initModals([imageModal, addPlaceModal, profileEditModal, avatarUpdateModal])

  Promise.all([initCardList(), initProfile()]).
  then(() => {
    renderCards(Object.values(cards))
    renderProfile()
  })
  .catch(console.log)

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
