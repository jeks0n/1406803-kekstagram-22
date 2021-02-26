import { renderPhotos } from './render-photos.js';
import { setUserFormSubmit } from './photo-form.js';
import { closePhotoModal } from './add-photo.js';
import { showGlobalAlert } from './util.js';
import { getData } from './api.js';

getData((photos) => {
  renderPhotos(photos);
}, showGlobalAlert);

setUserFormSubmit(closePhotoModal, closePhotoModal);

