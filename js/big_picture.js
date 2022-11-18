import {isEscKey, createWordToNumber} from './util.js';

const COMMENTS = 5;
const ENDINGS = ['комментария', 'комментариев', 'комментариев'];

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

let visibleComments = 0;
let comment;
let commentLength;

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

const updateComments = () => {
  if (visibleComments === comment.length) {
    commentsLoader.classList.add('hidden');
    return;
  }
  commentsLoader.classList.remove('hidden');
};

const showComments = (from, to) => {
  visibleComments = Math.min(to, comment.length);
  renderComments(comment.slice(from, visibleComments));
  commentCountOnPic.textContent = `${visibleComments} из ${commentLength} ${createWordToNumber(commentLength, ENDINGS)}`;
  updateComments();
};

const onCommentsUpdate = (evt) => {
  evt.preventDefault();
  showComments(visibleComments, visibleComments + COMMENTS);
};

const closeBigPic = () => {
  bigPicElement.classList.add('hidden');
  document.body.classList.remove('open');
  removeListeners();
};

const onBigPicKeydown = (evt) => {
  if (isEscKey(evt.key)) {
    closeBigPic();
  }
};

const onBigPicCloseClick = () => {
  closeBigPic();
};

const addListeners = () => {
  document.addEventListener('keydown', onBigPicKeydown);
  buttonCloseElement.addEventListener('click', onBigPicCloseClick, {once:true});
  commentsLoader.addEventListener('click', onCommentsUpdate);
};

function removeListeners() {
  document.removeEventListener('keydown', onBigPicKeydown);
  buttonCloseElement.removeEventListener('click', onBigPicCloseClick, {once:true});
  commentsLoader.removeEventListener('click', onCommentsUpdate);
}

const openBigPic = ({url, likes, comments, description}) => {
  imgElement.src = url;
  commentCountElement.textContent = comments.length;
  likesCountElement.textContent = likes;
  descriptionElement.textContent = description;

  document.body.classList.add('open');
  bigPicElement.classList.remove('hidden');
  commentCountOnPic.classList.remove('hidden');

  comment = comments;
  commentLength = comments.length;

  showComments(0,COMMENTS);
  addListeners();
};


export {openBigPic};
