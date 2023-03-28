import '../pages/index.css';
import FormValidator from "./FormValidator"

import {
  popups, editPopup, editName, editSignature, addCardPopup, submitCard,
  photoPopup, photoImg, photoCaption, profileName, profileSignature,
  editBtn, addBtn, closeBtns, cards, cardTemplate, editInfo,
  photoName, photo, editPfpPopup, newPfp, editPfpBtn, profilePicture, editPfp,
  delPopup, delCardBtn, saveNewInfoBtn, submitingCardBtn, confirmNewPfpBtn, config
}
  from './const.js';

import { setPopupListener, closeListener, closePopup } from './modals.js';

setPopupListener()
closeListener()

import { createCard } from './cards.js';

import { changeInfo } from './utils.js';

// enableValidation({
//   formSelector: '.popup__container',
//   inputSelector: '.popup__input-container',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: '.button_disabled',
//   inputErrorClass: '.popup__input-container_error',
//   errorClass: 'popup__input-container-error_active'
// });

const popup2 = new FormValidator({
  formSelector: '#popup2',
  inputSelector: '.popup__input-container',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input-container_error',
  errorClass: 'popup__input-container-error_active'
})

popup2.EnableValidation()

const popup3 = new FormValidator({
  formSelector: '#popup3',
  inputSelector: '.popup__input-container',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input-container_error',
  errorClass: 'popup__input-container-error_active'
})

popup3.EnableValidation()

const popup1 = new FormValidator({
  formSelector: '#popup1',
  inputSelector: '.popup__input-container',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input-container_error',
  errorClass: 'popup__input-container-error_active'
})

popup1.EnableValidation()


import { setServerInfo, createServerCards, createServerCard, setServerPfp } from './api.js'

let id = ''

// подргужаем информацию о пользователе и карточках с сервера

Promise.all([setServerInfo(), createServerCards()])
  .then(([userData, serverCards]) => {
    changeInfo(userData.name, userData.about)
    profilePicture.src = userData.avatar
    id = userData._id

    serverCards.forEach((card) => {
      cards.append(createCard(card.link, card.name, card.likes, card.owner._id, card._id))
    })
  })

  .catch((err) => {
    console.log(err);
  });

// отображение загрузки

function renderLoading(button, isLoading, buttonText = 'Сохранить', loadingText = 'Сохранение...') {

  if (isLoading) {
    button.textContent = loadingText
  }
  else {
    button.textContent = buttonText
  }
}

// нажатие на кнопку изменения информации о пользователе

editInfo.addEventListener('submit', (evt) => {
  evt.preventDefault()
  renderLoading(saveNewInfoBtn, true)

  changeInfo(editName.value, editSignature.value)
})

// нажатие на кнопку добавления карточки

submitCard.addEventListener('submit', (evt) => {
  evt.preventDefault()
  renderLoading(submitingCardBtn, true, 'Создать', 'Cоздание...')

  createServerCard(photoName.value, photo.value)
    .then((result) => {
      cards.prepend(createCard(result.link, result.name, result.likes, result.owner._id, result._id))
      closePopup(submitCard)
      evt.target.reset()
    })

    .catch((err) => {
      console.log(err);
    })

    .finally(() => {
      renderLoading(submitingCardBtn, false, 'Создать', 'Создать', 'Cоздание...')
    })
})

// нажатие на изменение аватара

editPfp.addEventListener('submit', (evt) => {
  evt.preventDefault()
  renderLoading(confirmNewPfpBtn, true)

  setServerPfp(newPfp.value)
    .then((result) => {
      profilePicture.src = result.avatar
      closePopup(editPfpPopup)
      evt.target.reset()
    })

    .catch((err) => {
      console.log(err);
    })

    .finally(() => {
      renderLoading(confirmNewPfpBtn, false)
    })
})

// const settings = {selectors: "123", settings: "223"}
// const stuff = new FormValidator(settings)
// console.log(stuff.GetSettings())


export { renderLoading, id }
