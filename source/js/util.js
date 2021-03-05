const checkTextLength = (text, maxLength) => text.length <= maxLength;

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const hasDuplicateValues = (list) => {
  const unique = list.map((item) => item.toLowerCase()).filter((item, index, array) => array.indexOf(item) === index);
  return unique.length !== list.length;
};

const debounce = (cb, ms) => {
  let timeout;

  return (...args) => {
    const callCb = () => cb.apply(this, args);

    clearTimeout(timeout);

    timeout = setTimeout(callCb, ms);
  };
};

export { checkTextLength, isEscEvent, hasDuplicateValues, debounce };
