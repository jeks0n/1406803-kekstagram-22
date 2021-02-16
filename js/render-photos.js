import { openPhotoModal } from './photo-modal.js';

const picturesElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const renderPhotos = (photoData) => {
  const picturesFragment = document.createDocumentFragment();
  photoData.forEach(({ url, likes, comments, description }) => {
    const newPictureElement = pictureTemplate.cloneNode(true);
    newPictureElement.querySelector('.picture__img').src = url;
    newPictureElement.querySelector('.picture__likes').textContent = likes;
    newPictureElement.querySelector('.picture__comments').textContent = comments.length;

    newPictureElement.querySelector('.picture__img')
      .addEventListener('click', () => openPhotoModal({ url, likes, comments, description }));
    picturesFragment.appendChild(newPictureElement);
  });

  picturesElement.appendChild(picturesFragment);
}

export { renderPhotos };
