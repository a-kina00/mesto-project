import {
  popups, editPopup, addCardPopup, editBtn, addBtn, closeBtns,
  editPfpPopup, editPfpBtn, editName, editSignature, profileName, profileSignature
} from './const.js'

import { Popup } from './popup.js';

import { PopupWithForm } from './popupWithForm';

function fillProfileInputs() {
  editName.setAttribute('value', profileName.textContent);
  editSignature.setAttribute('value', profileSignature.textContent);
}

function setPopupListener() {
  editBtn.addEventListener('click', () => {

    const popup = new PopupWithForm(editPopup, '')
    popup.open();
  });

  addBtn.addEventListener('click', () => {
    const popup = new PopupWithForm(addCardPopup, '')
    popup.open();
  });

  editPfpBtn.addEventListener('click', () => {
    const popup = new PopupWithForm(editPfpPopup, '')
    popup.open();
  });

}

export { setPopupListener, fillProfileInputs};
