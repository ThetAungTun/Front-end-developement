import View from "./view.js";
import Store from "./store.js";
import type { Player } from "./test";

//inti also called initate used to create function in object

const players: Player[] = [
  { id: 1, name: "Player 1", iconClass: "fa-x", colorClass: "turquoise" },
  { id: 2, name: "Player 2", iconClass: "fa-o", colorClass: "yellow" },
];

function init() {
  const view = new View();

  const store = new Store("game-state-key", players);

  //Change the game moves between two windows in order to connect between them
  window.addEventListener("storage", () => {
    console.log("State changed");
    //view.render(store.Game, store.stats);
  });

  view.render(store.Game, store.stats);
  view.bindGameResetEvent((event) => {
    view.render(store.Game, store.stats);
    store.reset();
  });

  view.bindGameNewEvent((event) => {
    store.newRound();
    view.render(store.Game, store.stats);
  });

  view.bindPlayerMoveEvenet((square) => {
    /*const existingMove = store.Game.moves.find(
      (move) => move.squareId === +square.id
    );*/
    ///if use curly bracket have to use return to return vale

    const exist = store.Game.moves.find((move) => {
      return move.squareId === +square.id;
    });

    if (exist) {
      return;
    }

    store.playerMove(+square.id);
    view.render(store.Game, store.stats);
  });
}
window.addEventListener("load", init);
