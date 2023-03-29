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

import { enableValidation } from './validate.js';

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input-container',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'popup__input-container_error',
  errorClass: 'popup__input-container-error_active'
});

import { api } from './components/api.js'

let id = ''

// подргужаем информацию о пользователе и карточках с сервера

Promise.all([api.setServerInfo(), api.createServerCards()])
  .then(([userData, serverCards]) => {
    changeInfo(userData.name, userData.about)
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




