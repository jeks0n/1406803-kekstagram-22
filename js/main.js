import { renderPhotos } from './render-photos.js';
import { setUserFormSubmit } from './photo-form.js';
import { closePhotoModal } from './add-photo.js';
import { getData } from './api.js';
import { showNote } from './show-note.js';

getData((photos) => {
  renderPhotos(photos);
}, () => showNote('error', {
  title: 'Ошибка загрузки данных',
  buttonText: 'Понятно',
}));

setUserFormSubmit(closePhotoModal, closePhotoModal);

