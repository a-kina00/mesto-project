const popups = document.querySelectorAll('.popup');

const editPopup = document.querySelector('[data-target=editProfile]');
const editName = editPopup.querySelector('.popup__input-container_value_name');
const editSignature = editPopup.querySelector('.popup__input-container_value_signature');
const editInfo = editPopup.querySelector('.popup__content');
const saveNewInfoBtn = editInfo.querySelector('.button');

const addCardPopup = document.querySelector('[data-target=addCard]');
const submitCard = addCardPopup.querySelector('.popup__content');
const submitingCardBtn = submitCard.querySelector('.button');

const editPfpPopup = document.querySelector('[data-target=editPfp]');
const newPfp = editPfpPopup.querySelector('.popup__input-container_value_pfp');
const editPfp = editPfpPopup.querySelector('.popup__content');
const confirmNewPfpBtn = editPfp.querySelector('.button')

const photoPopup = document.querySelector('#popup__photo');
const photoImg = photoPopup.querySelector('.popup__image');
const photoCaption = photoPopup.querySelector('.popup__figure__caption');

const delPopup = document.querySelector('#delCard');
const delPopupContent = delPopup.querySelector('.popup__content');
const delCardBtn = delPopupContent.querySelector('.popup__save-button')

const profileName = document.querySelector('.profile__name');
const profileSignature = document.querySelector('.profile__signature');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const editPfpBtn = document.querySelector('.profile__img-edit');
const closeBtns = document.querySelectorAll('.popup__close');

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;

import logo from '../images/logo.svg';

const mainLogo =document.querySelector('.header__logo');
mainLogo.setAttribute('src', logo);

const profilePicture = document.querySelector('.profile__img');

const photoName = addCardPopup.querySelector('.popup__input-container_value_name');
const photo = addCardPopup.querySelector('.popup__input-container_value_photo');

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
  headers: {
    authorization: 'de8fea61-ac5b-4c42-a352-8c78fb2afa7a',
    'Content-Type': 'application/json'
  }
}


export {
  popups, editPopup, editName, editSignature, addCardPopup, submitCard,
  photoPopup, photoImg, photoCaption, profileName, profileSignature,
  editBtn, addBtn, closeBtns, cards, cardTemplate, editInfo,
  photoName, photo, editPfpPopup, newPfp, editPfpBtn, profilePicture, editPfp,
  delPopup, delCardBtn, delPopupContent, saveNewInfoBtn, submitingCardBtn,confirmNewPfpBtn, config
}
