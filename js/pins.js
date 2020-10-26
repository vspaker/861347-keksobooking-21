"use strict";
(function () {
  const parentPinBlock = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content;
  const pin = document.querySelector(`.map__pin`);

  const xCoefficient = window.utils.getShiftX(pin, 2);
  const yCoefficient = window.utils.getShiftY(pin);

  const renderPins = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const newPin = window.utils.cloneElement(pinTemplate);
      const newPinImage = newPin.querySelector(`img`);
      const newPinButton = newPin.querySelector(`button`);
      newPinButton.style = `left:${arr[i].location.x - xCoefficient}px; top:${arr[i].location.y - yCoefficient}px;`;
      newPinImage.src = `${arr[i].author.avatar}`;
      newPinImage.alt = `${arr[i].offer.title}`;
      newPinButton.addEventListener(`click`, () => {
        window.utils.closePopup();
        newPinButton.classList.toggle(`map__pin--active`);
        window.card.fillCard(i);
      });
      parentPinBlock.appendChild(newPin);
    }
  };
  const successHandler = (houses) => {
    const sortByOffer = (house) => {
      return house.hasOwnProperty(`offer`);
    };
    const sortedHouses = houses.filter(sortByOffer);
    window.pins.houses = {
      sortedHouses
    };
  };
  const errorHandler = (errorMessage) => {
    window.utils.showErrorMessage(errorMessage);
  };
  window.load.downloadData(successHandler, errorHandler);

  const selectPins = () => {
    const pins = Array.from(window.nodes.mapBlock.querySelectorAll(`.map__pin`));
    pins.shift();
    return pins;
  };

  const removePins = () => {
    selectPins().forEach((item) => {
      item.remove();
    });
  };
  const removeActiveClass = () => {
    selectPins().forEach((item) => {
      if (item.classList.contains(`map__pin--active`)) {
        item.classList.remove(`map__pin--active`);
      }
    });
  };
  const onPinMouseDown = (evt) => {
    if (evt.button === 0) {
      evt.preventDefault();
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      let dragged = false;
      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        dragged = true;
        window.utils.shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        window.utils.calculateCoords();
      };
      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();
        window.nodes.mapBlock.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
        if (dragged) {
          const onClickPreventDefault = (clickEvt) => {
            clickEvt.preventDefault();
            window.utils.calculateCoords();
            window.nodes.mainPinButton.removeEventListener(`click`, onClickPreventDefault);
          };
          window.nodes.mainPinButton.addEventListener(`click`, onClickPreventDefault);
        }
      };
      window.nodes.mapBlock.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  };
  window.pins = {
    removePins,
    renderPins,
    removeActiveClass,
    onPinMouseDown
  };
})();
