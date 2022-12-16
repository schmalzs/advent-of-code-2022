import fs from 'fs';

const PRIORITY: Record<string, number> = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

const getCommonItem = (group: string[]): string => {
  const [first, second, third] = group;

  const commonItem = first.split('').find((item) => {
    return second.includes(item) && third.includes(item);
  });

  if (!commonItem) throw new Error('No common item found');

  return commonItem;
};

const getItemPriority = (item: string): number => {
  if (!PRIORITY[item]) throw new Error('Invalid item');
  return PRIORITY[item];
};

const group = (sacks: string[]): string[][] => {
  const groups: string[][] = [];

  for (let i = 0; i < sacks.length; i++) {
    const group = Math.floor(i / 3);
    if (!groups[group]) groups[group] = [];
    groups[group].push(sacks[i]);
  }

  return groups;
};

const main = () => {
  const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');
  const sacks = input.split(/\r?\n/);

  const groups = group(sacks);

  const commonItems = groups.map(getCommonItem);

  const prioritySum = commonItems.reduce(
    (acc, item) => acc + getItemPriority(item),
    0
  );

  console.info(prioritySum);
};

main();
