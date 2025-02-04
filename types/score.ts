import { none, some } from "fp-ts/lib/Option";
import { FortyData, Player, Point, PointsData } from "./player";

export type Score = Points | Forty | Deuce | Advantage | Game;

export type Points = {
  kind: 'POINTS';
  pointsData: {
    PLAYER_ONE: Point;
    PLAYER_TWO: Point;
  }
};

export type Deuce = {
  kind: 'DEUCE';
};

export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player;
};

export type Game = {
  kind: 'GAME';
  player: Player;
};



//exo 0
export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});

export const forty = (player: Player, otherPoint: Point): Forty => ({
  kind: 'FORTY',
  fortyData: {
    player,
    otherPoint,
  },
});

export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player,
});

export { FortyData };
