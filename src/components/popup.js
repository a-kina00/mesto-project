export class Popup {
    constructor(popupSelector) {
        this._selector = popupSelector;
    }

    _getElement() {
        const popupElement = document.getElementById(`${this._selector.getAttribute('id')}`);
        return popupElement;
    }

    open() {
        this._selector.classList.add('popup_opened');
        this._setEventListeners()
        this._selector.addEventListener('keydown', this._handleEscClose)
        //console.log(this._selector)
    }

    close() {
        this._selector.classList.remove('popup_opened');
        // this.popup.removeEventListener('keydown', closeByEscape)
    }

    _handleEscClose(evt) {
        console.log(this._selector)
        if (evt.key === 'Escape') {
            console.log("!!!")
        }
    }


    _setEventListeners() {
        const closeBtn = this._getElement().querySelector('.popup__close')
        closeBtn.addEventListener('click', () => { this.close() })

        this._selector.addEventListener('mouseup', (evt) => {
            if (evt.target === this._selector) { this.close() }
        })
    }
}
/*


class PopupWithForm extends Popup {
    constructor(popupSelector, callback) {
        this.popupSelector = super(_selector);
        this.callback = callback;
    }

    _getInputValues() {
        editName.setAttribute('value', profileName.textContent);
        editSignature.setAttribute('value', profileSignature.textContent);
    }
}*/