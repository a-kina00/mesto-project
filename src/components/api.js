import {
  editPopup, submitCard, profileName, profileSignature, cards,
  editInfo, editPfpPopup, profilePicture, editPfp, delPopup
}

  from './const.js';

import { createCard } from './cards.js';

import { changeInfo } from './utils.js';

import { setPopupListener, openPopup, closeListener, closePopup } from './modals.js'

import { renderLoading } from './index.js'

let id = ''

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'de8fea61-ac5b-4c42-a352-8c78fb2afa7a',
    'Content-Type': 'application/json'
  }
}

function setServerInfo() {
  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) { return res.json() } else { return Promise.reject(`Ошибка: ${res.status}`) }
    })
    .then((result) => {
      changeInfo(result.name, result.about)
      profilePicture.src = result.avatar
      id = result._id
    })

    .catch((err) => {
      console.log(err);
    });
}

function createServerCards() {
  fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) { return res.json() } else { return Promise.reject(`Ошибка: ${res.status}`) }
    })
    .then((result) => {
      result.forEach((card) => {
        cards.append(createCard(card.link, card.name, card.likes, card.owner._id, card._id))
      })
    })

    .catch((err) => {
      console.log(err);
    });
}

function deleteServerCard(cardId) {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .finally(() => {
    renderLoading(delPopup, false, 'Да')
   closePopup(delPopup) })
}

function likeServerCard(cardId) {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  });
}

function dislikeServerCard(cardId) {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  });
}

function changeServerInfo() {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName.textContent.toString(),
      about: profileSignature.textContent.toString()
    })
  })
  .finally(() => {
    renderLoading(editInfo, false, 'Сохранить')
    closePopup(editPopup) })
}

function setServerPfp(pfpUrl) {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${pfpUrl}`
    })
  })
  .finally(() => {
    renderLoading(editPfp, false, 'Сохранить')
    closePopup(editPfpPopup) })
}

function createServerCard(cardName, cardLink) {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName.toString(),
      link: cardLink.toString()
    })
  })
  .finally(() => {
    renderLoading(submitCard, false, 'Создать')
   closePopup(submitCard) })
}


export {
  setServerInfo, createServerCards, deleteServerCard,
  likeServerCard, dislikeServerCard, changeServerInfo, setServerPfp, createServerCard,
  id
}
