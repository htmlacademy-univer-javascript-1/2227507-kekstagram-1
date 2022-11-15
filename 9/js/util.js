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

export {getRandomNumber, getNumID1, getNumID2, getRandomArrayElement, isEscKey};
