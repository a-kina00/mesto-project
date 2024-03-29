import './index.css'

import { Section } from '../components/section.js';

import { profilePicture, validationConfig, saveNewInfoBtn } from '../utils/const.js';

import { setPopupListener, newEditPopup, createCard } from '../modals.js';

setPopupListener()

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
    renderLoading: (button, isLoading) => { renderLoading(button, isLoading) },
    setServerPfp: (src) => {
      return api.setServerPfp(src)
    }
  },
  { saveNewInfoBtn, profilePicture })
userNameNTitle.getUserInfo() // Тут не константа т.к Данные получают не мгновенно


export const section = new Section({
  renderer: (obj, containerSelector, {append}) => {
    if (append == false) {
      containerSelector.append(createCard(obj).generate())
    } else if (append == true) {
      containerSelector.prepend(createCard(obj).generate())
    }
  }
},
  'cards')


api.createServerCards() //Большой промис больше не нужен
  .then((serverCards) => {
    const userStuff = userNameNTitle.getUserInfo() // Теперь записываем пришедший объект

    userNameNTitle.setUserInfo(userStuff.name, userStuff.about) // Вычеркнули api
    id = userStuff._id

    section.initialCards(serverCards)
  })
  .catch((err) => {
    console.log(err);
  });

export { id, userNameNTitle }