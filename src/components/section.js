export class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this.containerSelector = containerSelector;
    this.cardContainer = document.querySelector(`.${this.containerSelector}`)
  }

  initialCards() {
    this.items.forEach(element => {
      this.renderer(element, this.cardContainer)
    });
  }

  addItem() {
    this.renderer(this.items, this.cardContainer)
  }
}

