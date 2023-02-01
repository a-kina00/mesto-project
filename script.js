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
  editName.setAttribute('value', profileName.textContent);
  editSignature.setAttribute('value', profileSignature.textContent);
});

addBtn.addEventListener('click', () => { findRelation(addBtn) });

function findRelation(e) {
  const path = e.getAttribute('data-path');
  openPopup(document.querySelector(`[data-target='${path}']`))
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}


// ЗАКРЫТИЕ ПОПАПОВ
const closeBtns = document.querySelectorAll('.popup__close');

function closePopup(item) {
  item.closest('.popup').classList.remove('popup_opened');
}

closeBtns.forEach((button) => {
  button.addEventListener('click', () => { closePopup(button) })
})


// ДОБАВЛЕНИЕ КАРТОЧЕК
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;


const initialCards = [["./images/mordor.jpg", 'Мордор'],
["./images/minas_tirit.png", 'Минас Тирит'],
["./images/dol_guldur.jpg", 'Дол Гулдур'],
["./images/edoras.jpg", 'Эдорас'],
["./images/rivendell.jpg", 'Ривенделл'],
["./images/shir.jpg", 'Шир']]

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
const editInfo = editPopup.querySelector('.popup__content');

editInfo.addEventListener('submit', (evt) => {
  evt.preventDefault()

  changeInfo(editName.value, editSignature.value)
  closePopup(editPopup)
})

function changeInfo(nameText, signatureText) {
  profileName.textContent = nameText;
  profileSignature.textContent = signatureText;
}
