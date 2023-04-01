export class Section {
  constructor({ renderer }, containerSelector) {
    // this.items = items;
    this.renderer = renderer;
    this.containerSelector = containerSelector;
    this.cardContainer = document.querySelector(`.${this.containerSelector}`)
  }

  // initialCards() {
  //   this.items.forEach(element => {
  //     this.renderer(element, this.cardContainer)
  //   });
  // }

  initialCards(elements) {
    elements.forEach(element => {
      this.renderer(element, this.cardContainer)
    });
  }


  addItem(element) {
    this.renderer(element, this.cardContainer)
  }
}

