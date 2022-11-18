function getRandomNumber(startNumber, finalNumber) {
  const lower = Math.ceil(Math.min(Math.abs(startNumber), Math.abs(finalNumber)));
  const upper = Math.floor(Math.max(Math.abs(startNumber), Math.abs(finalNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

let i = 1;
function getNumID1() {
  return i++;
}

let k = 1;
function getNumID2() {
  return k++;
}

const isEscKey = (keyCode) => keyCode === 'Escape';

const createWordToNumber = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

export {getRandomNumber, getNumID1, getNumID2, getRandomArrayElement, isEscKey, createWordToNumber};
