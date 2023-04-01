function showInputError(popupElement, inputElement, errorMessage, settings) {
  const inputError = popupElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(settings.inputErrorClass)
  inputError.textContent = errorMessage
  inputError.classList.add(settings.errorClass)
}

function hideInputError(popupElement, inputElement, settings) {
  const inputError = popupElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(settings.inputErrorClass);
  inputError.classList.remove(settings.errorClass)
  inputError.textContent = ''
}

function checkInputValidity(popupElement, inputElement, settings) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage, settings)
  } else {
    hideInputError(popupElement, inputElement, settings)
  }
}

function setEventListeners(popupElement, settings) {
  const inputList = Array.from(popupElement.querySelectorAll(settings.inputSelector))
  const buttonElement = popupElement.querySelector(settings.submitButtonSelector)

  popupElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, settings), 0
    })
  })

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(popupElement, inputElement, settings)
      toggleButtonState(inputList, buttonElement, settings)
    })
  })
}

function enableValidation(settings) {
  const popupList = Array.from(document.querySelectorAll(settings.formSelector))
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(popupElement, settings)
  })
}

function hasInvalidInput(popupList) {
  return popupList.some((input) => {
    return !input.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass)
    buttonElement.setAttribute('disabled', '')
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass)
    buttonElement.removeAttribute('disabled', '')
  }
}

export { enableValidation }

