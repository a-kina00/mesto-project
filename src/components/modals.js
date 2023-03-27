import {
  popups, editPopup, addCardPopup, editBtn, addBtn, closeBtns,
  editPfpPopup, editPfpBtn, editName, editSignature, profileName, profileSignature
} from './const.js'

import { Popup } from './popup.js';

function fillProfileInputs() {
  editName.setAttribute('value', profileName.textContent);
  editSignature.setAttribute('value', profileSignature.textContent);
}

function setPopupListener() {
  editBtn.addEventListener('click', () => {

    const popup = new Popup(editPopup)
    popup.open();
    fillProfileInputs()
  });

  addBtn.addEventListener('click', () => {
    const popup = new Popup(addCardPopup)
    popup.open();
  });

  editPfpBtn.addEventListener('click', () => {
    const popup = new Popup(editPfpPopup)
    popup.open();
  });

}
/*
function closeListener() {

  closeBtns.forEach((button) => {
    button.addEventListener('click', () => { 
      //closePopup(button) 
    })
  })

  popups.forEach((openedPopup) => {
    openedPopup.addEventListener('mouseup', (evt) => {
      if (evt.target === openedPopup) { closePopup(openedPopup) }
    })
  })
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function closePopup(item) {
  //console.log(item)
  item.closest('.popup').classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape)
}*/

export { setPopupListener};
