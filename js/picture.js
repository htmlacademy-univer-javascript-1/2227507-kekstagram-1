import {createPhotoDescription} from './data.js';

const picturesList = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const appendPicture = (picture) => {
  const {url, likes, comments} = picture;

  const pictureElement = photoTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  picturesFragment.appendChild(pictureElement);
};

const performPictures = () => {
  createPhotoDescription().forEach(appendPicture);
  picturesList.appendChild(picturesFragment);
};

export {performPictures};
