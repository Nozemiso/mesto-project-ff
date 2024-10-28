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
  const activeModal = document.querySelector(".popup_is-opened")
  if (evt.key === "Escape") {
    closeModal(activeModal);
  }
}

export function closeModal(modal){
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escKeyHandler);
}

export function openModal(modal){
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", escKeyHandler)
}
