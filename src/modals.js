import {
  popup, editBtn, addBtn, closeBtns
} from './const.js'

function popupListener() {
  editBtn.addEventListener('click', () => {
    findRelation(editBtn)
  });

  addBtn.addEventListener('click', () => { findRelation(addBtn) });

  function findRelation(e) {
    const path = e.getAttribute('data-path');
    openPopup(document.querySelector(`[data-target='${path}']`))
  }
}

function closeListener() {

  closeBtns.forEach((button) => {
    button.addEventListener('click', () => { closePopup(button) })
  })

  popup.forEach((openedPopup) => {
    openedPopup.addEventListener('click', (evt) => {
      if (evt.target === openedPopup) { closePopup(openedPopup) }
    })
  })
}

function pressEsc(evt) {
  popup.forEach((openedPopup) => {
    if (evt.key === 'Escape') { closePopup(openedPopup) }
  })
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEsc)
}

function closePopup(item) {
  item.closest('.popup').classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEsc)
}

export { popupListener, openPopup, closeListener, closePopup };
