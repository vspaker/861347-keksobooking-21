"use strict";
//  Создаём моки данных с возможностью менять количество объектов
function generateMocks(quantity = 8) {
  let generatedArray = [];

  //  Получаем случайное число в диапазоне от a до b
  function getRandomNumber(a = 0, b = 1) {
    return Math.floor(Math.random() * (b - a + 1) + a);
  }

  // Получаем одно рандомное значение из массива
  function getRandomElement(array) {
    return array[getRandomNumber(0, array.length - 1)];
  }

  //  Получаем из массива строку случайной длины
  function getRandomString(array) {
    let newArrayLength = getRandomNumber(0, array.length - 1);
    let newArray = [];
    for (let i = 0; i <= newArrayLength; i++) {
      newArray.push(array[i]);
    }
    return newArray;
  }

  //  Задаём переменные
  const COORD_X_DIAPASON = {
    start: 0,
    end: document.body.clientWidth
  };
  const COORD_Y_DIAPASON = {
    start: 130,
    end: 630
  };

  let title = `Пример заголовка`;
  let description = `Пример описания объекта`;
  let rooms = getRandomNumber(1, 8); // Число комнат: предположим, любое кол-во от 1 до 8
  let guests = getRandomNumber(1, 15); //  Кол-во гостей: предположительно, от 1 до 15
  let price = getRandomNumber(900, 30000); // Цена: допустим, от 900 до 30000

  //  Обозначаем вариативные характеристики объектов размещения
  let accomodation = [`palace`, `flat`, `house`, `bungalow`];
  let checkinCheckout = [`12:00`, `13:00`, `14:00`];
  let features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  let photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  //  Генерируем восемь объектов и записываем их в массив
  for (let i = 1; i <= quantity; i++) {
    let sampleObj = {};
    sampleObj.author = {};
    sampleObj.author.avatar = `img/avatars/user0${i}.png`;
    sampleObj.offer = {};
    sampleObj.offer.title = `${title}`;
    sampleObj.offer.address = `600, 350`;
    sampleObj.offer.price = price;
    sampleObj.offer.type = `${getRandomElement(accomodation)}`;
    sampleObj.offer.rooms = rooms;
    sampleObj.offer.guests = guests;
    sampleObj.offer.checkin = `${getRandomElement(checkinCheckout)}`;
    sampleObj.offer.checkout = `${getRandomElement(checkinCheckout)}`;
    sampleObj.offer.features = getRandomString(features);
    sampleObj.offer.description = description;
    sampleObj.offer.photos = getRandomString(photos);
    sampleObj.location = {};
    sampleObj.location.x = getRandomNumber(COORD_X_DIAPASON.start, COORD_X_DIAPASON.end);
    sampleObj.location.y = getRandomNumber(COORD_Y_DIAPASON.start, COORD_Y_DIAPASON.end);
    generatedArray.push(sampleObj);
  }
  return generatedArray;
}

//  Сохраняем мок
let mock = generateMocks();

//  Переключаем карту в активное состояние
let mapBlock = document.querySelector(`.map`);
mapBlock.classList.remove(`map--faded`);

//  Находим нужные элементы в DOM
let parentPinBlock = document.querySelector(`.map__pins`);
let pinTemplate = document.querySelector(`#pin`).content;
let pin = document.querySelector(`.map__pin`); // вот тут доделать

//  Создаём новый DOM-элемент (метку)
function createNewPin() {
  return pinTemplate.cloneNode(true);
}

// Рассчитываем смещение по осям X и Y и сохраняем значения
function getShiftX() {
  return pin.offsetWidth / 2;
}
function getShiftY() {
  return pin.offsetHeight;
}
let xCoefficient = getShiftX();
let yCoefficient = getShiftY();

//  Отрисовываем метки
function drawPins() {
  for (let i = 0; i < mock.length; i++) {
    let newPin = createNewPin();
    let newPinImage = newPin.querySelector(`img`);
    let newPinButton = newPin.querySelector(`button`);
    newPinButton.style = `left:${mock[i].location.x - xCoefficient}px; top:${mock[i].location.y - yCoefficient}px;`;
    newPinImage.src = `${mock[i].author.avatar}`;
    newPinImage.alt = `${mock[i].offer.title}`;
    parentPinBlock.appendChild(newPin);
  }
  return parentPinBlock;
}
drawPins();
