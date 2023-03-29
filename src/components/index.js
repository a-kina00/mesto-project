import '../pages/index.css';

import { Section } from './section';

import {
  profilePicture
}
  from './utils/const.js';

import { setPopupListener } from './modals.js';

setPopupListener()

import { Card } from './components/cards.js';

import { changeInfo } from './utils/utils';

// import { enableValidation } from './validate.js';

// enableValidation({
//   formSelector: '.popup__container',
//   inputSelector: '.popup__input-container',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'button_disabled',
//   inputErrorClass: 'popup__input-container_error',
//   errorClass: 'popup__input-container-error_active'
// });

import { api } from './components/api.js'

import FormValidator from './components/FormValidator.js'

import UserInfo from './components/UserInfo.js';

let id = ''

// Подключение валидации (наверно куда-то надо перекинуть)

const popup1 = new FormValidator ({
  formSelector: '#popup1',
  inputSelector: '.popup__input-container',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input-container_error',
  errorClass: 'popup__input-container-error_active'
})

popup1.EnableValidation()

const popup2 = new FormValidator ({
  formSelector: '#popup2',
  inputSelector: '.popup__input-container',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input-container_error',
  errorClass: 'popup__input-container-error_active'
})

popup2.EnableValidation()

const popup3 = new FormValidator ({
  formSelector: '#popup3',
  inputSelector: '.popup__input-container',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input-container_error',
  errorClass: 'popup__input-container-error_active'
})

popup3.EnableValidation()

// подргужаем информацию о пользователе и карточках с сервера

export const userNameNTitle = new UserInfo({nameSelector: '.profile__name', titleSelector: '.profile__signature'})

Promise.all([api.setServerInfo(), userNameNTitle.getUserInfo(), api.createServerCards()])
  .then(([userData, userMainData, serverCards]) => {
    userNameNTitle.setUserInfo(userMainData.name, userMainData.title)
    profilePicture.src = userData.avatar
    id = userData._id

    const section = new Section({
      items: serverCards,
      renderer: (obj, containerSelector) => {
        const newCard = new Card(obj);
        containerSelector.append(newCard.generate());
      }
    },
      'cards')

    section.initialCards()

  })
  .catch((err) => {
    console.log(err);
  });

export { id }




