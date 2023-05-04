export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupElement = document.getElementById(`${this._popup.id}`);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose)
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }


    setEventListeners() {
        const closeBtn = this._popupElement.querySelector('.popup__close')
        closeBtn.addEventListener('click', () => {
          this.close() })

        this._popup.addEventListener('mouseup', (evt) => {
            if (evt.target === this._popup) { this.close() }
        })
    }
}

