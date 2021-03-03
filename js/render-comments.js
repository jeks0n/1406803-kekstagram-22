const VISIBILITY_STEP = 5;

const clearComments = (commentsElement) => {
  commentsElement.innerHTML = '';
};

const renderComments = (stateVisibility, commentsLoaderElement, socialCommentCountElement) => {
  const commentsFragment = document.createDocumentFragment();

  stateVisibility.comments.slice(stateVisibility.visibleLength, stateVisibility.visibleLength + VISIBILITY_STEP)
    .forEach(({ avatar, message, name }) => {
      const socialCommentElement = document.createElement('li');
      socialCommentElement.classList.add('social__comment');
      socialCommentElement.innerHTML = `<img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>`

      commentsFragment.appendChild(socialCommentElement);
    });

  const newCalculatedLength = stateVisibility.visibleLength + VISIBILITY_STEP;
  const commentsLength = stateVisibility.comments.length;
  stateVisibility.visibleLength = commentsLength <= newCalculatedLength ? commentsLength : newCalculatedLength;
  socialCommentCountElement.childNodes[0].nodeValue = `${stateVisibility.visibleLength} из `;

  if (stateVisibility.visibleLength === commentsLength) {
    commentsLoaderElement.classList.add('hidden');
  }

  return commentsFragment;
};

export { clearComments, renderComments };
