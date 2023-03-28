import '../pages/index.css';
import { Section } from './section';
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

import { createCard, Card } from './cards.js';

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

import { setServerInfo, createServerCards, createServerCard, setServerPfp, api } from './api.js'

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
        const newCard = new Card(obj, 'card');
        containerSelector.prepend(newCard.generate());
      }
    },
      'cards')

    section.initialCards()

    // serverCards.forEach((card) => {
    //   // cards.append(createCard(card.link, card.name, card.likes, card.owner._id, card._id));
    //   const newCard = new Card(card);
    //   cards.prepend(newCard.generate());
    // })
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

  api.createServerCard(photoName.value, photo.value)
    .then((result) => {
      //привязка к объекту карточки
      const newCardObj = result;
      const section = new Section({
        items: newCardObj,
        renderer: (obj, containerSelector) => {
          const newCard = new Card(obj, 'card');
          containerSelector.prepend(newCard.generate());
        }
      },
        'cards')

      section.addItem()

      // cards.prepend(newCard.generate());
      // cards.prepend(createCard(result.link, result.name, result.likes, result.owner._id, result._id))
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

  api.setServerPfp(newPfp.value)
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

export { renderLoading, id }




