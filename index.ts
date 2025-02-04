import { FortyData, isSamePlayer, Player, Point, PointsData } from './types/player';
import { none, Option, some, match as matchOpt } from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';
import { advantage, Advantage, deuce, Game, Points, Score } from './types/score';

// -------- Tooling functions --------- //

export const playerToString = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};
export const otherPlayer = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'PLAYER_TWO';
    case 'PLAYER_TWO':
      return 'PLAYER_ONE';
  }
};
// Exercice 1 :
export const pointToString = (point: Point): string => {
  switch (point.kind) {
    case 'LOVE':
      return 'Love';
    case 'FIFTEEN':
      return '15';
    case 'THIRTY':
      return '30';
    /*case 'FORTY':
      return '40';*/
    default:
      return 'Unknown'; // Cas de sécurité si le type n'est pas valide
  }
};

  export const scoreToString = (score: Score): string => {
    switch (score.kind) {
      case 'POINTS':
        const playerOneScore = pointToString(score.pointsData.playerOne);
        const playerTwoScore = pointToString(score.pointsData.playerTwo);
        return `${playerOneScore} - ${playerTwoScore}`;
  
      case 'FORTY':
        const player = score.fortyData.player;
        const otherPoint = pointToString(score.fortyData.otherPoint);
        return `${player} has 40, other player has ${otherPoint}`;
  
      case 'DEUCE':
        return 'Deuce';
  
      case 'ADVANTAGE':
        return `${score.player} has advantage`;
  
      case 'GAME':
        return `${score.player} wins the game`;
  
      default:
        return 'Unknown score'; // Cas de sécurité si le type n'est pas valide
    }
  };

export const scoreWhenDeuce = (winner: Player): Score => {
  return advantage(winner);
};

export const scoreWhenAdvantage = (
  advantagedPlayed: Player,
  winner: Player
): Score => {
  return game(winner);
};

export const scoreWhenForty = (
  currentForty: FortyData,
  winner: Player
): Score => game(winner);

export const scoreWhenGame = (winner: Player): Score => {
  return game(winner);
};

// Exercice 2
// Tip: You can use pipe function from fp-ts to improve readability.
// See scoreWhenForty function above.
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const playerOneScore = current.playerOne;
  const playerTwoScore = current.playerTwo;

  if (isSamePlayer(winner, 'PLAYER_ONE')) {
    // Si le gagnant est PLAYER_ONE
    if (playerOneScore.kind === 'LOVE') return { kind: 'POINTS', pointsData: { playerOne: { kind: 'FIFTEEN' }, playerTwo: playerTwoScore } };
    if (playerOneScore.kind === 'FIFTEEN') return { kind: 'POINTS', pointsData: { playerOne: { kind: 'THIRTY' }, playerTwo: playerTwoScore } };
    if (playerOneScore.kind === 'THIRTY') return { kind: 'POINTS', pointsData: { playerOne: { kind: 'FORTY' }, playerTwo: playerTwoScore } };
    // Si playerOne atteint 40 et gagne
    return scoreWhenForty({ player: 'PLAYER_ONE', otherPoint: playerTwoScore }, 'PLAYER_ONE');
  }

  // Si le gagnant est PLAYER_TWO
  if (playerTwoScore.kind === 'LOVE') return { kind: 'POINTS', pointsData: { playerOne: playerOneScore, playerTwo: { kind: 'FIFTEEN' } } };
  if (playerTwoScore.kind === 'FIFTEEN') return { kind: 'POINTS', pointsData: { playerOne: playerOneScore, playerTwo: { kind: 'THIRTY' } } };
  if (playerTwoScore.kind === 'THIRTY') return { kind: 'POINTS', pointsData: { playerOne: playerOneScore, playerTwo: { kind: 'FORTY' } } };
  // Si playerTwo atteint 40 et gagne
  return scoreWhenForty({ player: 'PLAYER_TWO', otherPoint: playerOneScore }, 'PLAYER_TWO');
};

export const score = (currentScore: Score, winner: Player): Score => {
  // Gère les transitions entre les différents types de score
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint(currentScore.pointsData, winner);
    case 'DEUCE':
      return scoreWhenDeuce(winner);
    case 'ADVANTAGE':
      return scoreWhenAdvantage(currentScore.player, winner);
    case 'FORTY':
      return scoreWhenForty(currentScore.fortyData, winner);
    default:
      throw new Error('Unknown score state');
  }
};

export function game(winner: Player): Score {
  return { kind: 'GAME', player: winner };
}
