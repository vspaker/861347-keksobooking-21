"use strict";
//  Инструмент для клонирования DOM-элементов
function cloneElement(template) {
  return template.cloneNode(true);
}

//  Создаём моки данных с возможностью менять количество объектов
function generateMocks(quantity = 8) {
  let generatedObjects = [];

  //  Задаём константы
  const COORDINATE_X_DIAPASON = {
    start: 0,
    end: document.querySelector(`.map__overlay`).offsetWidth
  };
  const COORDINATE_Y_DIAPASON = {
    start: 130,
    end: 630
  };
  const ACCOMODATION = [`palace`, `flat`, `house`, `bungalow`];
  const CHECKIN_CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  //  Получаем случайное число в диапазоне от a до b
  function getRandomNumber(a = 0, b = 1) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }

  // Получаем одно рандомное значение из массива
  function getRandomElement(array) {
    return array[getRandomNumber(0, array.length - 1)];
  }

  //  Получаем из массива строку случайной длины
  function getRandomLengthString(array) {
    let newArrayLength = getRandomNumber(0, array.length - 1);
    let newArray = [];
    for (let i = 0; i <= newArrayLength; i++) {
      newArray.push(array[i]);
    }
    return newArray;
  }

  //  Задаём шаблоны заголовка и описания
  let title = `Пример заголовка`;
  let description = `Пример описания объекта`;

  //  Генерируем quantity объектов и записываем их в массив
  for (let i = 1; i <= quantity; i++) {
    generatedObjects.push({
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: `${title}`,
        address: `600, 350`,
        price: getRandomNumber(900, 30000),
        type: `${getRandomElement(ACCOMODATION)}`,
        rooms: getRandomNumber(1, 8),
        guests: getRandomNumber(1, 15),
        checkin: `${getRandomElement(CHECKIN_CHECKOUT_TIMES)}`,
        checkout: `${getRandomElement(CHECKIN_CHECKOUT_TIMES)}`,
        features: getRandomLengthString(FEATURES),
        description: `${description}`,
        photos: getRandomLengthString(PHOTOS)
      },
      location: {
        x: getRandomNumber(COORDINATE_X_DIAPASON.start, COORDINATE_X_DIAPASON.end),
        y: getRandomNumber(COORDINATE_Y_DIAPASON.start, COORDINATE_Y_DIAPASON.end)
      }
    });
  }
  return generatedObjects;
}

//  Сохраняем мок
const mock = generateMocks();

//  Находим нужные элементы в DOM
const parentPinBlock = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content;
const pin = document.querySelector(`.map__pin`);

// Рассчитываем смещение по осям X и Y и сохраняем значения
function getShiftX(element, divider = 1) {
  return element.offsetWidth / divider;
}
function getShiftY(element, divider = 1) {
  return element.offsetHeight / divider;
}
const xCoefficient = getShiftX(pin, 2);
const yCoefficient = getShiftY(pin);

//  Отрисовываем метки на карте
function drawPins() {
  //  Переключаем карту в активное состояние
  const mapBlock = document.querySelector(`.map`);
  mapBlock.classList.remove(`map--faded`);

  for (let i = 0; i < mock.length; i++) {
    const newPin = cloneElement(pinTemplate);
    const newPinImage = newPin.querySelector(`img`);
    const newPinButton = newPin.querySelector(`button`);
    newPinButton.style = `left:${mock[i].location.x - xCoefficient}px; top:${mock[i].location.y - yCoefficient}px;`;
    newPinImage.src = `${mock[i].author.avatar}`;
    newPinImage.alt = `${mock[i].offer.title}`;
    newPinButton.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        evt.preventDefault();
        closePopup();
        fillCard(i);
      }
    });
    newPinButton.addEventListener(`click`, function () {
      closePopup();
      fillCard(i);
    });
    parentPinBlock.appendChild(newPin);
  }
  return parentPinBlock;
}

//  Делаем страницу неактивной при первой загрузке
let accomodationAddress = document.querySelector(`#address`);

const accomodationOptionsFormItem = document.querySelector(`.ad-form`).children;
const accomodationFiltersFormItem = document.querySelector(`.map__filters`).children;
const options = Array.from(accomodationOptionsFormItem);
const filters = Array.from(accomodationFiltersFormItem);
const mainPinButton = document.querySelector(`.map__pin--main`);
let mainPinCoordinates = mainPinButton.getBoundingClientRect();

function deactivatePage() {
  function setDisabled(control) {
    return control.setAttribute(`disabled`, true);
  }
  options.forEach(function (value) {
    setDisabled(value);
  });
  filters.forEach(function (value) {
    setDisabled(value);
  });
  const xCoefficientForMainPinInactive = getShiftX(mainPinButton, 2);
  const yCoefficientForMainPinInactive = getShiftY(mainPinButton, 2);
  const mainPinInactiveCoordinateX = Math.round(mainPinCoordinates.x + window.scrollX - xCoefficientForMainPinInactive);
  const mainPinInactiveCoordinateY = Math.round(mainPinCoordinates.y + window.scrollY - yCoefficientForMainPinInactive);
  accomodationAddress.setAttribute(`value`, `${mainPinInactiveCoordinateX}, ${mainPinInactiveCoordinateY}`);
}

document.addEventListener(`DOMContentLoaded`, deactivatePage);

//  Делаем страницу активной при клике на метку левой кнопкой мыши или клавишей Enter
let adForm = document.querySelector(`.ad-form`);
function activatePage() {
  function setEnabled(control) {
    return control.removeAttribute(`disabled`);
  }
  options.forEach(function (value) {
    setEnabled(value);
  });
  filters.forEach(function (value) {
    setEnabled(value);
  });
  drawPins();

  const xCoefficientForMainPin = getShiftX(mainPinButton, 2);
  const yCoefficientForMainPin = getShiftY(mainPinButton);

  const mainPinCoordinateX = Math.round(mainPinCoordinates.x + window.scrollX - xCoefficientForMainPin);
  const mainPinCoordinateY = Math.round(mainPinCoordinates.y + window.scrollY - yCoefficientForMainPin);

  accomodationAddress.setAttribute(`value`, `${mainPinCoordinateX}, ${mainPinCoordinateY}`);

  adForm.classList.remove(`ad-form--disabled`);
  const addressInput = adForm.querySelector(`#address`);
  addressInput.setAttribute(`readonly`, `readonly`);

  document.removeEventListener(`DOMContentLoaded`, deactivatePage);
  mainPinButton.removeEventListener(`mousedown`, onMainPinButtonLeftClick);
  mainPinButton.removeEventListener(`keydown`, onMainPinButtonEnterPress);
}

function onMainPinButtonLeftClick(evt) {
  if (evt.button === 0) {
    activatePage();
  }
}

function onMainPinButtonEnterPress(evt) {
  if (evt.key === `Enter`) {
    activatePage();
  }
}

mainPinButton.addEventListener(`mousedown`, onMainPinButtonLeftClick);
mainPinButton.addEventListener(`keydown`, onMainPinButtonEnterPress);

// Отрисовываем карточку по клике на метку
function fillCard(index = 0) {

  //  Сохраняем переводы на русский язык
  const TRANSLATIONS = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const cardTemplate = document.querySelector(`#card`).content;
  const accomodationObject = mock[index];

  //  Клонируем шаблон и наполняем карточку
  const newCardTemplate = cloneElement(cardTemplate);
  const newCardTitle = newCardTemplate.querySelector(`.popup__title`);
  const newCardAddress = newCardTemplate.querySelector(`.popup__text--address`);
  const newCardPrice = newCardTemplate.querySelector(`.popup__text--price`);
  const newCardType = newCardTemplate.querySelector(`.popup__type`);
  const newCardGuestsAndRooms = newCardTemplate.querySelector(`.popup__text--capacity`);
  const newCardCheckinCheckoutTimes = newCardTemplate.querySelector(`.popup__text--time`);
  const newCardDescription = newCardTemplate.querySelector(`.popup__description`);
  const newCardPhotos = newCardTemplate.querySelector(`.popup__photos`);
  const newCardImageItem = newCardPhotos.querySelector(`img`);
  const newCardUserAvatar = newCardTemplate.querySelector(`.popup__avatar`);
  const newCardCloseButton = newCardTemplate.querySelector(`.popup__close`);
  newCardTitle.textContent = accomodationObject.offer.title;
  newCardAddress.textContent = accomodationObject.offer.address;
  newCardPrice.textContent = `${accomodationObject.offer.price}₽/ночь`;
  newCardType.textContent = `${TRANSLATIONS[accomodationObject.offer.type]}`;
  newCardGuestsAndRooms.textContent = `${accomodationObject.offer.rooms} комнаты для ${accomodationObject.offer.guests} гостей`;
  newCardCheckinCheckoutTimes.textContent = `Заезд после ${accomodationObject.offer.checkin}, выезд до ${generateMocks()[0].offer.checkout}`;
  newCardDescription.textContent = `${accomodationObject.offer.description}`;
  newCardUserAvatar.src = `${accomodationObject.author.avatar}`;
  newCardImageItem.src = accomodationObject.offer.photos[0];

  //  Выводим фотографии объекта, если их больше одной
  if (accomodationObject.offer.photos.length > 1) {
    for (let i = 1; i < accomodationObject.offer.photos.length; i++) {
      const newImage = newCardImageItem.cloneNode(true);
      newImage.src = accomodationObject.offer.photos[i];
      newCardPhotos.appendChild(newImage);
    }
  }

  //  Скрываем все удобства
  const newCardFeatures = newCardTemplate.querySelector(`.popup__features`).children;
  for (let j = 0; j < newCardFeatures.length; j++) {
    newCardFeatures[j].classList.add(`hidden`);
  }

  //  Показываем удобства в наличии
  for (let k = 0; k < accomodationObject.offer.features.length; k++) {
    const visibleFeature = newCardTemplate.querySelector(`.popup__feature--${accomodationObject.offer.features[k]}`);
    visibleFeature.classList.remove(`hidden`);
  }

  //  Сохраняем родителя и элемент, перед которым будем вставлять карточку
  const filtersContainer = document.querySelector(`.map__filters-container`);

  //  Вставляем карточку в DOM
  const mapBlock = document.querySelector(`.map`);
  mapBlock.insertBefore(newCardTemplate, filtersContainer);

  document.addEventListener(`keydown`, onPopUpEscPress);
  newCardCloseButton.addEventListener(`click`, closePopup);

}

function onPopUpEscPress(evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
}

function closePopup() {
  const popup = document.querySelector(`.popup`);
  if (popup) {
    popup.remove();
  }
  document.removeEventListener(`keydown`, onPopUpEscPress);
}

//  Валидируем форму
const roomsQuantityInput = adForm.querySelector(`#room_number`);
const guestsQuantityInput = adForm.querySelector(`#capacity`);
const accomodationType = adForm.querySelector(`#type`);
const accomodationPrice = adForm.querySelector(`#price`);
let timeIn = adForm.querySelector(`#timein`);
let timeOut = adForm.querySelector(`#timeout`);

function validateForm() {

  const roomsQuantityInputValue = Number(roomsQuantityInput.value);
  const guestsQuantityInputValue = Number(guestsQuantityInput.value);

  if (roomsQuantityInputValue > 3 && guestsQuantityInputValue !== 0) {
    guestsQuantityInput.setCustomValidity(`Сто комнат — только не для гостей`);
  } else if (guestsQuantityInputValue === 0 && roomsQuantityInputValue <= 3) {
    guestsQuantityInput.setCustomValidity(`Не для гостей только 100 комнат`);
  } else if (roomsQuantityInputValue < guestsQuantityInputValue) {
    guestsQuantityInput.setCustomValidity(`Каждая комната вмещает только одного гостя`);
  } else {
    guestsQuantityInput.setCustomValidity(``);
  }

  if (accomodationType.value === `bungalo`) {
    accomodationPrice.setCustomValidity(``);
    accomodationPrice.placeholder = 0;
  } else if (accomodationType.value === `flat` && accomodationPrice.value < 1000) {
    accomodationPrice.setCustomValidity(`Минимальная стоимость квартиры — 1000 ₽`);
    accomodationPrice.placeholder = 1000;
  } else if (accomodationType.value === `house` && accomodationPrice.value < 5000) {
    accomodationPrice.setCustomValidity(`Минимальная стоимость дома — 5000 ₽`);
    accomodationPrice.placeholder = 5000;
  } else if (accomodationType.value === `palace` && accomodationPrice.value < 10000) {
    accomodationPrice.setCustomValidity(`Минимальная стоимость дворца — 10000 ₽`);
    accomodationPrice.placeholder = 10000;
  } else {
    accomodationPrice.setCustomValidity(``);
  }

  if (timeIn.value !== timeOut.value) {
    timeOut.value = timeIn.value;
  }

}

adForm.addEventListener(`change`, validateForm);
timeOut.addEventListener(`change`, function () {
  timeIn.value = timeOut.value;
});
