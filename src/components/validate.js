function showInputError(popupElement, inputElement, errorMessage) {
  const inputError = popupElement.querySelector(`.${inputElement.id}-error`)
  inputError.textContent = errorMessage;
  inputElement.classList.add('popup__input-container_error');
}

function hideInputError(popupElement, inputElement) {
  const inputError = popupElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove('popup__input-container_error');
  inputError.textContent = ''
}

function checkInputValidity(popupElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(popupElement, inputElement)
  }
}

function setEventListeners(popupElement) {
  const inputList = Array.from(popupElement.querySelectorAll('.popup__input-container'))
  const buttonElement = popupElement.querySelector('.popup__save-button')

  popupElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement), 0
    })
  })

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(popupElement, inputElement)
      toggleButtonState(inputList, buttonElement)
    })
  })
}

function enableValidation() {
  const popupList = Array.from(document.querySelectorAll('.popup'))
  popupList.pop()
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(popupElement)
  })
}

function hasInvalidInput(popupList) {
  return popupList.some((input) => {
    return !input.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_disabled')
    buttonElement.setAttribute('disabled', '')
  } else {
    buttonElement.classList.remove('button_disabled')
    buttonElement.removeAttribute('disabled', '')
  }
}

export { enableValidation }

