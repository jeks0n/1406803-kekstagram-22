import { createPhotoData } from './create-photo-data.js';
import { renderPhotos } from './render-photos.js';
import './add-photo.js';

const data = createPhotoData();
renderPhotos(data);
