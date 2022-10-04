function getRandomNumber(startNumber, finalNumber) {
  const lower = Math.ceil(Math.min(Math.abs(startNumber), Math.abs(finalNumber)));
  const upper = Math.floor(Math.max(Math.abs(startNumber), Math.abs(finalNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}


let i = 1;
function getNumID1() {
  return i++;
}

let k = 1;
function getNumID2() {
  return k++;
}


/*function maxLength(string, maxLen) {
  return string.length <= maxLen;
}*/

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

const PHOTOS = 25;
const COMMENTS_NUM = 2;

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

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


Array.from({length: PHOTOS}, createPhotoDescription);
