import {
  popups, editBtn, addBtn, closeBtns, editPfpBtn
} from './const.js'

import { setInfo } from './utils.js';

function setPopupListener() {
  editBtn.addEventListener('click', () => {
    findRelation(editBtn)
    setInfo()
  });

  addBtn.addEventListener('click', () => { findRelation(addBtn) });

  editPfpBtn.addEventListener('click', () => { findRelation(editPfpBtn) });

  function findRelation(e) {
    const path = e.getAttribute('data-path');
    openPopup(document.querySelector(`[data-target='${path}']`))
  }
}

function closeListener() {

  closeBtns.forEach((button) => {
    button.addEventListener('click', () => { closePopup(button) })
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

function openPopup(popups) {
  popups.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape)
}

function closePopup(item) {
  item.closest('.popup').classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape)
}

export { setPopupListener, openPopup, closeListener, closePopup };
