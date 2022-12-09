import {openOverlayImage} from './picture_editor.js';

const VALID_IMG_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_PREVIEW_IMG = 'img/upload-default-image.jpg';

const imgInput = document.querySelector('.img-upload__input');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

imgInput.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const isFormatValid = VALID_IMG_TYPES.some((type) => fileName.endsWith(type));

  if (isFormatValid) {
    openOverlayImage();

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgPreview.src = reader.result;
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url('${reader.result}')`;
      });
    });

    reader.readAsDataURL(file);
  }
});

const resetFileInput = () => {
  imgInput.value = '';

  imgPreview.src = DEFAULT_PREVIEW_IMG;
  effectsPreview.src = DEFAULT_PREVIEW_IMG;
};

export {resetFileInput};
