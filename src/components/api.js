import { config } from './const.js';

import { request } from './utils.js';

function setServerInfo() {
  return request('/users/me', { headers: config.headers })
}

function createServerCards() {
  return request('/cards', { headers: config.headers })
}

function deleteServerCard(cardId) {
  return request(`/cards/${cardId}`, { method: 'DELETE', headers: config.headers })
}

function likeServerCard(cardId) {
  return request(`/cards/likes/${cardId}`, { method: 'PUT', headers: config.headers })
}

function dislikeServerCard(cardId) {
  return request(`/cards/likes/${cardId}`, { method: 'DELETE', headers: config.headers })
}

function changeServerInfo(newName, newSignature) {
  return request('/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName.toString(),
      about: newSignature.toString()
    })
  })
}

function setServerPfp(pfpUrl) {
  return request('/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${pfpUrl}`
    })
  })
}

function createServerCard(cardName, cardLink) {
  return request('/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName.toString(),
      link: cardLink.toString()
    })
  })
}

export {
  setServerInfo, createServerCards, deleteServerCard, likeServerCard,
  dislikeServerCard, changeServerInfo, setServerPfp, createServerCard
}
