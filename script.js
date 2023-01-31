const popup = document.querySelectorAll('.popup');
const editPopup = document.querySelector('[data-target=editProfile]');
const addCardPopup = document.querySelector('[data-target=addCard]');
const photoPopup = document.querySelector('popup__photo');


// ОТКРЫТИЕ ПОПАПОВ
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

editBtn.addEventListener('click', () => { openPopup(editBtn) });
addBtn.addEventListener('click', () => { openPopup(addBtn) });

function openPopup(e) {
  let path = e.getAttribute('data-path');
  document.querySelector(`[data-target='${path}']`).classList.add('popup_opened');
}


// ЗАКРЫТИЕ ПОПАПОВ
const closeBtn = document.querySelectorAll('.popup__close');

function closePopup(item) {
  item.closest('.popup').classList.remove('popup_opened');
}

closeBtn.forEach((button) => {
  button.addEventListener('click', () => { closePopup(button) })
})


// ДОБАВЛЕНИЕ КАРТОЧЕК
const cards = document.querySelector('.cards');

addCard("./images/mordor.jpg", 'Мордор')
addCard("./images/minas_tirit.png", 'Минас Тирит')
addCard("./images/dol_guldur.jpg", 'Дол Гулдур')
addCard("./images/edoras.jpg", 'Эдорас')
addCard("./images/rivendell.jpg", 'Ривенделл')
addCard("./images/shir.jpg", 'Шир')

const submitCard = document.querySelector('#addBtn');
let deleteBtn = document.querySelectorAll('.card__trash');
let likeBtn = document.querySelectorAll('.card__like');
let cardBtn = document.querySelectorAll('.card');

function addCard(cardSrc, cardText) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__img').src = cardSrc;
  cardElement.querySelector('.card__img').alt = cardText;
  cardElement.querySelector('.card__title').textContent = cardText;

  cards.insertBefore(cardElement, cards.firstChild)
}

submitCard.addEventListener('click', () => {
  const photoName = addCardPopup.querySelector('.popup__input-container_value_name');
  const photo = addCardPopup.querySelector('.popup__input-container_value_photo');

  addCard(photo.value, photoName.value);

  photoName.value = ''
  photo.value = ''

  addCardPopup.classList.remove('popup_opened');
  delCard()
  likeCard()
  popupCard()

})

// УДАЛЕНИЕ КАРТОЧЕК
function delCard() {
  deleteBtn = document.querySelectorAll('.card__trash');
  deleteBtn.forEach(function (delItem) {
    delItem.addEventListener('click', () => { delItem.closest('.card').remove() })
  })
}

delCard()

// ЛАЙК КАРТОЧЕК
function likeCard() {
  likeBtn = document.querySelectorAll('.card__like');
  likeBtn.forEach(function (likeItem) {
    likeItem.addEventListener('click', () => {
      likeItem.classList.toggle('card__like_active')
    })
  })
}

likeCard()

// ПРОСМОТР КАРТОЧКИ
function popupCard() {
  cardBtn = document.querySelectorAll('.card');
  cardBtn.forEach(card => {
    let currentPhoto = card.querySelector('.card__img').src
    let currentTitle = card.querySelector('.card__title').textContent

    card.querySelector('.card__img').addEventListener('click', () => {
      const photoPopup = document.querySelector('#popup__photo');
      photoPopup.classList.add('popup_opened');
      photoPopup.querySelector('.popup__image').src = currentPhoto
      photoPopup.querySelector('.popup__figure__caption').textContent = currentTitle
    })
  });
}
popupCard()

// СИНХРОНИЗАЦИЯ ИНФОРМАЦИИ СО СТРАНИЦЕ С ИНФОРМАЦИЕЙ В ПОПАПЕ
const profileName = document.querySelector('.profile__name');
const profileSignature = document.querySelector('.profile__signature');
const editName = editPopup.querySelector('.popup__input-container_value_name');
const editSignature = editPopup.querySelector('.popup__input-container_value_signature');

editName.setAttribute('value', profileName.textContent);
editSignature.setAttribute('value', profileSignature.textContent);


// ИЗМЕНЕНИЕ ИНФОРМАЦИИ О СЕБЕ
const editInfo = document.querySelector('#saveBtn');

editInfo.addEventListener('click', () => {
  const newName = editPopup.querySelector('.popup__input-container_value_name');
  const newSignature = editPopup.querySelector('.popup__input-container_value_signature');
  changeInfo(newName.value, newSignature.value)

  editPopup.classList.remove('popup_opened')
})

function changeInfo(nameText, signatureText) {
  profileName.textContent = nameText;
  profileSignature.textContent = signatureText;
}
