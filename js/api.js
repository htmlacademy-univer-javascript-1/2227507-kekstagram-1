const url = {
  POST: 'https://26.javascript.pages.academy/kekstagram',
  GET: 'https://26.javascript.pages.academy/kekstagram/data',
};

async function getData() {
  const response = await fetch(url.GET,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  );
  if (response.ok) {
    return await response.json();
  }
  throw new Error(`Ошибка: ${response.status} - ${response.statusText} `);
}

function sendData(onSuccess, onFail, body) {
  fetch(url.POST,
    {
      method: 'POST',
      'Content-Type': 'multipart/form-data',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
}

export {getData, sendData};
