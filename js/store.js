export default class View {
  $ = {};

  $$ = {};
  constructor() {
    this.$.menu = this.#qs('[data-id ="menu"]');
    this.$.menuBtn = this.#qs('[data-id ="menu-btn"]');
    this.$.item = this.#qs('[data-id = "menu-items"]');
    this.$.reset = this.#qs('[data-id = "reset-btn"]');
    this.$.newRound = this.#qs('[data-id = "new-round-btn"]');
    this.$.modal = this.#qs('[data-id = "modal"]');
    this.$.modalText = this.#qs('[data-id = "modal-text"]');
    this.$.modalBtn = this.#qs('[data-id = "modal-btn"]');
    this.$.turn = this.#qs('[data-id = "turn"]');

    this.$$.squares = this.#qsAll('[data-id = "square"]');

    //UI
    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toogleMenu();
    });
  }

  bindGameResetEvent(handler) {
    this.$.reset.addEventListener("click", handler);
  }

  bindGameNewEvent(handler) {
    this.$.newRound.addEventListener("click", handler);
  }
  bindPlayerMoveEvenet(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", handler);
    });
  }

  #toogleMenu() {
    this.$.item.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.toggle("fa-chevron-up");
    icon.classList.toggle("fa-chevron-down");
  }

  setTurnOutIndicator(player) {
    const icon = document.createElement("i");
    const label = document.createElement("p");

    this.$.turn.classList.add(player === 1 ? "yellow" : "turquoise");
    this.$.turn.classList.remove(player === 1 ? "turquoise" : "yellow");
    icon.classList.add("fa-solid", player === 1 ? "fa-x" : "fa-o");
    label.innerText =
      player === 1 ? "Player 1, you are up" : "Player 2, you are up";
    this.$.turn.replaceChildren(icon, label);
  }

  handlePlayerMove(sqaureEl, player) {
    const icon = document.createElement("i");
    icon.classList.add(
      "fa-solid",
      player === 1 ? "fa-x" : "fa-o",
      player === 1 ? "yellow" : "turquoise"
    );
    sqaureEl.replaceChildren(icon);
  }

  #qs(selector) {
    const el = document.querySelector(selector);
    if (!el) throw new Error("Cannot found query selector");

    return el;
  }
  #qsAll(selector) {
    const el = document.querySelectorAll(selector);
    if (!el) throw new Error("Cannot found query selector");

    return el;
  }
}
