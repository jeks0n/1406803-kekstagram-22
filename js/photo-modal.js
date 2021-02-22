import { isEscEvent } from './util.js';
import { clearComments, renderComments } from './render-comments.js';

const bodyElement = document.querySelector('body');
const photoModalElement = document.querySelector('.big-picture');
const bigPhotoElement = photoModalElement.querySelector('.big-picture__img').querySelector('img');
const bigPhotoDescriptionElement = photoModalElement.querySelector('.social__caption');
const likesCountElement = photoModalElement.querySelector('.likes-count');
const commentsCountElement = photoModalElement.querySelector('.comments-count');
const commentsElement = photoModalElement.querySelector('.social__comments');
const photoModalCloseElement = photoModalElement.querySelector('.big-picture__cancel');
const socialCommentCountElement = photoModalElement.querySelector('.social__comment-count');
const commentsLoaderElement = photoModalElement.querySelector('.comments-loader');

const onPhotoModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const openPhotoModal = ({ url, likes, comments, description }) => {
  photoModalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  // Прячем временно до другого задания
  socialCommentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  bigPhotoElement.src = url;
  bigPhotoDescriptionElement.textContent = description;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  clearComments(commentsElement);
  commentsElement.appendChild(renderComments(comments));

  document.addEventListener('keydown', onPhotoModalEscKeydown);
};

const closePhotoModal = () => {
  photoModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onPhotoModalEscKeydown);
};

photoModalCloseElement.addEventListener('click', closePhotoModal);

export { openPhotoModal };
