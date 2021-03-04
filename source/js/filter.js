const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const PICTURES_RANDOM_LENGTH = 10;
const FILTER_ACTIONS = [
  {
    buttonId: 'filter-default',
    sortElements: (photos) => photos,
  },
  {
    buttonId: 'filter-random',
    sortElements: (photos) => photos.slice().sort(() => Math.random() - 0.5).slice(0, PICTURES_RANDOM_LENGTH),
  },
  {
    buttonId: 'filter-discussed',
    sortElements: (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length),
  },
];

const sectionFilterElement = document.querySelector('.img-filters');
const filtersElement = document.querySelectorAll('.img-filters__button');

const setFilter = (photos, renderPhotosDebounced) => {
  sectionFilterElement.classList.remove('img-filters--inactive');

  filtersElement.forEach((item) => {
    item.addEventListener('click',() => {
      if (item.classList.contains(ACTIVE_BUTTON_CLASS)) {
        return;
      }

      const activeButton = sectionFilterElement.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
      if (activeButton) {
        activeButton.classList.remove(ACTIVE_BUTTON_CLASS);
        item.classList.add(ACTIVE_BUTTON_CLASS);
      }

      FILTER_ACTIONS.filter((element) => element.buttonId === item.id)
        .map((item) => {
          const newPhotos = item.sortElements(photos);
          renderPhotosDebounced(newPhotos);
        });
    });
  });
};

export { setFilter };
