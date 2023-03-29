import { Popup } from "./popup";

import { fillProfileInputs } from "../modals"

import { renderLoading } from '../utils/utils.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, { submitCallback }) {
        super(popupSelector);
        this.submitCallback = submitCallback;
        this.popupInputs = this._getElement().querySelectorAll('.popup__input-container');
        this.popupForm = this._getElement().querySelector('.popup__content');
        this.popupButton = this.popupForm.querySelector('.button');
    }

    _getInputValues() {
        const values = {}
        this.popupInputs.forEach((element) => {
            values[element.id] = element.value;
        })

        return values;
    }

    _setEventListeners() {
        super._setEventListeners();

        this.popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            renderLoading(this.popupButton, true);

            this.submitCallback(this._getInputValues());
            this.close();
        }, { once: true })

    }

    open() {
        super.open()
        fillProfileInputs()
    }

    close() {
        super.close();
        this.popupForm.reset()
    }
}
