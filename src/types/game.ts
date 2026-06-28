export type PlayerId = "player1" | "player2";

export type PlayerProfile = {
  id: string;
  name: string;
  createdAt: string;
};

export type PlayerState = {
  profileId: string;
  name: string;
  score: number;
  sets: number;
};

export type GameSettings = {
  setsToWin: number;
};

export type GameState = {
  player1: PlayerState;
  player2: PlayerState;
  profiles: PlayerProfile[];

  firstServer: PlayerId;
  displaySwapped: boolean;

  roundWinner: PlayerId | null;
  matchWinner: PlayerId | null;

  history: PlayerId[];

  settings: GameSettings;
};