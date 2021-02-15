import { createPhotoData } from './create-photo-data.js';
import { renderPhotos } from './render-photos.js';
import './photo-modal.js';

const data = createPhotoData();
renderPhotos(data);
