"use strict";
(function () {

  const mock = window.data.generateMocks();
  const parentPinBlock = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content;
  const pin = document.querySelector(`.map__pin`);

  const xCoefficient = window.utils.getShiftX(pin, 2);
  const yCoefficient = window.utils.getShiftY(pin);

  const drawPins = () => {
    window.nodes.mapBlock.classList.remove(`map--faded`);

    for (let i = 0; i < mock.length; i++) {
      const newPin = window.utils.cloneElement(pinTemplate);
      const newPinImage = newPin.querySelector(`img`);
      const newPinButton = newPin.querySelector(`button`);
      newPinButton.style = `left:${mock[i].location.x - xCoefficient}px; top:${mock[i].location.y - yCoefficient}px;`;
      newPinImage.src = `${mock[i].author.avatar}`;
      newPinImage.alt = `${mock[i].offer.title}`;
      newPinButton.addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          evt.preventDefault();
          window.utils.closePopup();
          window.card.fillCard(i);
        }
      });
      newPinButton.addEventListener(`click`, () => {
        window.utils.closePopup();
        window.card.fillCard(i);
      });
      parentPinBlock.appendChild(newPin);
    }
    return parentPinBlock;
  };

  window.pins = {
    drawPins,
    mock
  };
})();
