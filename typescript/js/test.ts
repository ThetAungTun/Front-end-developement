export type Player = {
  id: number;
  name: string;
  iconClass: string;
  colorClass: string;
};

export type GameState = {
  moves: any[];
  history: {
    currentGameRounds: Game[];
    allGames: Game[];
  };
};

export type Move = {
  squareId: number;
  player: Player;
};

export type Game = {
  moves: Move[];
  status: GameStatus;
};

export type GameStatus = {
  isComplete: boolean;
  winner: Player;
};
