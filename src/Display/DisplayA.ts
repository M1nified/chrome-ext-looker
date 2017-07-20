class DisplayA implements IDisplay {
  protected _element;
  constructor(element: HTMLElement) {
    this._element = element;
  }
  getCloudletContent() {
    throw new Error("Method not implemented.");
  }
  getPopupContent() {
    throw new Error("Method not implemented.");
  }

}