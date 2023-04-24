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
    this.$.player1Win = this.#qs('[data-id = "p1-wins"');
    this.$.player2Win = this.#qs('[data-id = "p2-wins"');
    this.$.tie = this.#qs('[data-id = "ties"');
    this.$$.squares = this.#qsAll('[data-id = "square"]');

    //UI
    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toogleMenu();
    });
  }

  bindGameResetEvent(handler) {
    this.$.reset.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }

  bindGameNewEvent(handler) {
    this.$.newRound.addEventListener("click", handler);
  }
  bindPlayerMoveEvenet(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  updateScoreboard(player1, player2, tie) {
    this.$.player1Win.innerText = `${player1} Wins`;
    this.$.player2Win.innerText = `${player2} Wins`;
    this.$.tie.innerText = `${tie} Ties`;
  }

  openModal(message) {
    this.$.modal.classList.remove("hidden");
    this.$.modalText.innerText = message;
    console.log(message);
  }
  closeModal(message) {
    this.$.modal.classList.add("hidden");
  }
  clearMoves() {
    this.$$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }
  closeMenu() {
    this.$.item.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.add("fa-chevron-up");
    icon.classList.remove("fa-chevron-down");
  }
  closeAll() {
    this.closeMenu();
    this.closeModal();
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

    icon.classList.add("fa-solid", player.colorClass, player.iconClass);
    label.innerText = `${player.name}, you are up next`;

    this.$.turn.replaceChildren(icon, label);
  }

  handlePlayerMove(squareEl, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
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
