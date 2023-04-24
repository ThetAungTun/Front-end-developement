const initalValue = {
  moves: [],
  history: {
    currentGameRounds: [],
    allGames: [],
  },
};

export default class Store {
  #state = initalValue;

  constructor(players) {
    this.players = players;
    console.log(players);
  }

  get stats() {
    const state = this.#getState();
    console.log(state);

    return {
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
    console.log(currentPlayer);

    for (const player of this.players) {
      const selected = state.moves
        .filter((move) => move.player.id === player.id)
        .map((move) => move.squareId);
      console.log(selected);

      for (const pattern of winningPatterns) {
        if (pattern.every((v) => selected.includes(v))) {
          winner = player;
          console.log(winner);
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
    console.log(stateClone);

    this.#saveState(stateClone);
  }
  reset() {
    const stateClone = structuredClone(this.#getState());
    const { status, moves } = this.Game;

    if (status.isComplete) {
      stateClone.history.currentGameRounds.push({ moves, status });
    }

    stateClone.moves = [];

    this.#saveState(stateClone);
  }
  playerMove(squareId) {
    const stateClone = structuredClone(this.#getState());

    stateClone.moves.push({
      squareId,
      player: this.Game.currentPlayer,
    });

    this.#saveState(stateClone);
  }

  #getState() {
    return this.#state;
  }

  #saveState(StateorFn) {
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
    this.#state = newState;
  }
}
