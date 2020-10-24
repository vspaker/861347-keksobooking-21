"use strict";
(function () {
  const cloneElement = (template) => {
    return template.cloneNode(true);
  };
  const getShiftX = (element, divider = 1) => {
    return Math.round(element.offsetWidth / divider);
  };
  const getShiftY = (element, divider = 1) => {
    return Math.round(element.offsetHeight / divider);
  };
  const closePopup = () => {
    const popup = document.querySelector(`.popup`);
    if (popup) {
      popup.remove();
      window.pins.removeActiveClass();
      document.removeEventListener(`keydown`, onPopUpEscPress);
    }
  };
  const onPopUpEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
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
        calculateCoords();
      };
      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();
        window.nodes.mapBlock.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
        if (dragged) {
          const onClickPreventDefault = (clickEvt) => {
            clickEvt.preventDefault();
            calculateCoords();
            window.nodes.mainPinButton.removeEventListener(`click`, onClickPreventDefault);
          };
          window.nodes.mainPinButton.addEventListener(`click`, onClickPreventDefault);
        }
      };
      window.nodes.mapBlock.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  };
  const calculateCoords = () => {
    const MIN_Y_COORD = 130;
    const MAX_Y_COORD = 630;
    const MAIN_PIN_BOTTOM_ARROW_HEIGHT = 18;
    const mainPinShift = {
      x: getShiftX(window.nodes.mainPinButton, 2),
      y: getShiftY(window.nodes.mainPinButton) + MAIN_PIN_BOTTOM_ARROW_HEIGHT
    };
    const minShiftedXCoord = -mainPinShift.x;
    const maxShiftedXCoord = window.nodes.mapBlock.offsetWidth - mainPinShift.x;
    const minShiftedYCoord = MIN_Y_COORD - mainPinShift.y;
    const maxShiftedYCoord = MAX_Y_COORD - mainPinShift.y;

    if ((window.nodes.mainPinButton.offsetTop - window.utils.shift.y) > maxShiftedYCoord) {
      window.nodes.mainPinButton.style.top = maxShiftedYCoord + `px`;
    } else if ((window.nodes.mainPinButton.offsetTop - window.utils.shift.y) < minShiftedYCoord) {
      window.nodes.mainPinButton.style.top = minShiftedYCoord + `px`;
    } else {
      window.nodes.mainPinButton.style.top = (window.nodes.mainPinButton.offsetTop - window.utils.shift.y) + `px`;
    }

    if ((window.nodes.mainPinButton.offsetLeft - window.utils.shift.x) > maxShiftedXCoord) {
      window.nodes.mainPinButton.style.left = maxShiftedXCoord + `px`;
    } else if ((window.nodes.mainPinButton.offsetLeft - window.utils.shift.x) < minShiftedXCoord) {
      window.nodes.mainPinButton.style.left = minShiftedXCoord + `px`;
    } else {
      window.nodes.mainPinButton.style.left = (window.nodes.mainPinButton.offsetLeft - window.utils.shift.x) + `px`;
    }

    let addressCoordX = window.nodes.mainPinButton.offsetLeft - window.utils.shift.x + mainPinShift.x;
    let addressCoordY = window.nodes.mainPinButton.offsetTop - window.utils.shift.y + mainPinShift.y;

    if (addressCoordX < 0) {
      addressCoordX = 0;
    } else if (addressCoordX > window.nodes.mapBlock.offsetWidth) {
      addressCoordX = window.nodes.mapBlock.offsetWidth;
    }
    if (addressCoordY < MIN_Y_COORD) {
      addressCoordY = MIN_Y_COORD;
    } else if (addressCoordY > MAX_Y_COORD) {
      addressCoordY = MAX_Y_COORD;
    }

    window.nodes.accomodationAddress.setAttribute(`value`, ` ${addressCoordX}, ${addressCoordY}`);
  };
  const showErrorMessage = (text) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = text;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };
  window.utils = {
    cloneElement,
    getShiftX,
    getShiftY,
    onPopUpEscPress,
    closePopup,
    onPinMouseDown,
    calculateCoords,
    showErrorMessage
  };
})();
