import { renderPhotos } from './render-photos.js';
import { setUserFormSubmit } from './photo-form.js';
import { closePhotoModal } from './add-photo.js';
import { getData } from './api.js';
import { showNote } from './show-note.js';
import { setFilter } from './filter.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 2000;

getData((photos) => {
  renderPhotos(photos);
  setFilter(photos, debounce(renderPhotos, RERENDER_DELAY));
},
() => showNote('error', {
  title: 'Ошибка загрузки данных',
  buttonText: 'Понятно',
}));

setUserFormSubmit(closePhotoModal, closePhotoModal);

