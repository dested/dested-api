import * as readline from 'readline';

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function pause() {
  return new Promise((res) => {
    readlineInterface.question('', (answer) => {
      res(answer);
    });
  });
}
