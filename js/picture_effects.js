import {createRandomArrayFromRange, debounce} from './util.js';
import {createPictureList} from './picture.js';

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
const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButton = document.querySelectorAll('.img-filters__button');

const resetFilter = () => {
  image.style.filter = null;
  image.className = '';
  sliderElementField.classList.add('hidden');
};

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
    resetFilter();
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

const toggleActiveButton = (button) => {
  imgFiltersButton.forEach((el) => {
    el.classList.remove('img-filters__button--active');
  });
  button.classList.add('img-filters__button--active');
};

const applyFilter = (id, imagesArray) => {
  let newImageArray = [];
  switch (id) {
    case 'filter-random':
      newImageArray = createRandomArrayFromRange(0, imagesArray.length - 1, 10)
        .map((index) => imagesArray[index]);
      break;
    case 'filter-discussed':
      newImageArray = imagesArray.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      newImageArray = imagesArray;
  }

  createPictureList(newImageArray);
};

const applyTimeOut = debounce(applyFilter);

const initFilterButtons = (imagesArray) => {
  imgFiltersForm.addEventListener('click', (evt) => {
    if (evt.target.tagName === 'BUTTON') {
      toggleActiveButton(evt.target);
      applyTimeOut(evt.target.id, imagesArray);
    }
  });
};


export {changeEffect, resetFilter, initFilterButtons};
