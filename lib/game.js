const gameMatrix = [
  [0, 1, -1, 1, -1],
  [-1, 0, 1, 1, -1],
  [1, -1, 0, -1, 1],
  [-1, -1, 1, 0, 1],
  [1, 1, -1, -1, 0],
];

const gest = {
  rock: 0,
  scissors: 1,
  paper: 2,
  lizard: 3,
  spock: 4,
};

const play = (p1, p2) => {
  const result = gameMatrix[gest[p1.gesture]][gest[p2.gesture]];
  console.log('middleware result: ', result);
  switch (result) {
    case 1:
      return p1.id;
    case -1:
      return p2.id;
    default:
      return '0';
  }
};

module.exports = play;
