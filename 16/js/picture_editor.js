import {isEscKey} from './util.js';
import {changeEffect, resetFilter} from './picture_effects.js';
import {activateScale, deactivateScale} from './picture_scale.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './user_messages.js';
import {resetFileInput} from './picture_upload.js';

const MAX_COMMENTS_LENGTH = 140;
const REGEX_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

const form = document.querySelector('.img-upload__form');
const uploadImage = document.querySelector('#upload-file');
const overlayImage = document.querySelector('.img-upload__overlay');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const effects = document.querySelector('.effects__list');

const submitButton = document.querySelector('.img-upload__submit');
const cancelButton = document.querySelector('#upload-cancel');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isValidComment = (comment) => comment.length <= MAX_COMMENTS_LENGTH;

const createHashtagArray = (value) => value.split(' ');

const isValidHashtag = (value) => {
  if (!value) {
    return true;
  }
  const hashtag = createHashtagArray(value);
  return hashtag.every((test) => REGEX_HASHTAG.test(test));
};

const isValidCount = (value) => {
  const hashtag = createHashtagArray(value);
  return hashtag.length <= MAX_HASHTAG_COUNT;
};

const isUniqueHashtags = (value) => {
  const hashtag = createHashtagArray(value);
  const uniqHashtag = new Set(hashtag);
  return uniqHashtag.size === hashtag.length;
};

const addValidator  = () => {
  pristine.addValidator(
    hashtagField,
    isValidHashtag,
    'Неподходящий хэштег'
  );

  pristine.addValidator(
    hashtagField,
    isValidCount,
    'Слишком много хэштегов. Нельзя указывать больше 5.'
  );

  pristine.addValidator(
    hashtagField,
    isUniqueHashtags,
    'Повторяющийся хэштег'
  );

  pristine.addValidator(
    commentField,
    isValidComment,
    'Слишком длинный комментарий. Его длина не должна превышать 140 символов'
  );
};

export function openOverlayImage() {
  overlayImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onOverlayEscKeydown);
  cancelButton.addEventListener('click', onCancelButtonClick);
  effects.addEventListener('change', changeEffect);
  activateScale();
}

function closeOverlayImage() {
  form.reset();
  pristine.reset();
  resetFilter();
  overlayImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onOverlayEscKeydown);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  effects.removeEventListener('change', changeEffect);
  deactivateScale();
}

function onOverlayEscKeydown(evt) {
  if (isEscKey(evt.key) && evt.target !== hashtagField && evt.target !== commentField) {
    evt.preventDefault();
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
  submitButton.textContent = 'Публикуется...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

function resetUploadForm() {
  form.reset();
  onCancelButtonClick();
  resetFileInput();
}

const onSubmitForm = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(
      () => {
        resetUploadForm();
        showSuccessMessage();
        unblockSubmitButton();
      },
      () => {
        resetUploadForm();
        showErrorMessage('Не удалось отправить форму!');
        unblockSubmitButton();
      },
      new FormData(form),
    );
  }
};


const addFormAction = () => {
  addValidator();
  uploadImage.addEventListener('change', onFileInputChange);
  form.addEventListener('submit', onSubmitForm);
};

export {resetUploadForm, addFormAction};
