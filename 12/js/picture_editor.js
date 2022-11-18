import {isEscKey} from './util.js';

const form = document.querySelector('.img-upload__form');
const uploadImage = document.querySelector('#upload-file');
const overlayImage = document.querySelector('.img-upload__overlay');
const hashtag = form.querySelector('.text__hashtags');
const comment = form.querySelector('.text__description');

const submitButton = form.querySelector('.img-upload__submit');
const cancelButton = document.querySelector('#upload-cancel');

function closeOverlayImage() {
  uploadImage.value = '';
  overlayImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function onOverlayEscKeydown(evt) {
  if (isEscKey(evt.key) && evt.target !== hashtag && evt.target !== comment) {
    closeOverlayImage();
  }
}

uploadImage.addEventListener('change', () => {
  document.addEventListener('keydown', onOverlayEscKeydown);
  cancelButton.addEventListener('click', closeOverlayImage, {once: true});

  document.body.classList.add('modal-open');
  overlayImage.classList.remove('hidden');
});


let isCheckPassedForHashtag = true;
let isCheckPassedForComment = true;

const checkSubmitButton = () => {
  submitButton.disabled = !isCheckPassedForHashtag || !isCheckPassedForComment;
};

const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text-invalid',
  successClass: 'text-valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text-invalid__error'
}, true);

const regexHashtag = /(^\s*$)|(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)/;

const isCorrectHashtag = (value) => regexHashtag.test(value);
const isCorrectComment = (value) => value.length < 140;

const validateHashtag = (value) => {
  const hashtags = value.split(' ');
  isCheckPassedForHashtag = hashtags.every(isCorrectHashtag);
  checkSubmitButton();
  return isCheckPassedForHashtag;
};

const validateComment = (value) => {
  isCheckPassedForComment = isCorrectComment(value);
  checkSubmitButton();
  return isCheckPassedForComment;
};

pristine.addValidator(
  hashtag,
  validateHashtag,
  'Неподходящий хэштег'
);

pristine.addValidator(
  comment,
  validateComment,
  'Слишком длинный комментарий. Его длина не должна превышать 140 символов'
);

form.addEventListener('submit', () => {
  pristine.validate();
});
