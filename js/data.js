"use strict";
(function () {
  const generateMocks = (quantity = 8) => {
    let generatedObjects = [];

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

    function getRandomNumber(a = 0, b = 1) {
      return Math.floor(Math.random() * (b - a + 1) + a);
    }

    function getRandomElement(array) {
      return array[getRandomNumber(0, array.length - 1)];
    }

    function getRandomLengthString(array) {
      let newArrayLength = getRandomNumber(0, array.length - 1);
      let newArray = [];
      for (let i = 0; i <= newArrayLength; i++) {
        newArray.push(array[i]);
      }
      return newArray;
    }

    let title = `Пример заголовка`;
    let description = `Пример описания объекта`;

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
  };
  window.data = {
    generateMocks
  };
})();
