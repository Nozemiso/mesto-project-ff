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
  if (input.validity.valid) clearInputError(input, selectors);
  else showInputError(input, selectors)
}

function showInputError(input, selectors){
  const inputContainerElement = input.closest(".popup__input_container");
  const errorElement = inputContainerElement.querySelector(selectors.inputErrorSelector);
  if (!input.validity.patternMismatch) {
    errorElement.textContent = input.validationMessage
  } else {
    errorElement.textContent = input.getAttribute("data-pattern-messaage");
  }
  input.classList.add(selectors.inputInvalidClass);
}

function clearInputError(input, selectors){
  const inputContainerElement = input.closest(".popup__input_container");
  const errorElement = inputContainerElement.querySelector(selectors.inputErrorSelector);
  errorElement.textContent = ""
  input.classList.remove(selectors.inputInvalidClass);
}

export function clearValidation(form, selectors){
    const inputList = Array.from(form.querySelectorAll(selectors.inputSelector));
    const buttonElement = form.querySelector(selectors.submitButtonSelector);
    inputList.forEach((inputElement) => {
      clearInputError(inputElement, selectors)
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
