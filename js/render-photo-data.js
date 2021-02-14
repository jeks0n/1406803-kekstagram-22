import { createPhotoData } from './create-photo-data.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const photoData = createPhotoData();

const picturesFragment = document.createDocumentFragment();

photoData.forEach(({ url, likes, comments }) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.appendChild(newPicture);
})

pictures.appendChild(picturesFragment);
