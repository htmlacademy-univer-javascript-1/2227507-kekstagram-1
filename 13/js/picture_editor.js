import {isEscKey, showAlert} from './util.js';
import {changeEffect, resetFilter} from './picture_effects.js';
import {activateScale, deactivateScale} from './picture_scale.js';
import {sendData} from './api.js';

const form = document.querySelector('.img-upload__form');
const uploadImage = document.querySelector('#upload-file');
const overlayImage = document.querySelector('.img-upload__overlay');
const hashtag = form.querySelector('.text__hashtags');
const comment = form.querySelector('.text__description');
const effects = form.querySelector('.effects__list');

const submitButton = form.querySelector('.img-upload__submit');
const cancelButton = document.querySelector('#upload-cancel');

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
const isCorrectCount = (value) => value.split(' ').length <= 5;

const validateHashtag = (value) => {
  const hashtags = value.split(' ');
  isCheckPassedForHashtag = hashtags.every(isCorrectHashtag);
  checkSubmitButton();
  return isCheckPassedForHashtag;
};

const validateUniqueHashtag = (value) => {
  const hashtags = value.split(' ');
  const uniqueHashtag = new Set(hashtags);
  return uniqueHashtag.size === hashtag.length;
};

const validateComment = (value) => {
  isCheckPassedForComment = isCorrectComment(value);
  checkSubmitButton();
  return isCheckPassedForComment;
};

const addValidator  = () => {
  pristine.addValidator(
    hashtag,
    validateHashtag,
    'Неподходящий хэштег'
  );

  pristine.addValidator(
    hashtag,
    isCorrectCount,
    'Слишком много хэштегов. Нельзя указывать больше 5.'
  );

  pristine.addValidator(
    hashtag,
    validateUniqueHashtag(),
    'Повторяющийся хэштег'
  );

  pristine.addValidator(
    comment,
    validateComment,
    'Слишком длинный комментарий. Его длина не должна превышать 140 символов'
  );
};

form.addEventListener('submit', () => {
  pristine.validate();
});

const pristineReset = () => pristine.reset();
const pristineValidate = () => pristine.validate();

function openOverlayImage() {
  document.addEventListener('keydown', onOverlayEscKeydown);
  cancelButton.addEventListener('click', closeOverlayImage, {once: true});
  document.body.classList.add('modal-open');
  overlayImage.classList.remove('hidden');
  effects.addEventListener('change', changeEffect);
  activateScale();
}

function closeOverlayImage() {
  form.reset();
  pristineReset();
  uploadImage.value = '';
  resetFilter();
  overlayImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onOverlayEscKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  effects.removeEventListener('change', changeEffect);
  deactivateScale();
}

function onOverlayEscKeydown(evt) {
  if (isEscKey(evt.key) && evt.target !== hashtag && evt.target !== comment) {
    closeOverlayImage();
  }
}

function onCancelButtonClick () {
  closeOverlayImage();
}

const onFileInputChange = () => {
  openOverlayImage();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Загружаю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristineValidate()) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось опубликовать изображение. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

const addFormAction = () => {
  addValidator();
  uploadImage.addEventListener('change', onFileInputChange);
};

export {setUserFormSubmit, addFormAction};
