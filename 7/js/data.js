import {getNumID1, getNumID2, getRandomNumber, getRandomArrayElement} from './util.js';
import {performPictures} from './picture.js';

performPictures();
const NAMES = [
  'Аня',
  'Маня',
  'Гога',
  'Еся',
  'Тося',
  'Муся',
  'Петя',
  'Вася',
  'Лоля',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];


const COMMENTS_NUM = 2;

const createComments = () => ({
  id: getNumID1(),
  avatar: `img/avatar-${  getRandomNumber(1,6)  }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => ({
  id: getNumID2(),
  url: `photos/${  getRandomNumber(1,25)  }.jpg`,
  description: '#сказочноебали',
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: COMMENTS_NUM}, createComments),
});

export {createPhotoDescription};
