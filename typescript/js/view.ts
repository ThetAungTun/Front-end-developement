import type { Game, Move, Player } from "./test";

import type store from "./store";

export default class View {
  $: Record<string, Element> = {};

  $$: Record<string, NodeListOf<Element>> = {};
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
  render(Game: store["Game"], stats: store["stats"]) {
    const { playerWithStats, ties } = stats;
    const {
      moves,
      currentPlayer,
      status: { isComplete, winner },
    } = Game;
    this.#clearMoves();
    this.#closeAll();

    this.#updateScoreboard(
      playerWithStats[0].wins,
      playerWithStats[1].wins,
      ties
    );
    this.#initializeMoves(moves);

    if (isComplete) {
      this.#openModal(winner ? `${winner.name} wins` : "Tie");
      return;
    }
    this.#setTurnOutIndicator(currentPlayer);
  }
  bindGameResetEvent(handler: EventListener) {
    this.$.reset.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }

  bindGameNewEvent(handler: EventListener) {
    this.$.newRound.addEventListener("click", handler);
  }
  bindPlayerMoveEvenet(handler: (el: Element) => void) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  #updateScoreboard(player1: number, player2: number, tie: number) {
    this.$.player1Win.textContent = `${player1} Wins`;
    this.$.player2Win.textContent = `${player2} Wins`;
    this.$.tie.textContent = `${tie} Ties`;
  }

  #openModal(message: string) {
    this.$.modal.classList.remove("hidden");
    this.$.modalText.textContent = message;
  }
  #closeModal() {
    this.$.modal.classList.add("hidden");
  }
  #initializeMoves(moves: Move[]) {
    this.$$.squares.forEach((square) => {
      const existingMove = moves.find((move) => move.squareId === +square.id);

      if (existingMove) {
        this.#handlePlayerMove(square, existingMove.player);
      }
    });
  }
  #clearMoves() {
    this.$$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }
  #closeMenu() {
    this.$.item.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon?.classList.add("fa-chevron-up");
    icon?.classList.remove("fa-chevron-down");
  }
  #closeAll() {
    this.#closeMenu();
    this.#closeModal();
  }
  #toogleMenu() {
    this.$.item.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon?.classList.toggle("fa-chevron-up");
    icon?.classList.toggle("fa-chevron-down");
  }

  #setTurnOutIndicator(player: Player) {
    const icon = document.createElement("i");
    const label = document.createElement("p");

    icon.classList.add("fa-solid", player.colorClass, player.iconClass);
    label.innerText = `${player.name}, you are up next`;

    this.$.turn.replaceChildren(icon, label);
  }

  #handlePlayerMove(squareEl: Element, player: Player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareEl.replaceChildren(icon);
  }

  #qs(selector: string) {
    const el = document.querySelector(selector);
    if (!el) throw new Error("Cannot found query selector");

    return el;
  }
  #qsAll(selector: string) {
    const el = document.querySelectorAll(selector);
    if (!el) throw new Error("Cannot found query selector");

    return el;
  }
}
