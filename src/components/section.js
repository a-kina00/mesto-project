export class Section {
  constructor({ renderer }, containerSelector) {
    // this.items = items;
    this.renderer = renderer;
    this.containerSelector = containerSelector;
    this.cardContainer = document.querySelector(`.${this.containerSelector}`)
  }

  initialCards(elements) {
    elements.forEach(element => {
      this.renderer(element, this.cardContainer, {append: false})
    })
  }


  addItem(element) {
    this.renderer(element, this.cardContainer, {append: true})
  }
}

