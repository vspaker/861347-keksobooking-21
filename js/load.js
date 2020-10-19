"use strict";
(function () {
  const StatusCode = {
    OK: 200
  };
  const requestMethod = {
    GET: `GET`,
    POST: `POST`
  };
  const TIMEOUT_IN_MS = 10000;
  const downloadURL = `https://21.javascript.pages.academy/keksobooking/data`;
  const uploadURL = `https://21.javascript.pages.academy/keksobooking`;


  const makeRequest = (request, onSuccess, onError) => {
    request.responseType = `json`;
    request.addEventListener(`load`, function () {
      if (request.status === StatusCode.OK) {
        onSuccess(request.response); return;
      } onError(`Статус ответа: ` + request.status + ` ` + request.statusText);
    });
    request.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + request.timeout + `мс`);
    });
  };

  const downloadData = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    makeRequest(xhr, onSuccess, onError);
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(requestMethod.GET, downloadURL);
    xhr.send();
  };

  const uploadData = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    makeRequest(xhr, onSuccess, onError);
    xhr.open(requestMethod.POST, uploadURL);
    xhr.send(data);

  };

  window.load = {
    downloadData,
    uploadData
  };
})();
