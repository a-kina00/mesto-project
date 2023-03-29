import {
  popups, editPopup, addCardPopup, editBtn, addBtn, closeBtns, confirmNewPfpBtn, submitingCardBtn,
  editPfpPopup, editPfpBtn, editName, editSignature, profileName, profileSignature, profilePicture
} from './utils/const.js'

import { PopupWithForm } from './components/popupWithForm';

import { Section } from './section.js';

import { Card } from './components/cards.js';

import { renderLoading } from './utils/utils.js';

import { api } from './components/api.js';

import { userNameNTitle } from './index.js';

function fillProfileInputs() {
  editName.setAttribute('value', profileName.textContent);
  editSignature.setAttribute('value', profileSignature.textContent);
}

function setPopupListener() {
  editBtn.addEventListener('click', () => {

    const popup = new PopupWithForm(editPopup, {
      submitCallback: (item) => {
        userNameNTitle.setUserInfo(item["user-name"], item["user-signature"]);
      }
    })
    popup.open();
  });


  addBtn.addEventListener('click', () => {
    const popup = new PopupWithForm(addCardPopup,
      {
        submitCallback: (item) => {

          api.createServerCard(item["photo-name"], item["photo-url"])
            .then((result) => {
              //привязка к объекту карточки
              const newCardObj = result;
              const section = new Section({
                items: newCardObj,
                renderer: (obj, containerSelector) => {
                  const newCard = new Card(obj);
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
    popup.open();
  });

  editPfpBtn.addEventListener('click', () => {
    const popup = new PopupWithForm(editPfpPopup,
      {
        submitCallback: (item) => {

          api.setServerPfp(item["pfp-url"])
            .then((result) => {
              profilePicture.src = result.avatar
            })

            .catch((err) => {
              console.log(err);
            })

            .finally(() => {
              renderLoading(confirmNewPfpBtn, false)
            })
        }
      })


    popup.open();
  });

}



export { setPopupListener, fillProfileInputs };
