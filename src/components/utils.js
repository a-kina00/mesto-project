import {
  editPopup, editName, editSignature, profileName, profileSignature, profilePicture
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
