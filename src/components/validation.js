function checkFormValid(form){
  const formInputElements = Array.from(form.querySelectorAll(".popup__input"))
  return formInputElements.every((inputElement) => {
    return inputElement.validity.valid
  })
}

export function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButton(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

function validateInput(input, selectors){

  const inputContainerElement = input.closest(".popup__input_container");
  const errorElement = inputContainerElement.querySelector(selectors.inputErrorSelector)

  if (!input.validity.patternMismatch) {
    errorElement.textContent = input.validationMessage
  } else {
    errorElement.textContent = input.getAttribute("data-pattern-messaage");
  }
}

export function clearValidation(form, selectors){
    const formErrors = Array.from(form.querySelectorAll(selectors.inputErrorSelector));
    const inputList = Array.from(form.querySelectorAll(selectors.inputSelector));
    const buttonElement = form.querySelector(selectors.submitButtonSelector);
    formErrors.forEach((errorElement) => {
      errorElement.textContent = ""
    });
    toggleButton(inputList, buttonElement);
}

function setEventListeners(form, selectors) {
  const inputList = Array.from(form.querySelectorAll(selectors.inputSelector));
  const buttonElement = form.querySelector(selectors.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      validateInput(inputElement, selectors);
      toggleButton(inputList, buttonElement);
    })
  })
  toggleButton(inputList, buttonElement);
}

export function enableValidation(selectors){
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => setEventListeners(formElement, selectors));
}
