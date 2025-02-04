export const isSamePlayer = (p1: Player, p2: Player) => p1 === p2;

export type Player = 'PLAYER_ONE' | 'PLAYER_TWO';

export type Love = {
  kind: 'LOVE';
};

export type Fifteen = {
  kind: 'FIFTEEN';
};

export type Thirty = {
  kind: 'THIRTY';
};

export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

export type Point = Love | Fifteen | Thirty | Forty;

export type PointsData = {
  playerOne: Point;
  playerTwo: Point;
};

export type FortyData = {
  player: Player;
  otherPoint: Point;
};


