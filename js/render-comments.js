const commentsFragment = document.createDocumentFragment();

const clearComments = (commentsElement) => {
  commentsElement.innerHTML = '';
}

const renderComments = (array) => {
  array.forEach(({ avatar, message, name }) => {
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

  return commentsFragment;
}

export { clearComments, renderComments };
