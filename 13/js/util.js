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

const ALERT_SHOW_TIME = 5000;
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumber, getNumID1, getNumID2, getRandomArrayElement, isEscKey, createWordToNumber, showAlert};
