import {
  editPopup, editName, editSignature, profileName, profileSignature,
  editInfo, editPfpPopup, profilePicture, editPfp, config
}
  from './const.js';

import { closePopup } from './modals.js';

import { changeServerInfo, setServerPfp } from './api.js'

import { renderLoading } from './index.js'

function setInfo() {
  editName.setAttribute('value', profileName.textContent);
  editSignature.setAttribute('value', profileSignature.textContent);
}

function changeInfo(nameText, signatureText) {
  profileName.textContent = nameText;
  profileSignature.textContent = signatureText;

  changeServerInfo()
    .finally(() => {
      renderLoading(editInfo, false)
      closePopup(editPopup)
    })

  closePopup(editPopup);
}

function setPfp(newPfp) {
  profilePicture.src = newPfp.value

  setServerPfp(profilePicture.src)
    .finally(() => {
      renderLoading(editPfp, false)
      closePopup(editPfpPopup)
    })
}

function checkResponse(res) {
  if (res.ok) { return res.json() } else { return Promise.reject(`Ошибка: ${res.status}`) }
}

function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse)
}

export { changeInfo, setInfo, setPfp, request }
