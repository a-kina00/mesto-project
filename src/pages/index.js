import './index.css'

import { Section } from '../components/section.js';

import { profilePicture, validationConfig, saveNewInfoBtn } from '../utils/const.js';

import { setPopupListener, newEditPopup } from '../modals.js';

import { PopupWithImage } from '../components/popupWithImage';

setPopupListener()

import { Card } from '../components/cards.js';

import UserInfo from '../components/userInfo.js';

import FormValidator from '../components/FormValidator.js'

import { api } from '../components/api.js'

import { renderLoading } from '../utils/utils.js'

let id = ''

// Подключение валидации (наверно куда-то надо перекинуть)

const popup1 = new FormValidator('#popup1', validationConfig)

popup1.enableValidation()

const popup2 = new FormValidator('#popup2', validationConfig)

popup2.enableValidation()

const popup3 = new FormValidator('#popup3', validationConfig)

popup3.enableValidation()

// подргужаем информацию о пользователе и карточках с сервера

const userNameNTitle = new UserInfo({ nameSelector: '.profile__name', titleSelector: '.profile__signature' },
  {
    getUserInfo: () => {
      return api.setServerInfo()
    },
    setUserInfo: (name, about) => {
      return api.changeServerInfo(name, about)
    },
    closePopup: () => { newEditPopup.close() },
    renderLoading: (button, isLoading) => { renderLoading(button, isLoading) }
  },
  { saveNewInfoBtn, profilePicture })
userNameNTitle.getUserInfo() // Тут не константа т.к Данные получают не мгновенно

api.createServerCards() //Большой промис больше не нужен
  .then((serverCards) => {
    const userStuff = userNameNTitle.getUserInfo() // Теперь записываем пришедший объект

    userNameNTitle.setUserInfo(userStuff.name, userStuff.about) // Вычеркнули api
    id = userStuff._id

    const section = new Section({
      items: serverCards,
      renderer: (obj, containerSelector) => {
        const newCard = new Card(obj, 'card',
          (elementImage, elementTitle) => {
            const newPopupWithImage = new PopupWithImage('#popup__photo');
            newPopupWithImage.setEventListeners()
            newPopupWithImage.open(elementImage, elementTitle);
          }, id,
          {
            dislikeServerCard: (cardId) => {
              return api.dislikeServerCard(cardId)
            },
            likeServerCard: (cardId) => {
              return api.likeServerCard(cardId)
            },
            deleteServerCard: (cardId) => {
              return api.deleteServerCard(cardId)
            }
          }
        )
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
