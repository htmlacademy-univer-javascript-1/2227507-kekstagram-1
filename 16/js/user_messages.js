import {isEscKey} from './util.js';

const successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const onResultCloseClick = () => document.body.lastChild.remove();

const onResultEscPress = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    onResultCloseClick();
  }
};

const onWindowClick = (evt) => {
  if (!evt.target.closest('div')) {
    onResultCloseClick();
    window.removeEventListener('click', onWindowClick);
  }
};

const addEventListener = () => {
  window.addEventListener('click', onWindowClick);
  document.addEventListener('keydown', onResultEscPress);
};

const removeEventListener = () => {
  window.removeEventListener('click', onWindowClick);
  document.removeEventListener('keydown', onResultEscPress);
};

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  document.body.append(successMessage);
  addEventListener();
  successButton.addEventListener('click', onResultCloseClick);

  successButton.addEventListener('click', () => {
    successMessage.remove();
    successButton.removeEventListener('click', onResultCloseClick);
    removeEventListener();
  });
};

const showErrorMessage = (message) => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = document.querySelector('.error__button');
  document.querySelector('.error__title').textContent = message;
  document.body.append(errorMessage);
  addEventListener();
  errorButton.addEventListener('click', onResultCloseClick);
  errorButton.addEventListener('click', () => {
    errorMessage.remove();
    errorButton.removeEventListener('click', onResultCloseClick);
    removeEventListener();
  });
};

export {showSuccessMessage, showErrorMessage};
