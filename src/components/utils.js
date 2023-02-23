import {
  editName, editSignature, profileName, profileSignature, editPopup
} from './const.js';

import { closePopup } from './modals.js';

function setInfo() {
  editName.setAttribute('value', profileName.textContent);
  editSignature.setAttribute('value', profileSignature.textContent);
}

function changeInfo(nameText, signatureText) {
  profileName.textContent = nameText;
  profileSignature.textContent = signatureText;
  closePopup(editPopup);
}

export { changeInfo, setInfo }
