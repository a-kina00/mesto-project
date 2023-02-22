import '../pages/index.css';

import {
  editPopup, editName, editSignature, editInfo, editBtn, addBtn
}
from './const.js';

import { popupListener, closeListener, findRelation} from './modals.js';
popupListener();
closeListener();

import { addCards } from './cards.js';
addCards();

import { changeInfo, setInfo } from './utils.js';
setInfo()

import { enableValidation } from './validate.js';
enableValidation();


editInfo.addEventListener('submit', (evt) => {
  evt.preventDefault()

  changeInfo(editName.value, editSignature.value)
  closeListener(editPopup)
})

