import {
  addCardPopup, submitCard, photoPopup, photoImg, photoCaption,
  cards, cardTemplate, initialCards, photoName, photo
}
  from './const.js';

import { openPopup, closePopup} from './modals.js';

function addCards() {

  initialCards.forEach((card) => {
    cards.prepend(createCard(card[0, 0], card[0, 1]))
  })

  function createCard(cardSrc, cardText) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__img').src = cardSrc;
    cardElement.querySelector('.card__img').alt = cardText;
    cardElement.querySelector('.card__title').textContent = cardText;

    const deleteBtn = cardElement.querySelector('.card__trash');
    deleteBtn.addEventListener('click', () => { deleteBtn.closest('.card').remove() })

    const likeBtn = cardElement.querySelector('.card__like');
    likeBtn.addEventListener('click', () => { likeBtn.classList.toggle('card__like_active') })

    const currentPhoto = cardElement.querySelector('.card__img')
    const currentTitle = cardElement.querySelector('.card__title').textContent

    currentPhoto.addEventListener('click', () => {
      openPopup(photoPopup);

      photoImg.src = currentPhoto.src
      photoImg.alt = currentTitle
      photoCaption.textContent = currentTitle
    })

    return cardElement
  }

  submitCard.addEventListener('submit', (evt) => {
    evt.preventDefault()

    cards.prepend(createCard(photo.value, photoName.value))

    closePopup(addCardPopup)

    evt.target.reset()
  })
}

export {addCards};
