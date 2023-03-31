import './index.css'

import { Section } from '../components/section.js';

import { profilePicture, validationConfig } from '../utils/const.js';

import { setPopupListener, newEditPopup } from '../modals.js';

import { PopupWithImage } from '../components/popupWithImage';

setPopupListener()

import { Card } from '../components/cards.js';

import UserInfo from '../components/UserInfo.js';

import FormValidator from '../components/FormValidator.js'

import { api } from '../components/api.js'

let id = ''

// Подключение валидации (наверно куда-то надо перекинуть)

const popup1 = new FormValidator('#popup1', validationConfig)

popup1.enableValidation()

const popup2 = new FormValidator('#popup2', validationConfig)

popup2.enableValidation()

const popup3 = new FormValidator('#popup3', validationConfig)

popup3.enableValidation()

// подргужаем информацию о пользователе и карточках с сервера

const userNameNTitle = new UserInfo({ nameSelector: '.profile__name', titleSelector: '.profile__signature' })

Promise.all([api.setServerInfo(), userNameNTitle.getUserInfo(), api.createServerCards()])
  .then(([userData, userMainData, serverCards]) => {
    userNameNTitle.setUserInfo(userMainData.name, userMainData.title)
    profilePicture.src = userData.avatar
    id = userData._id

    const section = new Section({
      items: serverCards,
      renderer: (obj, containerSelector) => {
        const newCard = new Card(obj, 'card',
          (elementImage, elementTitle) => {
            const newPopupWithImage = new PopupWithImage('#popup__photo');
            newPopupWithImage.setEventListeners()
            newPopupWithImage.open(elementImage, elementTitle);
          })
        containerSelector.append(newCard.generate());
      }
    },
      'cards')

    section.initialCards()
  })
  .catch((err) => {
    console.log(err);
  });

export { id, userNameNTitle }




