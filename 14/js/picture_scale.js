const SCALE_STEP = 25;
const SCALE_RANGE = {
  MIN: '25%',
  MAX: '100%',
};

const image = document.querySelector('.img-upload__preview img');
const scaleInput = document.querySelector('.scale__control--value');

const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');

const onBiggerButtonClick = () => {
  if (scaleInput.value !== SCALE_RANGE.MAX) {
    scaleInput.value = `${Number(scaleInput.value.replace('%', '')) + SCALE_STEP}%`;
    image.style.transform = `scale(${Number(scaleInput.value.replace('%', '')) / 100})`;
  }
};

const onSmallerButtonClick = () => {
  if (scaleInput.value !== SCALE_RANGE.MIN) {
    scaleInput.value = `${Number(scaleInput.value.replace('%', '')) - SCALE_STEP}%`;
    image.style.transform = `scale(${Number(scaleInput.value.replace('%', '')) / 100})`;
  }
};

const activateScale = () => {
  biggerScaleButton.addEventListener('click', onBiggerButtonClick);
  smallerScaleButton.addEventListener('click', onSmallerButtonClick);
};

const deactivateScale = () => {
  biggerScaleButton.removeEventListener('click', onBiggerButtonClick);
  smallerScaleButton.removeEventListener('click', onSmallerButtonClick);
  image.style.transform = 'scale(1)';
};


export {activateScale, deactivateScale};
