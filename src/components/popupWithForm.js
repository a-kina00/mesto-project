import { Popup } from "./popup";

import { fillProfileInputs } from "./modals"

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this.submitCallback = submitCallback;
        this.popupInputs = this._getElement().querySelectorAll('.popup__input-container');
    }

    _getInputValues() {
        const values = {}
        this.popupInputs.forEach((element) => {
            values[element.id] = element.value;
        })

        return values;
    }
/*
    _setEventListeners() {
        super._setEventListeners();
        this._getElement().addEventListener('submit', (evt) => {
            evt.preventDefault();
            renderLoading(saveNewInfoBtn, true);

            changeInfo(editName.value, editSignature.value)
        })
    }*/

    open() {
        super.open()
        fillProfileInputs()
    }

    close() {
        super.close();
        this._getElement().querySelector('.popup__content').reset()
    }
}