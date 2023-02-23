import '../pages/index.css';

import {
  editPopup, editName, editSignature, editInfo
}
from './const.js';

import { setPopupListener, closeListener, closePopup} from './modals.js';
setPopupListener();
closeListener();

import { addCards } from './cards.js';
addCards();

import { changeInfo } from './utils.js';

import { enableValidation } from './validate.js';
enableValidation();


editInfo.addEventListener('submit', (evt) => {
  evt.preventDefault()

  changeInfo(editName.value, editSignature.value)
  closePopup(editPopup)
})

