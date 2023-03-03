import {
  photoPopup, photoImg, photoCaption, cardTemplate, delPopup, delCardBtn, delPopupContent
}
  from './const.js';

import { openPopup, closePopup } from './modals.js';

import { deleteServerCard, likeServerCard, dislikeServerCard } from './api.js'

import { renderLoading, id } from './index.js'

function createCard(cardSrc, cardText, cardLikes, cardOwnerId, cardId) {

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteBtn = cardElement.querySelector('.card__trash');

  if (cardText.length > 15) {
    cardElement.setAttribute('title', cardText)
  }

  cardElement.querySelector('.card__img').src = cardSrc;
  cardElement.querySelector('.card__img').alt = cardText;
  cardElement.querySelector('.card__title').textContent = cardText;

  const likeBtn = cardElement.querySelector('.card__like');

  if (cardLikes !== undefined) {
    cardElement.querySelector('.card__like__value').textContent = cardLikes.length;
    cardLikes.forEach((liker) => {
      if (liker._id === id) {
        likeBtn.classList.add('card__like_active')
      }
    })
  } else { cardElement.querySelector('.card__like__value').textContent = '0'; }

  likeBtn.addEventListener('click', () => {
    if (likeBtn.classList.contains('card__like_active')) {
      dislikeServerCard(cardId)
      cardElement.querySelector('.card__like__value').textContent--
    } else {
      likeServerCard(cardId)
      cardElement.querySelector('.card__like__value').textContent++
    }
    likeBtn.classList.toggle('card__like_active')
  })

  const currentPhoto = cardElement.querySelector('.card__img')
  const currentTitle = cardElement.querySelector('.card__title').textContent

  currentPhoto.addEventListener('click', () => {
    openPopup(photoPopup);

    photoImg.src = currentPhoto.src
    photoImg.alt = currentTitle
    photoCaption.textContent = currentTitle
  })

  if ((cardOwnerId === id) || (cardLikes === undefined)) {
    deleteBtn.classList.remove('card__trash_disabled');
    deleteBtn.addEventListener('click', () => {
      deleteServerCard(cardId)
      deleteBtn.closest('.card').remove()
    })
  }

  return cardElement
}


export { createCard };
