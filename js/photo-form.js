import { checkTextLength, hasDuplicateValues, isEscEvent } from './util.js';

const TAG_MAX_COUNT = 5;
const TAG_MAX_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 140;

const photoFormElement = document.querySelector('.img-upload__form');
const inputHashTagsElement = photoFormElement.querySelector('.text__hashtags');
const inputDescriptionElement = photoFormElement.querySelector('.text__description');

inputHashTagsElement.addEventListener('input', () => {
  const tags = inputHashTagsElement.value.replace(/\s+/g,' ').trim().split(' ');

  const tagSpellingValidation = {
    isValid: true,
    errorMessage: '',
  };

  tags.some((tag) => {
    if (!/^#/.test(tag)) {
      tagSpellingValidation.errorMessage = 'Наименование хеш-тега должно начинаться с #';
    } else if (/# /.test(tag)) {
      inputHashTagsElement.setCustomValidity('Хеш-тег не может состоять только из одного символа #');
    } else if (!/^#[a-zA-Zа-яА-я0-9]+$/.test(tag)) {
      tagSpellingValidation.errorMessage = 'Хеш-тег может состоять только из букв и чисел';
    } else if (tag.length < 2 || tag.length > TAG_MAX_LENGTH) {
      tagSpellingValidation.errorMessage = `Допустимая длина хеш-тега от 2 до ${TAG_MAX_LENGTH} символов`;
    } else {
      return false;
    }

    tagSpellingValidation.isValid = false;
    return true;
  });

  if (!tagSpellingValidation.isValid) {
    inputHashTagsElement.setCustomValidity(tagSpellingValidation.errorMessage);
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
