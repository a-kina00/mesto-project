export default class FormValidator {
    constructor(formSelector, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, validationElem){
        this._formSelector = formSelector
        this._inputSelector = inputSelector
        this._submitButtonSelector = submitButtonSelector
        this._inactiveButtonClass =  inactiveButtonClass
        this._inputErrorClass = inputErrorClass
        this._errorClass = errorClass
        this._validationElem = validationElem
    };

    _hasInvalidInput(popupList) {
        return popupList.some((input) => {
            return !input.validity.valid
        })
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass)
            buttonElement.setAttribute('disabled', '')
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass)
            buttonElement.removeAttribute('disabled', '')
        }
    }

    _checkInputValidity(popupElement, inputElement) {
        if (inputElement.validity.patternMismatch) {
          inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
          inputElement.setCustomValidity("");
        }

        if (!inputElement.validity.valid) {
            this._showInputError(popupElement, inputElement, inputElement.validationMessage)
        } else {
            this._hideInputError(popupElement, inputElement)
        }
    }

    _showInputError(popupElement, inputElement, errorMessage) {
        const inputError = popupElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this._inputErrorClass)
        inputError.textContent = errorMessage
        inputError.classList.add(this._errorClass)
    }

    _hideInputError(popupElement, inputElement) {
        const inputError = popupElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this._inputErrorClass);
        inputError.classList.remove(this._errorClass)
        inputError.textContent = ''
    }

    _setEventListeners(popupElement) {
        const inputList = Array.from(popupElement.querySelectorAll(this._inputSelector))
        const buttonElement = popupElement.querySelector(this._submitButtonSelector)

        popupElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState(inputList, buttonElement), 0
            })
        })

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(popupElement, inputElement)
                this._toggleButtonState(inputList, buttonElement)
            })
        })
    }

    enableValidation() {
        const popupElement = document.querySelector(this._formSelector)
        popupElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        })
        this._setEventListeners(popupElement)
    }
}
