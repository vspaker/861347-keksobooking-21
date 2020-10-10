"use strict";
(function () {
  const cloneElement = (template) => {
    return template.cloneNode(true);
  };
  const getShiftX = (element, divider = 1) => {
    return element.offsetWidth / divider;
  };
  const getShiftY = (element, divider = 1) => {
    return element.offsetHeight / divider;
  };
  const closePopup = () => {
    const popup = document.querySelector(`.popup`);
    if (popup) {
      popup.remove();
      document.removeEventListener(`keydown`, onPopUpEscPress);
    }
  };
  const onPopUpEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };
  window.utils = {
    cloneElement,
    getShiftX,
    getShiftY,
    onPopUpEscPress,
    closePopup
  };
})();
