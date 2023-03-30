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
        document.addEventListener('keydown', this._handleEscClose.bind(this))
    }

    close() {
        this._selector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this))
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }


    setEventListeners() {
        const closeBtn = this._getElement().querySelector('.popup__close')
        closeBtn.addEventListener('click', () => { this.close() })

        this._selector.addEventListener('mouseup', (evt) => {
            if (evt.target === this._selector) { this.close() }
        })
    }
}