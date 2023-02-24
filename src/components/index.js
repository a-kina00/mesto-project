import '../pages/index.css';

import {
  editPopup, editName, editSignature, editInfo
}
from './const.js';

import { setPopupListener, closeListener, closePopup} from './modals.js';
setPopupListener();
closeListener();

import { addCards } from './cards.js';
addCards();

import { changeInfo } from './utils.js';

import { enableValidation } from './validate.js';
enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input-container',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input-container_error',
  errorClass: 'popup__input-container-error_active'
});

editInfo.addEventListener('submit', (evt) => {
  evt.preventDefault()

  changeInfo(editName.value, editSignature.value)
})

