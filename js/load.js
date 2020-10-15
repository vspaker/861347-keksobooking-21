"use strict";
(function () {
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;
  const downloadURL = `https://21.javascript.pages.academy/keksobooking/data`;
  const downloadData = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response); return;
      } onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, downloadURL);
    xhr.send();
  };
  const uploadURL = `https://21.javascript.pages.academy/keksobooking`;
  const uploadData = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response); return;
      } onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    });
    xhr.open(`POST`, uploadURL);
    xhr.send(data);

  };

  window.load = {
    downloadData,
    uploadData
  };
})();
