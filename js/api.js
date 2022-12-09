

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((images) => {
      onSuccess(images);
    });
};

const sendData = (onSuccess, onFail, body)=> {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Изображение не опубликовано. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Изображение не опубликовано. Попробуйте ещё раз');
    });
};

export {getData, sendData};
