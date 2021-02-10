import { getInteger, getRandomArrayElement } from './util.js';

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
const PHOTO_DATA_COUNT = 25;
const PHOTO_LIKES_MIN = 15;
const PHOTO_LIKES_MAX = 200;
const COMMENT_MAX_COUNT = 100;
const COMMENT_PER_PAGE_MIN = 1;
const COMMENT_PER_PAGE_MAX = 5;
const COMMENT_AVATAR_INDEX_MIN = 1;
const COMMENT_AVATAR_INDEX_MAX = 6;

const createDataIds = () => {
  return [ ...Array(PHOTO_DATA_COUNT) ].map((item, index) => index + 1);
}

const getPhotoDataId = getRandomArrayElement(createDataIds());
const getUrlIndex = getRandomArrayElement(createDataIds());
const getDescription = getRandomArrayElement(DESCRIPTIONS);
const getCommentId = getRandomArrayElement([ ...Array(COMMENT_MAX_COUNT) ].map((item, index) => index + 1));

const createComment = () => {
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getInteger(COMMENT_AVATAR_INDEX_MIN, COMMENT_AVATAR_INDEX_MAX)}.svg`,
    message: getRandomArrayElement(COMMENTS, { repeat: true })(),
    name: getRandomArrayElement(NAMES, { repeat: true })(),
  }
}

const createPhotoDataItem = () => {
  return {
    id: getPhotoDataId(),
    url: `photos/${getUrlIndex()}.jpg`,
    description: getDescription(),
    likes: getInteger(PHOTO_LIKES_MIN, PHOTO_LIKES_MAX),
    comments: [ ...Array(getInteger(COMMENT_PER_PAGE_MIN, COMMENT_PER_PAGE_MAX)) ].map(() => createComment()),
  }
}

const createPhotoData = () => createDataIds().map(() => createPhotoDataItem());

export { createPhotoData };
