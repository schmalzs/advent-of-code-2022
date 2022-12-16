import fs from 'fs';

enum Move {
  ROCK = 1,
  PAPER = 2,
  SCISSORS = 3,
}

enum Outcome {
  WIN,
  LOSE,
  DRAW,
}

enum Player {
  PLAYER_1 = 1,
  PLAYER_2 = 2,
}

const convertMove = (move: string): Move => {
  switch (move) {
    case 'A':
      return Move.ROCK;
    case 'B':
      return Move.PAPER;
    case 'C':
      return Move.SCISSORS;
    default:
      throw new Error('Invalid move');
  }
};

const convertOutcome = (outcome: string): Outcome => {
  switch (outcome) {
    case 'X':
      return Outcome.LOSE;
    case 'Y':
      return Outcome.DRAW;
    case 'Z':
      return Outcome.WIN;
    default:
      throw new Error('Invalid outcome');
  }
};

const getMove = (player1Move: Move, outcome: Outcome): Move => {
  switch (outcome) {
    case Outcome.WIN: {
      if (player1Move === Move.PAPER) return Move.SCISSORS;
      if (player1Move === Move.ROCK) return Move.PAPER;
      if (player1Move === Move.SCISSORS) return Move.ROCK;
    }
    case Outcome.LOSE: {
      if (player1Move === Move.PAPER) return Move.ROCK;
      if (player1Move === Move.ROCK) return Move.SCISSORS;
      if (player1Move === Move.SCISSORS) return Move.PAPER;
    }
    case Outcome.DRAW: {
      return player1Move;
    }
  }
};

const getWinner = (player1Move: Move, player2Move: Move): Player | null => {
  if (player1Move === player2Move) return null;

  if (player1Move === Move.ROCK) {
    return player2Move === Move.PAPER ? Player.PLAYER_2 : Player.PLAYER_1;
  }

  if (player1Move === Move.PAPER) {
    return player2Move === Move.SCISSORS ? Player.PLAYER_2 : Player.PLAYER_1;
  }

  if (player1Move === Move.SCISSORS) {
    return player2Move === Move.ROCK ? Player.PLAYER_2 : Player.PLAYER_1;
  }

  return null;
};

const calculateScore = (
  results: [Move, Move, Player | null][],
  player: Player
) =>
  results.reduce((acc, [player1Move, player2Move, winner]) => {
    const playerMoveScore =
      player === Player.PLAYER_1 ? player1Move : player2Move;
    const playerWinScore = winner === player ? 6 : winner === null ? 3 : 0;

    return acc + playerMoveScore + playerWinScore;
  }, 0);

const getResults = (round: string[]): [Move, Move, Player | null] => {
  const player1Move = convertMove(round[0]);
  const outcome = convertOutcome(round[1]);
  const player2Move = getMove(player1Move, outcome);
  const winner = getWinner(player1Move, player2Move);

  return [player1Move, player2Move, winner];
};

const main = () => {
  const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

  const rounds = input.split(/\r?\n/).map((round) => round.split(' '));

  const results = rounds.map(getResults);

  const score = calculateScore(results, Player.PLAYER_2);

  console.info(score);
};

main();
