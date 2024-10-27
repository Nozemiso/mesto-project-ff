//Валидация форм
let validationSelectors;

function checkFormValid(form){
  const formInputElements = Array.from(form.querySelectorAll(".popup__input"))
  return formInputElements.every((inputElement) => {
    return inputElement.validity.valid
  })
}

export function validateForm(form){
  const formButton = form.querySelector(validationSelectors.submitButtonSelector)
  const formInputElements = Array.from(form.querySelectorAll(validationSelectors.inputSelector))
  formInputElements.forEach((inputElement) => {
    validateInput(inputElement)
  })

  if (checkFormValid(form)) formButton.removeAttribute("disabled")
  else formButton.setAttribute("disabled", null)
}

function validateInput(input){
  const errorElement = input.nextElementSibling
  if (!input.validity.patternMismatch) {
    errorElement.textContent = input.validationMessage
  } else {
    errorElement.textContent = input.getAttribute("data-pattern-messaage");
  }
}

export function enableValidation(selectors = {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inputErrorSelector,
}){
  validationSelectors = Object.assign(selectors);
  const formInputs = Array.from(document.querySelectorAll(validationSelectors.inputSelector));
  formInputs.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      validateForm(evt.target.closest(validationSelectors.formSelector))
    })
  })
}
