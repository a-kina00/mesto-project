export default class FormValidator {
    constructor({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, validationElem){
        this._formSelector = formSelector
        this._inputSelector = inputSelector
        this._submitButtonSelector = submitButtonSelector
        this._inactiveButtonClass =  inactiveButtonClass
        this._inputErrorClass = inputErrorClass
        this._errorClass = errorClass
        this._validationElem = validationElem
    };

    _HasInvalidInput(popupList) {
        return popupList.some((input) => {
            return !input.validity.valid
        })
    }

    _ToggleButtonState(inputList, buttonElement) {
        if (this._HasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass)
            buttonElement.setAttribute('disabled', '')
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass)
            buttonElement.removeAttribute('disabled', '')
        }
    }

    _CheckInputValidity(popupElement, inputElement) {
        if (inputElement.validity.patternMismatch) {
          inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
          inputElement.setCustomValidity("");
        }
      
        if (!inputElement.validity.valid) {
            this._ShowInputError(popupElement, inputElement, inputElement.validationMessage)
        } else {
            this._HideInputError(popupElement, inputElement)
        }
    }

    _ShowInputError(popupElement, inputElement, errorMessage) {
        const inputError = popupElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this._inputErrorClass)
        inputError.textContent = errorMessage
        inputError.classList.add(this._errorClass)
    }
      
    _HideInputError(popupElement, inputElement) {
        const inputError = popupElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this._inputErrorClass);
        inputError.classList.remove(this._errorClass)
        inputError.textContent = ''
    }

    _SetEventListeners(popupElement) {
        const inputList = Array.from(popupElement.querySelectorAll(this._inputSelector))
        const buttonElement = popupElement.querySelector(this._submitButtonSelector)
        
        popupElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._ToggleButtonState(inputList, buttonElement), 0
            })
        })
        
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                console.log(inputElement)
                this._CheckInputValidity(popupElement, inputElement)
                this._ToggleButtonState(inputList, buttonElement)
            })
        })
    }

    EnableValidation() {
        const popupElement = document.querySelector(this._formSelector)
        popupElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        })
        this._SetEventListeners(popupElement)
    }
}
