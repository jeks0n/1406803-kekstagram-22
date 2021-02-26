const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((photos) => {
      onSuccess(photos);
    })
    .catch((error) => {
      onFail(`Ошибка загрузки данных (${error})`);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (!response.ok) {
        return onSuccess()
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sendData };
