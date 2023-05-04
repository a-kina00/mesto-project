import { Popup } from "./popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector, src, title) {
        super(popupSelector);
        this._imagePlace = this._popupElement.querySelector('.popup__image');
        this._captionPlace = this._popupElement.querySelector('.popup__figure__caption');
        this._src = src;
        this._title = title;
    }

    open(src, title) {
        super.open();
        this._imagePlace.src = src
        this._imagePlace.alt = title;
        this._captionPlace.textContent = title;
    }

    setEventListeners() {
        super.setEventListeners();
    }
}
