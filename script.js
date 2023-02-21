const popup = document.querySelectorAll('.popup');

const editPopup = document.querySelector('[data-target=editProfile]');
const editName = editPopup.querySelector('.popup__input-container_value_name');
const editSignature = editPopup.querySelector('.popup__input-container_value_signature');

const addCardPopup = document.querySelector('[data-target=addCard]');

const photoPopup = document.querySelector('#popup__photo');
const photoImg = photoPopup.querySelector('.popup__image');
const photoCaption = photoPopup.querySelector('.popup__figure__caption');

const profileName = document.querySelector('.profile__name');
const profileSignature = document.querySelector('.profile__signature');


// ОТКРЫТИЕ ПОПАПОВ
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

editBtn.addEventListener('click', () => {
  findRelation(editBtn)
  setInfo()
});

function setInfo() {
  editName.setAttribute('value', profileName.textContent);
  editSignature.setAttribute('value', profileSignature.textContent);
}

addBtn.addEventListener('click', () => { findRelation(addBtn) });

function findRelation(e) {
  const path = e.getAttribute('data-path');
  openPopup(document.querySelector(`[data-target='${path}']`))
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', pressEsc)
}


// ЗАКРЫТИЕ ПОПАПОВ
const closeBtns = document.querySelectorAll('.popup__close');

function closePopup(item) {
  item.closest('.popup').classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEsc)
  setInfo()
}

closeBtns.forEach((button) => {
  button.addEventListener('click', () => { closePopup(button) })
})

function pressEsc(evt) {
  popup.forEach((openedPopup) => {
    if (evt.key === 'Escape') { closePopup(openedPopup) }
  })
}

popup.forEach((openedPopup) => {
  openedPopup.addEventListener('click', (evt) => {
    if (evt.target === openedPopup) { closePopup(openedPopup) }
  })
})

// ДОБАВЛЕНИЕ КАРТОЧЕК
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;


const initialCards = [["../images/mordor.jpg", 'Мордор'],
["../images/minas_tirit.png", 'Минас Тирит'],
["../images/dol_guldur.jpg", 'Дол Гулдур'],
["../images/edoras.jpg", 'Эдорас'],
["../images/rivendell.jpg", 'Ривенделл'],
["../images/shir.jpg", 'Шир']]

initialCards.forEach((card) => {
  cards.prepend(createCard(card[0, 0], card[0, 1]))
})


const submitCard = addCardPopup.querySelector('.popup__content');

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

const photoName = addCardPopup.querySelector('.popup__input-container_value_name');
const photo = addCardPopup.querySelector('.popup__input-container_value_photo');

submitCard.addEventListener('submit', (evt) => {
  evt.preventDefault()

  cards.prepend(createCard(photo.value, photoName.value))

  closePopup(addCardPopup)

  evt.target.reset()
})

// ИЗМЕНЕНИЕ ИНФОРМАЦИИ О СЕБЕ
const editInfo = editPopup.querySelector('.popup__content')


editInfo.addEventListener('submit', (evt) => {
  evt.preventDefault()

  changeInfo(editName.value, editSignature.value)
  closePopup(editPopup)
})

function changeInfo(nameText, signatureText) {
  profileName.textContent = nameText;
  profileSignature.textContent = signatureText;
}

// ВАЛИДАЦИЯ

const inputList = Array.from(document.querySelectorAll('.popup__input-container'))

function showInputError(popupElement, inputElement, errorMessage) {
  const inputError = popupElement.querySelector(`.${inputElement.id}-error`)
  inputError.textContent = errorMessage
}

function hideInputError(popupElement, inputElement) {
  const inputError = popupElement.querySelector(`.${inputElement.id}-error`)
  inputError.textContent = ''
}

function checkInputValidity(popupElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(popupElement, inputElement)
  }
}

function setEventListeners(popupElement) {
  const inputList = Array.from(popupElement.querySelectorAll('.popup__input-container'))
  const buttonElement = popupElement.querySelector('.popup__save-button')

  toggleButtonState(inputList, buttonElement)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(popupElement, inputElement)
      toggleButtonState(inputList, buttonElement)
    })
  })
}

function enableValidation() {
  const popupList = Array.from(document.querySelectorAll('.popup'))
  popupList.pop()
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(popupElement)
  })
}

function hasInvalidInput(popupList) {
  return popupList.some((input) => {
    return !input.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_disabled')
  } else {
    buttonElement.classList.remove('button_disabled')
  }
}

enableValidation()
