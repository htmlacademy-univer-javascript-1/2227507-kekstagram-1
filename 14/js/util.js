function getRandomNumber(startNumber, finalNumber) {
  const lower = Math.ceil(Math.min(Math.abs(startNumber), Math.abs(finalNumber)));
  const upper = Math.floor(Math.max(Math.abs(startNumber), Math.abs(finalNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const createRandomIdFromRangeGenerator = (min, max) => {
  const randomValues = [];
  return function () {
    let currentValue = getRandomNumber(min, max);
    if (randomValues.length >= (max - min + 1)) {
      return null;
    }
    while (randomValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    randomValues.push(currentValue);
    return currentValue;
  };
};

const createRandomArrayFromRange = (min, max, count) => {
  const generate = createRandomIdFromRangeGenerator(min, max);
  const result = [];
  for (let i = 1; i <= count; i++) {
    result.push(generate());
  }
  return result;
};

const isEscKey = (keyCode) => keyCode === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const createWordToNumber = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

export {getRandomNumber,debounce, createRandomArrayFromRange , isEscKey, createWordToNumber};
