import { open } from 'node:fs/promises';

const readNextColumn = (stackLineStr: string): [string, string] => {
  const pivot = Math.min(3, stackLineStr.length);
  const column = stackLineStr.slice(0, pivot).trim();
  const rest = stackLineStr.slice(pivot);
  return [column, rest];
};

const parseStackLine = (stackLineStr: string): string[] => {
  const stackLine: string[] = [];

  let currStackLineStr = stackLineStr;
  while (currStackLineStr.length > 0) {
    const [column, rest] = readNextColumn(currStackLineStr);
    stackLine.push(column);
    currStackLineStr = rest;
  }

  return stackLine;
};

const main = async () => {
  const file = await open(`${__dirname}/input.txt`);

  const stackLines: string[][] = [];
  for await (const line of file.readLines()) {
    if (line.trim()[0] === '[') {
      const stackLine = parseStackLine(line);
      stackLines.push(stackLine);
    }
    // stackLines.push(
    //   line
    //     .trim()
    //     .split(' ')
    //     .map((crate) => crate.trim().split('')[1])
    // );
  }

  for (const stackLine of stackLines) {
    console.info(stackLine);
  }
};

main();
