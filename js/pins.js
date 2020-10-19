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
        window.card.fillCard(i);
      });
      parentPinBlock.appendChild(newPin);
    }
  };

  const successHandler = (houses) => {
    window.pins.houses = {
      houses
    };
  };
  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };
  window.load.downloadData(successHandler, errorHandler);

  const removePins = () => {
    const pinsToRemove = Array.from(window.nodes.mapBlock.querySelectorAll(`.map__pin`));
    pinsToRemove.shift();
    pinsToRemove.forEach((item) => {
      item.remove();
    });
  };
  window.pins = {
    removePins,
    renderPins
  };
})();
