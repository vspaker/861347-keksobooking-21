"use strict";
(function () {

  const accomodationOptionsFormItem = document.querySelector(`.ad-form`).children;
  const accomodationFiltersFormItem = document.querySelector(`.map__filters`).children;
  const options = Array.from(accomodationOptionsFormItem);
  const filters = Array.from(accomodationFiltersFormItem);
  const mainPinCoordinates = window.nodes.mainPinButton.getBoundingClientRect();

  const deactivatePage = () => {
    window.nodes.mapBlock.classList.add(`map--faded`);
    const setDisabled = (control) => {
      return control.setAttribute(`disabled`, true);
    };
    options.forEach((value) => {
      setDisabled(value);
    });
    filters.forEach((value) => {
      setDisabled(value);
    });
    const xCoefficientForMainPinInactive = window.utils.getShiftX(window.nodes.mainPinButton, 2);
    const yCoefficientForMainPinInactive = window.utils.getShiftY(window.nodes.mainPinButton, 2);
    const mainPinInactiveCoordinateX = Math.round(mainPinCoordinates.x + window.scrollX - xCoefficientForMainPinInactive);
    const mainPinInactiveCoordinateY = Math.round(mainPinCoordinates.y + window.scrollY - yCoefficientForMainPinInactive);
    window.nodes.accomodationAddress.setAttribute(`value`, `${mainPinInactiveCoordinateX}, ${mainPinInactiveCoordinateY}`);
  };

  document.addEventListener(`DOMContentLoaded`, deactivatePage);

  const activatePage = () => {
    const setEnabled = (control) => {
      return control.removeAttribute(`disabled`);
    };
    options.forEach((value) => {
      setEnabled(value);
    });
    filters.forEach((value) => {
      setEnabled(value);
    });
    window.pins.drawPins();


    const xCoefficientForMainPin = window.utils.getShiftX(window.nodes.mainPinButton, 2);
    const yCoefficientForMainPin = window.utils.getShiftY(window.nodes.mainPinButton);

    const mainPinCoordinateX = Math.round(mainPinCoordinates.x + window.scrollX - xCoefficientForMainPin);
    const mainPinCoordinateY = Math.round(mainPinCoordinates.y + window.scrollY - yCoefficientForMainPin);

    window.nodes.accomodationAddress.setAttribute(`value`, `${mainPinCoordinateX}, ${mainPinCoordinateY}`);

    window.nodes.adForm.classList.remove(`ad-form--disabled`);
    const addressInput = window.nodes.adForm.querySelector(`#address`);
    addressInput.setAttribute(`readonly`, `readonly`);

    document.removeEventListener(`DOMContentLoaded`, deactivatePage);
    window.nodes.mainPinButton.removeEventListener(`mousedown`, onMainPinButtonLeftClick);
    window.nodes.mainPinButton.removeEventListener(`keydown`, onMainPinButtonEnterPress);
  };

  const onMainPinButtonLeftClick = (evt) => {
    if (evt.button === 0) {
      activatePage();
    }
  };

  const onMainPinButtonEnterPress = (evt) => {
    if (evt.key === `Enter`) {
      activatePage();
    }
  };

  window.nodes.mainPinButton.addEventListener(`mousedown`, onMainPinButtonLeftClick);
  window.nodes.mainPinButton.addEventListener(`keydown`, onMainPinButtonEnterPress);
  window.page = {
    activatePage,
    deactivatePage,
    onMainPinButtonLeftClick,
    onMainPinButtonEnterPress
  };

})();
