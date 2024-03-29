import { Popup } from "./popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, { submitCallback }) {
        super(popupSelector)
        this.submitCallback = submitCallback;
        this.popupInputs = this._popupElement.querySelectorAll('.popup__input-container');
        this._popupForm = this._popupElement.querySelector('.popup__content');
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

            const initialText= this.popupButton.textContent;

            this.popupButton.textContent = 'Сохранение...';

            this.submitCallback(this._getInputValues(), initialText, this.popupButton);
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
