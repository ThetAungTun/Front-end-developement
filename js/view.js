export default class Store {
  #state = { moves: [] };
  constructor() {}

  #getState() {
    return this.#state;
  }

  #saveState(newState) {
    this.#state = newState;
  }
}
