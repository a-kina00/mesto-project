import { Popup } from "./popup";

import {
    photoImg, photoCaption
}
    from '../utils/const.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector, src, title) {
        super(popupSelector);
        this._src = src;
        this._title = title;
    }

    open() {
        super.open();
        photoImg.src = this._src;
        photoImg.alt = this._title;
        photoCaption.textContent = this._title;
    }

    setEventListeners() {
      super.setEventListeners();
    }
}
