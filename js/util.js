const getInteger = (min, max) => {
  if (min > max) {
    throw new Error('Стартовое значение диапазона не может быть больше финального значения');
  } else if (min < 0 || max < 0) {
    throw new Error('Диапазон может содержать только положительные значения')
  }

  return Math.floor(min + Math.random() * (max + 1 - min))
};

const getRandomArrayElement = (elements, { repeat = false } = {}) => {
  if (repeat) {
    return () => elements[getInteger(0, elements.length - 1)];
  }

  const copy = elements.slice().sort(() => Math.random() - 0.5);
  let index = 0;

  return () => {
    if (index >= copy.length) {
      throw new Error('Больше нет элементов для отображения');
    }
    index++;

    return copy[index - 1];
  }
};

const checkTextLength = (text, maxLength) => text.length <= maxLength;

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const hasDuplicateValues = (list) => {
  const unique = list.map((item) => item.toLowerCase()).filter((item, index, array) => array.indexOf(item) === index);
  return unique.length !== list.length;
};

const showGlobalAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

export { getInteger, getRandomArrayElement, checkTextLength, isEscEvent, hasDuplicateValues, showGlobalAlert };
