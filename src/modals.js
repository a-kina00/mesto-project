import {
  editBtn, addBtn, editPfpBtn, profileName, profileSignature, profilePicture
} from './utils/const.js'

import { PopupWithForm } from './components/popupWithForm';

import { section } from './pages/index.js';

import { Card } from './components/cards.js';

import { api } from './components/api.js';

import { id, userNameNTitle } from './pages/index.js';

import { PopupWithImage } from './components/popupWithImage.js';

const newEditPopup = new PopupWithForm('#editProfile', {
  submitCallback: (item) => {
    userNameNTitle.setUserInfo(item["user-name"], item["user-signature"]);
  }
})
newEditPopup.setEventListeners();


function createCard(item) {
  const newPopupWithImage = new PopupWithImage('#popup__photo');
  newPopupWithImage.setEventListeners()

  const newCard = new Card(item, 'card',
    (elementImage, elementTitle) => {
      newPopupWithImage.open(elementImage, elementTitle);
    }, id,
    {
      dislikeServerCard: (cardId) => {
        return api.dislikeServerCard(cardId)
      },
      likeServerCard: (cardId) => {
        return api.likeServerCard(cardId)
      },
      deleteServerCard: (cardId) => {
        return api.deleteServerCard(cardId)
      }
    }
  )
  return newCard
}

const newAddCardPopup = new PopupWithForm('#addCard',
  {
    submitCallback: (item, initialText, button) => {

      api.createServerCard(item["photo-name"], item["photo-url"])
        .then((result) => {
          section.addItem(result)
          newAddCardPopup.close();
        })

        .catch((err) => {
          console.log(err);
        })

        .finally(() => {
          button.textContent = initialText;
        })

    }
  })
newAddCardPopup.setEventListeners();

const newEditPfpPopup = new PopupWithForm('#editPfp',
  {
    submitCallback: (item, initialText, button) => {

      userNameNTitle._setServerPfr(item["pfp-url"])
        .then((result) => {
          profilePicture.src = result.avatar
          newEditPfpPopup.close();
        })

        .catch((err) => {
          console.log(err);
        })

        .finally(() => {
          button.textContent = initialText;
        })
    }
  })
newEditPfpPopup.setEventListeners();

function setPopupListener() {
  editBtn.addEventListener('click', () => {
    newEditPopup.open();
    newEditPopup.setInputValues({ 'user-name': profileName.textContent, 'user-signature': profileSignature.textContent })
  });


  addBtn.addEventListener('click', () => {
    newAddCardPopup.open();
  });

  editPfpBtn.addEventListener('click', () => {
    newEditPfpPopup.open();
  });

}



export { setPopupListener, newEditPopup, newEditPfpPopup, createCard };
