let activeModal;

export function initModals(modals){
  modals.forEach((modal) => {
    modal.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_is-opened")) {
        closeModal(modal);
      }
      if (evt.target.classList.contains("popup__close")) {
        closeModal(modal);
      }
    })
  })
}

function escKeyHandler(evt){
  if (evt.key === "Escape") {
    closeModal(activeModal);
  }
}

export function closeModal(modal){
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escKeyHandler);
}

export function openModal(modal){
  activeModal = modal;
  activeModal.classList.add("popup_is-opened");
  document.addEventListener("keydown", escKeyHandler)
}
