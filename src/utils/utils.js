import {
  config
}
  from './const.js';


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

export { request, renderLoading }
