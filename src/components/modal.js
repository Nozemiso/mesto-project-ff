let activeModal;
let activeExtCloseHandler;

const modlas = document.querySelectorAll(".popup")

function initModals(modals){
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
  if (activeExtCloseHandler) activeExtCloseHandler();
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escKeyHandler);
}

export function openModal(modal, extCloseHandler){
  activeModal = modal;
  activeModal.classList.add("popup_is-opened");
  activeExtCloseHandler = extCloseHandler;
  document.addEventListener("keydown", escKeyHandler)
}

initModals(modlas)
