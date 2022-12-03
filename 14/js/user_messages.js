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

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');

  successButton.addEventListener('click', () => {
    successMessage.remove();
  });
  document.body.append(successMessage);

  window.addEventListener('click', onWindowClick);
  document.addEventListener('keydown', onResultEscPress, {once: true});
  successButton.addEventListener('click', onResultCloseClick, {once: true});
};

const showErrorMessage = (message) => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = errorMessage.querySelector('.error__button');

  errorMessage.querySelector('.error__title').textContent = message;
  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  });
  document.body.append(errorMessage);

  window.addEventListener('click', onWindowClick);
  document.addEventListener('keydown', onResultEscPress, {once: true});
  errorButton.addEventListener('click', onResultCloseClick, {once: true});
};

export {showSuccessMessage, showErrorMessage};
