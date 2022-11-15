import {isEscKey} from './util.js';

const bigPicElement = document.querySelector('.big-picture');
const commentCountElement = document.querySelector('.comments-count');
const imgElement = document.querySelector('.big-picture__img img');
const likesCountElement = document.querySelector('.likes-count');
const descriptionElement = document.querySelector('.social__caption');
const buttonCloseElement = document.querySelector('#picture-cancel');

const commentCountOnPic = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

const commentListElement = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const renderComments = (comments) => {
  commentListElement.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();

  comments.forEach(({avatar, name, message}) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    commentsFragment.appendChild(commentElement);
  });

  commentListElement.appendChild(commentsFragment);
};

const closeBigPic = () => {
  bigPicElement.classList.add('hidden');
  document.body.classList.remove('open');

  commentCountOnPic.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
};

const onBigPicKeydown = (evt) => {
  if (isEscKey(evt.key)) {
    closeBigPic();
  }
};

const onBigPicCloseClick = () => {
  closeBigPic();
};

const openBigPic = ({url, likes, comments, description}) => {
  imgElement.src = url;
  commentCountElement.textContent = comments.length;
  likesCountElement.textContent = likes;
  descriptionElement.textContent = description;

  renderComments(comments);

  document.body.classList.add('open');
  bigPicElement.classList.remove('hidden');

  commentCountOnPic.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onBigPicKeydown);
  buttonCloseElement.addEventListener('click', onBigPicCloseClick, {once:true});
};

export {openBigPic};
