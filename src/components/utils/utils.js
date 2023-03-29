import {
  profileName, profileSignature, saveNewInfoBtn, config
}
  from './const.js';

import { api } from '../components/api.js'

function changeInfo(nameText, signatureText) {

  api.changeServerInfo(nameText, signatureText)
    .then((result) => {
      profileName.textContent = result.name;
      profileSignature.textContent = result.about;
    })

    .catch((err) => {
      console.log(err);
    })

    .finally(() => {
      renderLoading(saveNewInfoBtn, false)
    })

}

// отображение загрузки

function renderLoading(button, isLoading, buttonText = 'Сохранить', loadingText = 'Сохранение...') {

  if (isLoading) {
    button.textContent = loadingText
  }
  else {
    button.textContent = buttonText
  }
}

function checkResponse(res) {
  if (res.ok) { return res.json() } else { return Promise.reject(`Ошибка: ${res.status}`) }
}

function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse)
}

export { changeInfo, request, renderLoading }
