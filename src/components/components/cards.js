import {
  photoPopup
}
  from '../utils/const.js';

import { api } from './api.js'

import { id } from '../index.js'

import { PopupWithImage } from './popupWithImage.js';

//СОЗДАЁМ КАРТОЧКУ
export class Card {
  constructor(elementObj, templateSelector = 'card') {
    this.templateSelector = templateSelector;
    this.elementObj = elementObj;
  }

  //Получаем элемент разметки из шаблона
  _getElement() {
    const cardElement = document.getElementById(`${this.templateSelector}`).content.cloneNode(true);
    return cardElement;
  }

  //Создаем карточку
  generate() {
    this._element = this._getElement();
    this._elementDeleteButton = this._element.querySelector('.card__trash');
    this._elementImage = this._element.querySelector('.card__img');
    this._elementTitle = this._element.querySelector('.card__title');
    this._likeBtn = this._element.querySelector('.card__like')
    this._cardLikesValue = this._element.querySelector('.card__like__value')
    this._setEventListeners();
    this._elementImage.src = this.elementObj.link;
    this._elementImage.alt = `Здесь должна быть фотография ${this.elementObj.name}`;
    this._elementTitle.textContent = this.elementObj.name;
    this._cardLikesValue.textContent = this.elementObj.likes.length;

    //Включаем "корзину" для своих карточек
    if (this.elementObj.owner._id === id) {
      this._elementDeleteButton.classList.remove('card__trash_disabled');
    }

    //Подгрузка лайкнутых "сердечек"
    if (this.elementObj.likes !== undefined) {
      this._cardLikesValue.textContent = this.elementObj.likes.length;
      this.elementObj.likes.forEach((liker) => {
        if (liker._id === id) {
          this._likeBtn.classList.add('card__like_active')
        }
      })
    } else { this._cardLikesValue = '0'; }
    return this._element
  }

  _setEventListeners() {

    //Лайк карточки
    this._likeBtn.addEventListener('click', () => {
      if (this._likeBtn.classList.contains('card__like_active')) {
        api.dislikeServerCard(this.elementObj._id)
          .then((result) => {
            this._cardLikesValue.textContent = result.likes.length
            this._likeBtn.classList.toggle('card__like_active')
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.likeServerCard(this.elementObj._id)
          .then((result) => {
            this._cardLikesValue.textContent = result.likes.length
            this._likeBtn.classList.toggle('card__like_active')
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })

    //Попап превью
    this._elementImage.addEventListener('click', () => {
      const popup = new PopupWithImage(photoPopup, 
          this._elementImage.src, 
          this._elementTitle.textContent);
      popup.open();
    })

    //Удаление карточки
    this._elementDeleteButton.addEventListener('click', () => {
      api.deleteServerCard(this.elementObj._id)
        .then(() => {
          this._elementDeleteButton.closest('.card').remove()
        })
        .catch((err) => {
          console.log(err);
        });
    })
  }
}


