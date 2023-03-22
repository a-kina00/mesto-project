import {
  editPopup, editName, editSignature, profileName, profileSignature,
  editInfo, editPfpPopup, profilePicture, editPfp, saveNewInfoBtn, confirmNewPfpBtn, config
}
  from './const.js';

import { closePopup } from './modals.js';

import { changeServerInfo, setServerPfp, api } from './api.js'

import { renderLoading } from './index.js'

function changeInfo(nameText, signatureText) {

  api.changeServerInfo(nameText, signatureText)
    .then((result) => {
      profileName.textContent = result.name;
      profileSignature.textContent = result.about;
      closePopup(editPopup)
    })

    .catch((err) => {
      console.log(err);
    })

    .finally(() => {
      renderLoading(saveNewInfoBtn, false)
    })

}

function checkResponse(res) {
  if (res.ok) { return res.json() } else { return Promise.reject(`Ошибка: ${res.status}`) }
}

function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse)
}

export { changeInfo, request }
