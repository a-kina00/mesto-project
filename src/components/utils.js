import {
  popups, editPopup, editName, editSignature, addCardPopup, submitCard,
  photoPopup, photoImg, photoCaption, profileName, profileSignature,
  editBtn, addBtn, closeBtns, cards, cardTemplate, editInfo,
  photoName, photo, editPfpPopup, newPfp, editPfpBtn, profilePicture, editPfp,
  delPopup, delCardBtn
}
from './const.js';

import { closePopup } from './modals.js';

import {changeServerInfo, setServerPfp} from './api.js'

function setInfo() {
  editName.setAttribute('value', profileName.textContent);
  editSignature.setAttribute('value', profileSignature.textContent);
}

function changeInfo(nameText, signatureText) {
  profileName.textContent = nameText;
  profileSignature.textContent = signatureText;
  changeServerInfo();
  closePopup(editPopup);
}

function setPfp(newPfp) {
  profilePicture.src = newPfp.value
  setServerPfp(profilePicture.src)
}

export { changeInfo, setInfo, setPfp }
