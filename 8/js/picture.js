import {createPhotoDescription} from './data.js';
import {openBigPic} from './bigpic.js';

const picturesList = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const appendPicture = (picture) => {
  const {id, url, likes, comments} = picture;

  const pictureElement = photoTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.id = id;

  picturesFragment.appendChild(pictureElement);
};

const performPictures = () => {
  const photos = createPhotoDescription();
  photos.forEach(appendPicture);
  picturesList.appendChild(picturesFragment);
  picturesList.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (pictureElement) {
      const clickedPicture = photos.find(({id}) => Number(pictureElement.dataset.id) === id);
      openBigPic(clickedPicture);
    }
  });
};

export {performPictures};
