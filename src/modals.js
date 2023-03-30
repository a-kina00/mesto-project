import {
  editPopup, addCardPopup, editBtn, addBtn, closeBtns, confirmNewPfpBtn, submitingCardBtn,
  editPfpPopup, editPfpBtn, editName, editSignature, profileName, profileSignature, profilePicture
} from './utils/const.js'

import { PopupWithForm } from './components/popupWithForm';

import { Section } from './components/section.js';

import { Card } from './components/cards.js';

import { renderLoading } from './utils/utils.js';

import { api } from './components/api.js';

import { userNameNTitle } from './pages/index.js';

import { PopupWithImage } from './components/popupWithImage.js';

const newEditPopup = new PopupWithForm('#editProfile', {
  submitCallback: (item) => {
    userNameNTitle.setUserInfo(item["user-name"], item["user-signature"]);
  }
})

newEditPopup.setEventListeners();

const newAddCardPopup = new PopupWithForm('#addCard',
  {
    submitCallback: (item) => {

      api.createServerCard(item["photo-name"], item["photo-url"])
        .then((result) => {
          //привязка к объекту карточки
          const newCardObj = result;
          const section = new Section({
            items: newCardObj,
            renderer: (obj, containerSelector) => {
              const newCard = new Card(obj, 'card',
                (elementImage, elementTitle) => {
                  const popup = new PopupWithImage('#popup__photo',
                    elementImage.src,
                    elementTitle.textContent);
                  popup.setEventListeners()
                  popup.open();
                })
              containerSelector.prepend(newCard.generate());
            }
          }, 'cards')

          section.addItem()
        })

        .catch((err) => {
          console.log(err);
        })

        .finally(() => {
          renderLoading(submitingCardBtn, false, 'Создать', 'Cоздание...')
        })

    }
  })
newAddCardPopup.setEventListeners();

const newEditPfpPopup = new PopupWithForm('#editPfp',
  {
    submitCallback: (item) => {

      api.setServerPfp(item["pfp-url"])
        .then((result) => {
          profilePicture.src = result.avatar
          newEditPfpPopup.close();
        })

        .catch((err) => {
          console.log(err);
        })

        .finally(() => {
          renderLoading(confirmNewPfpBtn, false)
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



export { setPopupListener, newEditPopup };
