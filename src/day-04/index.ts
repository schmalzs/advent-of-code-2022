import fs from 'fs';

const contains = (range1: number[], range2: number[]) => {
  return range1[0] >= range2[0] && range1[1] <= range2[1];
};

const overlaps = (range1: number[], range2: number[]) => {
  return (
    (range1[0] >= range2[0] && range1[0] <= range2[1]) ||
    (range1[1] >= range2[0] && range1[1] <= range2[1])
  );
};

const main = () => {
  const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
  const pairs = input
    .split(/\r?\n/)
    .map((pair) =>
      pair.split(',').map((range) => range.split('-').map(Number))
    );

  const count = pairs.reduce((acc, [range1, range2]) => {
    const isOverlap =
      overlaps(range1, range2) ||
      contains(range1, range2) ||
      contains(range2, range1);

    return isOverlap ? acc + 1 : acc;
  }, 0);

  console.info(count);
};

main();
