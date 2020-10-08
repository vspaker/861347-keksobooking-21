"use strict";
(function () {
  window.pin.mocks = {
    mock: window.data.mock()
  };

  const parentPinBlock = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content;
  const pin = document.querySelector(`.map__pin`);

  window.pin.shift = {
    x: function getShiftX(element, divider = 1) {
      return element.offsetWidth / divider;
    },
    y: function getShiftY(element, divider = 1) {
      return element.offsetHeight / divider;
    }
  };

  const xCoefficient = window.pin.shift.x(pin, 2);
  const yCoefficient = window.pin.shift.y(pin);

  window.pin.drawPins = {
    draw: function drawPins() {
      const mapBlock = document.querySelector(`.map`);
      mapBlock.classList.remove(`map--faded`);

      for (let i = 0; i < window.pin.mocks.mock.length; i++) {
        const newPin = window.main.clone(pinTemplate);
        const newPinImage = newPin.querySelector(`img`);
        const newPinButton = newPin.querySelector(`button`);
        newPinButton.style = `left:${window.pin.mocks.mock[i].location.x - xCoefficient}px; top:${window.pin.mocks.mock[i].location.y - yCoefficient}px;`;
        newPinImage.src = `${window.pin.mocks.mock[i].author.avatar}`;
        newPinImage.alt = `${window.pin.mocks.mock[i].offer.title}`;
        newPinButton.addEventListener(`keydown`, function (evt) {
          if (evt.key === `Enter`) {
            evt.preventDefault();
            window.card.popup.close();
            window.card.fillCard.fill(i);
          }
        });
        newPinButton.addEventListener(`click`, function () {
          window.card.popup.close();
          window.card.fillCard.fill(i);
        });
        parentPinBlock.appendChild(newPin);
      }
      return parentPinBlock;
    }
  };
})();
