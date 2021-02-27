import { isEscEvent } from './util.js';

const successTemplate = document.querySelector('#success').content;
const errorTemplate = document.querySelector('#error').content;
const mainElement = document.querySelector('main');

const successElement = successTemplate.cloneNode(true).querySelector('section');
const successButton = successElement.querySelector('.success__button');
const errorElement = errorTemplate.cloneNode(true).querySelector('section');
const errorButton = errorElement.querySelector('.error__button');

const showMessage = (element, button, { title, buttonText }) => {
  if (title && buttonText) {
    element.querySelector('h2').textContent = title;
    element.querySelector('button').textContent = buttonText;
  }

  const onOpenMessageEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      element.remove();
      document.removeEventListener('keydown', onOpenMessageEscKeydown);
    }
  };

  mainElement.append(element);

  document.addEventListener('keydown', onOpenMessageEscKeydown);
  element.addEventListener('click', () => element.remove());
  button.addEventListener('click', () => element.remove());
};

const showNote = (message, options = {}) => {
  switch (message) {
    case 'success':
      return showMessage(successElement, successButton, options);
    case 'error':
      return showMessage(errorElement, errorButton, options);
  }
};

export { showNote };
