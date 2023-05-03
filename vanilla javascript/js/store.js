const initalValue = {
  moves: [],
  history: {
    currentGameRounds: [],
    allGames: [],
  },
};

export default class Store {
  constructor(keys, players) {
    this.storageKey = keys;
    this.players = players;
  }

  // stats and Game methods are intended to retrieve the current game statistics and game state respectively from the localStorage, which is why they are automatically called when the window loads in order to retrieve the stored data from localStorage and return the corresponding values.
  get stats() {
    const state = this.#getState();

    return {
      text: "hello",
      playerWithStats: this.players.map((player) => {
        const wins = state.history.currentGameRounds.filter(
          (game) => game.status.winner?.id === player.id //optional changing
        ).length;

        return { ...player, wins };
      }),
      ties: state.history.currentGameRounds.filter(
        (game) => game.status.winner === null
      ).length,
    };
  }

  get Game() {
    const state = this.#getState();
    console.log(state);

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

    const currentPlayer = this.players[state.moves.length % 2];

    for (const player of this.players) {
      const selected = state.moves
        .filter((move) => move.player.id === player.id)
        .map((move) => move.squareId);

      console.log(selected);
      for (const pattern of winningPatterns) {
        if (pattern.every((v) => selected.includes(v))) {
          winner = player;
        }
      }
    }
    return {
      moves: state.moves,
      currentPlayer,
      status: {
        isComplete: state.moves.length === 9 || winner != null,
        winner,
      },
    };
  }

  newRound() {
    this.reset();
    const stateClone = structuredClone(this.#getState());

    stateClone.history.allGames.push(...stateClone.history.currentGameRounds);
    stateClone.history.currentGameRounds = [];

    this.#saveState(stateClone);
    console.log(stateClone);
  }
  reset() {
    const stateClone = structuredClone(this.#getState());
    const { status, moves } = this.Game;

    if (status.isComplete) {
      stateClone.history.currentGameRounds.push({ moves, status });
    }
    console.log(stateClone);

    stateClone.moves = [];

    this.#saveState(stateClone);
  }
  playerMove(squareId) {
    const stateClone = structuredClone(this.#getState());

    stateClone.moves.push({
      squareId,
      player: this.Game.currentPlayer, // this will called the get method

      text: this.stats.text,
    });

    this.#saveState(stateClone);
  }

  /* #saveState(StateorFn) {
    const prevState = this.#getState;

    let newState;

    switch (typeof StateorFn) {
      case "function":
        newState = StateorFn(prevState);
        break;
      case "object":
        newState = StateorFn;
        break;
      default:
        throw new Error("Passed in argument is wrong");
    }
    window.localStorage.setItem(this.keys, JSON.stringify(newState));
  }*/

  #saveState(stateOrFn) {
    const prevState = this.#getState();

    let newState;

    switch (typeof stateOrFn) {
      case "function":
        newState = stateOrFn(prevState);
        break;
      case "object":
        newState = stateOrFn;
        break;
      default:
        throw new Error("Invalid argument passed to saveState");
    }

    window.localStorage.setItem(this.storageKey, JSON.stringify(newState));
  }
  #getState() {
    const item = window.localStorage.getItem(this.storageKey);

    return item ? JSON.parse(item) : initalValue;
  }
}
