import { isEscEvent } from './util.js';

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;
const FILTER_EFFECTS = [
  {
    name: 'Хром',
    getStyle: (value) => `grayscale(${value})`,
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    effectId: 'effect-chrome',
    hasSlider: true,
  },
  {
    name: 'Сепия',
    getStyle: (value) => `sepia(${value})`,
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    effectId: 'effect-sepia',
    hasSlider: true,
  },
  {
    name: 'Марвин',
    getStyle: (value) => `invert(${value}%)`,
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    effectId: 'effect-marvin',
    hasSlider: true,
  },
  {
    name: 'Фобос',
    getStyle: (value) => `blur(${value}px)`,
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    effectId: 'effect-phobos',
    hasSlider: true,
  },
  {
    name: 'Зной',
    getStyle: (value) => `brightness(${value})`,
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    effectId: 'effect-heat',
    hasSlider: true,
  },
  {
    name: 'Оригинал',
    getStyle: () => '',
    effectId: 'effect-none',
    hasSlider: false,
  },
];

const bodyElement = document.querySelector('body');
const inputFileElement = document.querySelector('#upload-file');
const newPhotoModalElement = document.querySelector('.img-upload__overlay');
const newPhotoModalCloseElement = document.querySelector('.img-upload__cancel');
const newPhotoPreviewElement = document.querySelector('.img-upload__preview').querySelector('img');
const scaleMinusButtonElement = document.querySelector('.scale__control--smaller');
const scalePlusButtonElement = document.querySelector('.scale__control--bigger');
const inputScaleElement = document.querySelector('.scale__control--value');
const inputEffectValueElement = document.querySelector('.effect-level__value');
const effectLevelElement = document.querySelector('.effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectListElement = document.querySelector('.effects__list');

const onPhotoModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // Click решает проблему открытия при повторной загрузке того же файла
    newPhotoModalCloseElement.click();
  }
};

inputFileElement.addEventListener('change', (evt) => {
  const reader = new FileReader();
  const file = evt.target.files[0];

  reader.addEventListener('load',  () => {
    newPhotoPreviewElement.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
    inputScaleElement.value = SCALE_DEFAULT + '%';
    newPhotoModalElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');

    document.addEventListener('keydown', onPhotoModalEscKeydown);
  }
});

const closePhotoModal = () => {
  newPhotoModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  effectLevelElement.classList.add('hidden');
  resetEffect();

  document.removeEventListener('keydown', onPhotoModalEscKeydown);
};

newPhotoModalCloseElement.addEventListener('click', closePhotoModal);

scaleMinusButtonElement.addEventListener('click', () => {
  const newScaleValue = parseInt(inputScaleElement.value) - SCALE_STEP;
  if (newScaleValue >= SCALE_MIN) {
    inputScaleElement.value = newScaleValue + '%';
    newPhotoPreviewElement.style.transform = `scale(${newScaleValue / 100})`;
  }
});

scalePlusButtonElement.addEventListener('click', () => {
  const newScaleValue = parseInt(inputScaleElement.value) + SCALE_STEP;
  if (newScaleValue <= SCALE_MAX) {
    inputScaleElement.value = newScaleValue + '%';
    newPhotoPreviewElement.style.transform = `scale(${newScaleValue / 100})`;
  }
});

const resetEffect = () => {
  newPhotoPreviewElement.style.filter = '';
  inputEffectValueElement.value = '';
}
effectLevelElement.classList.add('hidden');

FILTER_EFFECTS.forEach(({ effectId, hasSlider, getStyle, options }) => {
  const effectElement = effectListElement.querySelector(`input[id=${effectId}]`);

  if (effectElement) {
    if (!hasSlider) {
      return effectElement.addEventListener('click', () => {
        resetEffect();
        effectLevelElement.classList.add('hidden');
      });
    }
    effectElement.addEventListener('change', () => {
      if (!sliderElement.noUiSlider) {
        // eslint-disable-next-line no-undef
        noUiSlider.create(sliderElement, options);
      }
      effectLevelElement.classList.remove('hidden');
      resetEffect();
      sliderElement.noUiSlider.off();
      sliderElement.noUiSlider.updateOptions(options);

      sliderElement.noUiSlider.on('update', (values, handle) => {
        newPhotoPreviewElement.style.filter = getStyle(values[handle]);
        inputEffectValueElement.value = values[handle];
      });
    });
  }
});
