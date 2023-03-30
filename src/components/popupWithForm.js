import { Popup } from "./popup";

import { profileName, profileSignature } from "../utils/const";

import { fillProfileInputs } from "../modals"

import { renderLoading } from '../utils/utils.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, { submitCallback }) {
        super(popupSelector);
        this.submitCallback = submitCallback;
        this.popupInputs = this._getElement().querySelectorAll('.popup__input-container');
        this._popupForm = this._getElement().querySelector('.popup__content');
        this.popupButton = this._popupForm.querySelector('.button');
    }

    _getInputValues() {
        const values = {}
        this.popupInputs.forEach((element) => {
            values[element.id] = element.value;
        })

        return values;
    }

    setInputValues(data) {
        this.popupInputs.forEach((input) => {
            input.value = data[input.id]
        })
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            renderLoading(this.popupButton, true);
            console.log(this.popupButton.textContent)

            this.submitCallback(this._getInputValues());
            this.close();
        })

    }

    open() {
        super.open()
    }

    close() {
        super.close();
        this._popupForm.reset()
    }
}
