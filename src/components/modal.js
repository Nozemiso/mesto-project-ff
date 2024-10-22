let activeModal;

function escKeyHandler(evt, extCloseHandler){
  if (evt.key === "Escape") {
    closeModal(activeModal, extCloseHandler);
  }
}

export function closeModal(modal, extCloseHandler){
  if (extCloseHandler) extCloseHandler();
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escKeyHandler);
}

export function openModal(modal, extCloseHandler){
  activeModal = modal;
  activeModal.classList.add("popup_is-opened");

  activeModal.addEventListener("click", (evt) => {
    if (evt.target === activeModal)
    closeModal(activeModal, extCloseHandler);
  })

  const closeButton = activeModal.querySelector(".popup__close")
  closeButton.addEventListener("click", (evt) => closeModal(activeModal, extCloseHandler))

  document.addEventListener("keydown", (evt) => escKeyHandler(evt, extCloseHandler))
}
