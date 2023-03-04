import {
  photoPopup, photoImg, photoCaption, cardTemplate
}
  from './const.js';

import { openPopup} from './modals.js';

import { deleteServerCard, likeServerCard, dislikeServerCard } from './api.js'

import { id } from './index.js'

function createCard(cardSrc, cardText, cardLikes, cardOwnerId, cardId) {

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteBtn = cardElement.querySelector('.card__trash');

  if (cardText.length > 15) {
    cardElement.setAttribute('title', cardText)
  }

  const cardImg = cardElement.querySelector('.card__img');
  cardImg.src = cardSrc;
  cardImg.alt = cardText;
  cardElement.querySelector('.card__title').textContent = cardText;

  const likeBtn = cardElement.querySelector('.card__like');
  let cardLikesValue = cardElement.querySelector('.card__like__value');

  if (cardLikes !== undefined) {
    cardLikesValue.textContent = cardLikes.length;
    cardLikes.forEach((liker) => {
      if (liker._id === id) {
        likeBtn.classList.add('card__like_active')
      }
    })
  } else { cardLikesValue = '0'; }

  likeBtn.addEventListener('click', () => {
    if (likeBtn.classList.contains('card__like_active')) {
      dislikeServerCard(cardId)

        .then((result) => {
          cardLikesValue.textContent = result.likes.length
          likeBtn.classList.toggle('card__like_active')
        })

        .catch((err) => {
          console.log(err);
        });

    } else {
      likeServerCard(cardId)

        .then((result) => {
          cardLikesValue.textContent = result.likes.length
          likeBtn.classList.toggle('card__like_active')
        })

        .catch((err) => {
          console.log(err);
        });
    }

  })

  const currentPhoto = cardImg
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
        .then(() => {
          deleteBtn.closest('.card').remove()
        })

        .catch((err) => {
          console.log(err);
        });

    })
  }

  return cardElement
}


export { createCard };
