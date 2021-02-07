'use strict';

const DESCRIPTIONS = [
  'Водопад Йосемити',
  'Дождь над равниной - вид из самолёта',
  'Красивый вид из бассейна на горы',
  'Дорога из школы',
  'Водопады на леднике',
  'Волнистые скалы на Плато Колорадо',
  'Огромное лицо на айсберге',
  'Заброшенная железная дорога недалеко от Парижа',
  'Вход в метро во Франкфурте',
  'Малыш овцебык',
  'Цветочный ковер в Брюсселе',
  'Цунами из облаков',
  'Бук',
  'Угольный состав на закате',
  'Медуза',
  'Японский клен',
  'Великая китайская стена на рассвете',
  'Самый высокий водопад в мире - Анхель',
  'Северное сияние - вид с орбиты',
  'Первый полёт',
  'Дом внутри старого амбара',
  'Лев',
  'Земля видна с орбиты Сатурна',
  'Полностью разобранный автомобиль VW GOLF',
  'Вулканическая молния',
  'Молнии в Гранд Каньоне',
];
const NAMES = [
  'Денис',
  'Бронислав',
  'Тимур',
  'Феликс',
  'Марк',
  'Юлий',
  'Сергей',
  'Иван',
  'Яков',
  'Роман',
  'Тарас',
  'Захар',
  'Назарий',
  'Игнатий',
  'Борис',
  'Йоханес',
  'Нестор',
  'Харитон',
  'Устин',
  'Матвей',
  'Андрей',
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];
const PHOTO_DESCRIPTION_COUNT = 25;
const PHOTO_LIKES_MIN = 15;
const PHOTO_LIKES_MAX = 200;
const COMMENT_MAX_COUNT = 100;
const COMMENT_PER_PAGE_MIN = 1;
const COMMENT_PER_PAGE_MAX = 5;
const AVATAR_MIN_COUNT = 1;
const AVATAR_MAX_COUNT = 6;

const getInteger = (min, max) => {
  if (min > max) {
    throw new Error('Стартовое значение диапазона не может быть больше финального значения');
  } else if (min < 0 || max < 0) {
    throw new Error('Диапазон может содержать только положительные значения')
  }

  return Math.floor(min + Math.random() * (max + 1 - min))
};

const getRandomArrayElement = (elements, flag) => {
  const index = getInteger(0, elements.length - 1);
  const item = elements[index];

  if (flag === 'object') {
    return {
      item,
      index,
    }
  }

  return item;
};

const getRandomArrayElementNoRepeats = (array) => {
  const copy = array.slice();

  return () => {
    if (copy.length < 1) {
      throw new Error('Больше нет элементов для отображения');
    }

    const { item, index } = getRandomArrayElement(copy, 'object');
    copy.splice(index, 1);

    return item;
  }
};

const generateArrayNumbers = (num) => Array.from({ length: num }, (v, k) => k + 1);
const checkTextLength = (text, maxLength) => text.length <= maxLength;
const getDescriptionId = getRandomArrayElementNoRepeats(generateArrayNumbers(PHOTO_DESCRIPTION_COUNT));
const getUrlIndex = getRandomArrayElementNoRepeats(generateArrayNumbers(PHOTO_DESCRIPTION_COUNT));
const getDescription = getRandomArrayElementNoRepeats(DESCRIPTIONS);
const getCommentId = getRandomArrayElementNoRepeats(generateArrayNumbers(COMMENT_MAX_COUNT));

const createComments = () => {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getInteger(AVATAR_MIN_COUNT, AVATAR_MAX_COUNT)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  }
}

const createDescription = () => {
  return {
    id: getDescriptionId(),
    url: `photos/${getUrlIndex()}.jpg`,
    description: getDescription(),
    likes: getInteger(PHOTO_LIKES_MIN, PHOTO_LIKES_MAX),
    comments: generateArrayNumbers(getInteger(COMMENT_PER_PAGE_MIN, COMMENT_PER_PAGE_MAX)).map(() => createComments()),
  }
}

const photoDescriptions = generateArrayNumbers(PHOTO_DESCRIPTION_COUNT).map(() => createDescription());

// Fix Eslint Errors
checkTextLength('Test', 5);
photoDescriptions;
