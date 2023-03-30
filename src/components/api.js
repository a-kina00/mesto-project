

import { request } from '../utils/utils.js';

class Api {
  constructor(config) {
    this.config = config
  }

  setServerInfo() {
    return request('/users/me', { headers: this.config.headers })
  }

  createServerCards() {
    return request('/cards', { headers: this.config.headers })
  }

  deleteServerCard(cardId) {
    return request(`/cards/${cardId}`, { method: 'DELETE', headers: this.config.headers })
  }

  likeServerCard(cardId) {
    return request(`/cards/likes/${cardId}`, { method: 'PUT', headers: this.config.headers })
  }

  dislikeServerCard(cardId) {
    return request(`/cards/likes/${cardId}`, { method: 'DELETE', headers: this.config.headers })
  }

  changeServerInfo(newName, newSignature) {
    return request('/users/me', {
      method: 'PATCH',
      headers: this.config.headers,
      body: JSON.stringify({
        name: newName.toString(),
        about: newSignature.toString()
      })
    })
  }

  setServerPfp(pfpUrl) {
    return request('/users/me/avatar', {
      method: 'PATCH',
      headers: this.config.headers,
      body: JSON.stringify({
        avatar: `${pfpUrl}`
      })
    })
  }

  createServerCard(cardName, cardLink) {
    return request('/cards', {
      method: 'POST',
      headers: this.config.headers,
      body: JSON.stringify({
        name: cardName.toString(),
        link: cardLink.toString()
      })
    })
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'de8fea61-ac5b-4c42-a352-8c78fb2afa7a',
    'Content-Type': 'application/json'
  }
})

export { api }
