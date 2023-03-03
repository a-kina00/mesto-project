import '../pages/index.css';

import {
  popups, editPopup, editName, editSignature, addCardPopup, submitCard,
  photoPopup, photoImg, photoCaption, profileName, profileSignature,
  editBtn, addBtn, closeBtns, cards, cardTemplate, editInfo,
  photoName, photo, editPfpPopup, newPfp, editPfpBtn, profilePicture, editPfp,
  delPopup, delCardBtn, config
}
  from './const.js';

import { setPopupListener, closeListener, closePopup } from './modals.js';

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

let id = ''

// подргужаем информацию о пользователе с сервера

setServerInfo()
  .then((result) => {
    changeInfo(result.name, result.about)
    profilePicture.src = result.avatar
    id = result._id
  })

  .catch((err) => {
    console.log(err);
  });

// подргужаем карточки с сервера

createServerCards()
  .then((result) => {
    result.forEach((card) => {
      cards.append(createCard(card.link, card.name, card.likes, card.owner._id, card._id))
    })
  })
  .catch((err) => {
    console.log(err);
  });

// отображение загрузки

function renderLoading(button, isLoading, buttonText = 'Сохранить', loadingText = 'Сохранение...') {

  if (isLoading) {
    button.querySelector('.button').textContent = loadingText
  }
  else {
    button.querySelector('.button').textContent = buttonText
  }
}

// нажатие на кнопку изменения информации о пользователе

editInfo.addEventListener('submit', (evt) => {
  evt.preventDefault()
  renderLoading(editInfo, true)

  changeInfo(editName.value, editSignature.value)
})

// нажатие на кнопку добавления карточки

submitCard.addEventListener('submit', (evt) => {
  evt.preventDefault()
  renderLoading(submitCard, true, 'Создать', 'Cоздание...')

  createServerCard(photoName.value, photo.value)
    .then((result) => {
      cards.prepend(createCard(result.link, result.name, result.likes, result.owner._id, result._id))
    })

    .finally(() => {
      renderLoading(submitCard, false, 'Создать', 'Создать', 'Cоздание...')
      closePopup(submitCard)
    })

  evt.target.reset()
})

// нажатие на изменение аватара

editPfp.addEventListener('submit', (evt) => {
  evt.preventDefault()
  renderLoading(editPfp, true)

  setPfp(newPfp)

  evt.target.reset()
})

export { renderLoading, id }
