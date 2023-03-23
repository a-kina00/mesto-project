export class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this.containerSelector = containerSelector
  }

  _container() {
    const cardContainer = document.querySelector(`.${this.containerSelector}`);
    return cardContainer
  }

  initialCards() {
    this.items.forEach(element => {
      this.renderer(element, this._container())
    });
  }

  addItem() {
    this.renderer(this.items, this._container())
  }
}

