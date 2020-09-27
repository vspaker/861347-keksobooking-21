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
    end: document.querySelector(`.map__overlay`).offsetWidth /* document.body.clientWidth */
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

  //  Получаем случайное число комнат (по умолчанию в диапазоне от 1 до 8)
  function getRandomRoomsQuantity(from = 1, to = 8) {
    return getRandomNumber(from, to);
  }

  //  Получаем случайное число гостей (по умолчанию от 1 до 15)
  function getRandomGuestsQuantity(from = 1, to = 15) {
    return getRandomNumber(from, to);
  }

  //  Получаем случайную стоимость суток (по умолчанию от 900 до 30000)
  function getRandomPrice(from = 900, to = 30000) {
    return getRandomNumber(from, to);
  }

  //  Генерируем quantity объектов и записываем их в массив
  for (let i = 1; i <= quantity; i++) {
    generatedObjects.push({
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: `${title}`,
        address: `600, 350`,
        price: getRandomPrice(),
        type: `${getRandomElement(ACCOMODATION)}`,
        rooms: getRandomRoomsQuantity(),
        guests: getRandomGuestsQuantity(),
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

//  Переключаем карту в активное состояние
const mapBlock = document.querySelector(`.map`);
mapBlock.classList.remove(`map--faded`);

//  Находим нужные элементы в DOM
const parentPinBlock = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content;
const pin = document.querySelector(`.map__pin`);

// Рассчитываем смещение по осям X и Y и сохраняем значения
function getShiftX() {
  return pin.offsetWidth / 2;
}
function getShiftY() {
  return pin.offsetHeight;
}
const xCoefficient = getShiftX();
const yCoefficient = getShiftY();

//  Отрисовываем метки на карте
function drawPins() {
  for (let i = 0; i < mock.length; i++) {
    const newPin = cloneElement(pinTemplate);
    const newPinImage = newPin.querySelector(`img`);
    const newPinButton = newPin.querySelector(`button`);
    newPinButton.style = `left:${mock[i].location.x - xCoefficient}px; top:${mock[i].location.y - yCoefficient}px;`;
    newPinImage.src = `${mock[i].author.avatar}`;
    newPinImage.alt = `${mock[i].offer.title}`;
    parentPinBlock.appendChild(newPin);
  }
  return parentPinBlock;
}
drawPins();

//  Создаём карточку объекта размещения
function fillCard() {

  //  Сохраняем переводы на русский язык
  const TRANSLATIONS = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  //  Достаём нужный шаблон
  const cardTemplate = document.querySelector(`#card`).content;

  //  Сохраняем первый мок
  const accomodationObject = generateMocks()[0];

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
  for (let i = 0; i < newCardFeatures.length; i++) {
    newCardFeatures[i].classList.add(`hidden`);
  }

  //  Показываем удобства в наличии
  for (let i = 0; i < accomodationObject.offer.features.length; i++) {
    const visibleFeature = newCardTemplate.querySelector(`.popup__feature--${accomodationObject.offer.features[i]}`);
    visibleFeature.classList.remove(`hidden`);
  }

  //  Сохраняем родителя и элемент, перед которым будем вставлять карточку
  const filtersContainer = document.querySelector(`.map__filters-container`);

  //  Вставляем карточку в DOM
  mapBlock.insertBefore(newCardTemplate, filtersContainer);

  return;
}

fillCard();
