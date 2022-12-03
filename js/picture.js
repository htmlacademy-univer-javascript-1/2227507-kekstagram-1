import {showBigPicture} from './big_picture.js';
import {showErrorMessage} from './user_messages.js';
import {getData} from './api.js';

const picturesList = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
//const picturesFragment = document.createDocumentFragment();

const removeOLdPictureList = () => {
  picturesList.querySelectorAll('.picture').forEach((item) => item.remove());
};

const createPictureList = (pictureData) => {
  const pictureListFragment = document.createDocumentFragment();
  removeOLdPictureList();
  pictureData.forEach(({id, description, url, likes, comments}) => {
    const picture = photoTemplate.cloneNode(true);
    picture.href = `#${id}`;
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    pictureListFragment.append(picture);
    picture.addEventListener('click', () => {
      showBigPicture({url, description, comments, likes});
    });
  });
  picturesList.append(pictureListFragment);
};

const getPictureList = () => {
  getData()
    .then((data) => {
      createPictureList(data);
    })
    .catch(() => {
      showErrorMessage('Фотографии отсутствуют...');
    });
};

export {getPictureList};
