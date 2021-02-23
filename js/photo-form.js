import { checkTextLength, hasDuplicateValues, isEscEvent } from './util.js';

const TAG_MAX_COUNT = 5;
const TAG_MAX_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 140;

const photoFormElement = document.querySelector('.img-upload__form');
const inputHashTagsElement = photoFormElement.querySelector('.text__hashtags');
const inputDescriptionElement = photoFormElement.querySelector('.text__description');

inputHashTagsElement.addEventListener('input', () => {
  const tags = inputHashTagsElement.value.split(' ').filter((item) => item.length);

  if (/ {2}/.test(inputHashTagsElement.value)) {
    inputHashTagsElement.setCustomValidity('Хеш-тег не может быть пустым (введено более одного пробела)');
  } else if (/# /.test(inputHashTagsElement.value)) {
    inputHashTagsElement.setCustomValidity('Хеш-тег не может состоять только из одного символа #');
  } else if (!tags.every((tag) => /^#/.test(tag)) || /^ /.test(inputHashTagsElement.value)) {
    inputHashTagsElement.setCustomValidity('Наименование хеш-тега должно начинаться с #');
  } else if (!tags.every((tag) => tag.length >= 2 && tag.length <= TAG_MAX_LENGTH)) {
    inputHashTagsElement.setCustomValidity(`Допустимая длина хеш-тега от 2 до ${TAG_MAX_LENGTH} символов`);
  } else if (!tags.every((tag) => /^#[a-zA-Zа-яА-я0-9]+$/.test(tag))) {
    inputHashTagsElement.setCustomValidity('Хеш-тег может состоять только из букв и чисел');
  } else if (hasDuplicateValues(tags)) {
    inputHashTagsElement.setCustomValidity('Хеш-тег не может быть использован дважды');
  } else if (tags.length > TAG_MAX_COUNT) {
    inputHashTagsElement.setCustomValidity(`Допустимо использовать не более ${TAG_MAX_COUNT} хеш-кодов`);
  } else {
    inputHashTagsElement.setCustomValidity('');
  }

  inputHashTagsElement.reportValidity();
});

inputHashTagsElement.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

inputDescriptionElement.addEventListener('input', () => {
  if (!checkTextLength(inputDescriptionElement.value, DESCRIPTION_MAX_LENGTH)) {
    inputHashTagsElement.setCustomValidity(`Максимальная длина комментария ${DESCRIPTION_MAX_LENGTH} символов`);
  } else {
    inputHashTagsElement.setCustomValidity('');
  }

  inputHashTagsElement.reportValidity();
});

inputDescriptionElement.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});
