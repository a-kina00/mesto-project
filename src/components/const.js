const popups = document.querySelectorAll('.popup');

const editPopup = document.querySelector('[data-target=editProfile]');
const editName = editPopup.querySelector('.popup__input-container_value_name');
const editSignature = editPopup.querySelector('.popup__input-container_value_signature');

const addCardPopup = document.querySelector('[data-target=addCard]');
const submitCard = addCardPopup.querySelector('.popup__content');

const photoPopup = document.querySelector('#popup__photo');
const photoImg = photoPopup.querySelector('.popup__image');
const photoCaption = photoPopup.querySelector('.popup__figure__caption');

const profileName = document.querySelector('.profile__name');
const profileSignature = document.querySelector('.profile__signature');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closeBtns = document.querySelectorAll('.popup__close');

const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;

import logo from '../images/logo.svg';
import pfp from '../images/image.jpg';

const mainLogo =document.querySelector('.header__logo');
mainLogo.setAttribute('src', logo);

const profilePicture = document.querySelector('.profile__img');
profilePicture.setAttribute('src', pfp);

import shir from '../images/shir.jpg';
import mordor from '../images/mordor.jpg';
import minas_tirit from '../images/minas_tirit.png';
import dol_guldur from '../images/dol_guldur.jpg';
import edoras from '../images/edoras.jpg';
import rivendell from '../images/rivendell.jpg';

const initialCards = [[mordor, 'Мордор'],
[minas_tirit, 'Минас Тирит'],
[dol_guldur, 'Дол Гулдур'],
[edoras, 'Эдорас'],
[rivendell, 'Ривенделл'],
[shir, 'Шир']]

const photoName = addCardPopup.querySelector('.popup__input-container_value_name');
const photo = addCardPopup.querySelector('.popup__input-container_value_photo');

const editInfo = editPopup.querySelector('.popup__content')


export {
  popups, editPopup, editName, editSignature, addCardPopup, submitCard,
  photoPopup, photoImg, photoCaption, profileName, profileSignature,
  editBtn, addBtn, closeBtns, cards, cardTemplate, initialCards, editInfo,
  photoName, photo
}
