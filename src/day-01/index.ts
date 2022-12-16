import fs from 'fs';

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8');

const elvesMeals = input
  .split(/(\r?\n){2,}/)
  .filter((str) => /\S/.test(str))
  .map((elfMeals) => elfMeals.split(/\r?\n/).map(Number));

const elvesCalories = elvesMeals.map(
  (elfMeals) => elfMeals.reduce((acc, meal) => acc + meal),
  0
);

elvesCalories.sort((a, b) => a - b);

const top3 = elvesCalories.slice(-3);

const sum = top3.reduce((acc, item) => acc + item, 0);

console.info(sum);
