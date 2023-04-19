import View from "./store.js";

/*const app = {
  menu: document.querySelector('[data-id ="menu"]'),
  item: document.querySelector('[data-id = "menu-items"]'),
  reset: document.querySelector('[data-id = "reset-btn"]'),
  newRound: document.querySelector('[data-id = "new-round-btn"]'),
  squares: document.querySelectorAll('[data-id = "square"]'),
  modal: document.querySelector('[data-id = "modal"]'),
  modalText: document.querySelector('[data-id = "modal-text"]'),
  modalBtn: document.querySelector('[data-id = "modal-btn"]'),
  turn: document.querySelector('[data-id = "turn"]'),

  //inti also called initate used to create function in object
  init() {
    app.registerEvent();
  },

  state: {
    moves: [],
  },

  gameStatus(moves) {
    const player1 = moves
      .filter((move) => move.playerid == 1)
      .map((move) => move.squareid);
    const player2 = moves
      .filter((move) => move.playerid == 2)
      .map((move) => move.squareid);

    console.log(player1);
    console.log(player2);

    let winner = null;

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    winningPatterns.forEach((pattern) => {
      const p1Wins = pattern.every((value) => player1.includes(value));
      const p2Wins = pattern.every((value) => player2.includes(value));

      console.log(p1Wins);
      if (p1Wins) winner = 1;
      if (p2Wins) winner = 2;
    });
    return {
      status: moves.length === 9 || winner != null ? "complete" : "in process",
      winner,
    };
  },

  registerEvent() {
    app.menu.addEventListener("click", function (event) {
      app.item.classList.toggle("hidden");
    });

    app.reset.addEventListener("click", () => {
      console.log("Reset");
    });

    app.newRound.addEventListener("click", () => {
      console.log("New Round");
    });

    app.modalBtn.addEventListener("click", function () {
      app.modal.classList.add("hidden");
      app.squares.forEach((square) => square.replaceChildren());

      const turnAgain = document.createElement("i");
      const turnAgain2 = document.createElement("p");
      turnAgain2.innerHTML = "Player 1, you're up!";
      turnAgain.classList.add("fa-solid", "fa-x", "yellow");
      app.turn.replaceChildren(turnAgain, turnAgain2);
    });

    app.squares.forEach((square) => {
      square.addEventListener("click", (event) => {
        const haveMove = (squareid) => {
          const exist = app.state.moves.find(
            (move) => move.squareid == squareid
          );
          return exist;
        };

        if (haveMove(square.id)) {
          return;
        }

        if (square.hasChildNodes()) {
          return;
        }
        const lastMove = app.state.moves.at(-1);

        const getOppositePlayer = (playerID) => (playerID == 1 ? 2 : 1);
        const currentplayer =
          app.state.moves.length === 0
            ? 1
            : getOppositePlayer(lastMove.playerid);
        const nextPlayer = getOppositePlayer(currentplayer);

        const icon = document.createElement("i");
        const turnIcon = document.createElement("i");
        const turnLabel = document.createElement("p");
        turnLabel.innerText = `Player ${nextPlayer} you are up`;
        console.log(icon);
        console.log(currentplayer);

        if (currentplayer == 1) {
          icon.classList.add("fa-solid", "fa-x", "yellow");
          turnIcon.classList.add("fa-solid", "fa-o", "yellow");
          turnLabel.classList.add("turquoise");
        } else {
          icon.classList.add("fa-solid", "fa-o", "turquoise");
          turnIcon.classList.add("fa-solid", "fa-x", "turquoise");
          turnLabel.classList.add("yellow");
        }

        app.turn.replaceChildren(turnIcon, turnLabel);

        app.state.moves.push({
          squareid: +square.id,
          playerid: currentplayer,
        });

        console.log(app.state.moves);

        square.replaceChildren(icon);
        //square.appendChild(icon);
        //square.innerHTML = icon.outerHTML;

        const game = app.gameStatus(app.state.moves);
        console.log(game);

        if (game.status == "complete") {
          console.log(app.modal);
          app.modal.classList.remove("hidden");
          let message = "";
          if (game.winner) {
            message = `Player ${game.winner} wins`;
          } else {
            message = `Tie game`;
          }
          app.modalText.textContent = message;
        }
      });
    });
  },
};

window.addEventListener("load", app.init());*/

function init() {
  const view = new View();

  view.bindPlayerMoveEvenet((event) => {
    view.setTurnOutIndicator(2);
    view.handlePlayerMove(event.target, 1);
    console.log(event.target);
  });
}
window.addEventListener("load", init);
