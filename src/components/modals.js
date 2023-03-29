import {
  popups, editPopup, addCardPopup, editBtn, addBtn, closeBtns,
  editPfpPopup, editPfpBtn, editName, editSignature, profileName, profileSignature
} from './const.js'

function fillProfileInputs() {
  editName.setAttribute('value', profileName.textContent);
  editSignature.setAttribute('value', profileSignature.textContent);
}

function setPopupListener() {
  editBtn.addEventListener('click', () => {
    openPopup(editPopup)
    fillProfileInputs()
  });

  addBtn.addEventListener('click', () => { openPopup(addCardPopup) });

  editPfpBtn.addEventListener('click', () => { openPopup(editPfpPopup) });

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
