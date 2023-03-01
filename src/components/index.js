import '../pages/index.css';

import {
  editPfp, editName, editSignature, editInfo, newPfp, submitCard, cards,
  photo, photoName
}
  from './const.js';

import { setPopupListener, closeListener } from './modals.js';
setPopupListener()
closeListener()

import { createCard } from './cards.js';

import { changeInfo, setPfp } from './utils.js';

import { enableValidation } from './validate.js';
enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input-container',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input-container_error',
  errorClass: 'popup__input-container-error_active'
});

import { setServerInfo, createServerCards, createServerCard } from './api.js'
setServerInfo()
createServerCards()

editInfo.addEventListener('submit', (evt) => {
  evt.preventDefault()
  renderLoading(editInfo, true)

  changeInfo(editName.value, editSignature.value)
})

submitCard.addEventListener('submit', (evt) => {
  evt.preventDefault()
  renderLoading(submitCard, true)

  createServerCard(photoName.value, photo.value)
  cards.prepend(createCard(photo.value, photoName.value))

  evt.target.reset()
})

editPfp.addEventListener('submit', (evt) => {
  evt.preventDefault()
  renderLoading(editPfp, true)

  setPfp(newPfp)

  evt.target.reset()
})

function renderLoading(button, isLoading, initialText) {
  if (isLoading) {
    button.querySelector('.button').textContent = 'Сохранение...'
  }
  else {
    button.querySelector('.button').textContent = initialText
  }
}

export { renderLoading }
