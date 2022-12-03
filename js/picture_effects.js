const RANGE_OPTIONS = {
  grayscale: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  invert: {
    min: 0,
    max: 100,
    step: 1,
  },
  blur: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  brightness: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const FILTER_NAME = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
};

const UNIT = {
  invert: '%',
  blur: 'px',
};

const image = document.querySelector('.img-upload__preview img');
const sliderElementField = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');

const createSlider = () => {
  noUiSlider.create(sliderElementField, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
};

const changeEffect = ({target}) => {
  if (target.value === 'none') {
    sliderElementField.noUiSlider.destroy();
    image.style.filter = null;
    image.className = '';
    sliderElementField.classList.add('hidden');
    return;
  }

  if (!sliderElementField.noUiSlider) {
    createSlider();
  }

  sliderElementField.classList.remove('hidden');

  const effect = FILTER_NAME[target.value];

  const {min, max, step} = RANGE_OPTIONS[effect];
  const unit = UNIT[effect] ? UNIT[effect] : '';

  image.className = '';

  sliderElementField.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start: max,
    step,
    connect: 'lower',
  });

  sliderElementField.noUiSlider.on('update', () => {
    effectLevel.value = sliderElementField.noUiSlider.get();
    image.style.filter = `${effect}(${effectLevel.value}${unit})`;
  });
};

const resetFilter = () => {
  //sliderElementField.noUiSlider.destroy();
  image.style.filter = null;
  image.className = '';
  sliderElementField.classList.add('hidden');
};

export {changeEffect, resetFilter};
