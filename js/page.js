"use strict";
(function () {
  const accomodationAddress = document.querySelector(`#address`);

  const accomodationOptionsFormItem = document.querySelector(`.ad-form`).children;
  const accomodationFiltersFormItem = document.querySelector(`.map__filters`).children;
  const options = Array.from(accomodationOptionsFormItem);
  const filters = Array.from(accomodationFiltersFormItem);
  const mainPinButton = document.querySelector(`.map__pin--main`);
  const mainPinCoordinates = mainPinButton.getBoundingClientRect();

  const deactivatePage = () => {
    const setDisabled = (control) => {
      return control.setAttribute(`disabled`, true);
    };
    options.forEach((value) => {
      setDisabled(value);
    });
    filters.forEach((value) => {
      setDisabled(value);
    });
    const xCoefficientForMainPinInactive = window.utils.getShiftX(mainPinButton, 2);
    const yCoefficientForMainPinInactive = window.utils.getShiftY(mainPinButton, 2);
    const mainPinInactiveCoordinateX = Math.round(mainPinCoordinates.x + window.scrollX - xCoefficientForMainPinInactive);
    const mainPinInactiveCoordinateY = Math.round(mainPinCoordinates.y + window.scrollY - yCoefficientForMainPinInactive);
    accomodationAddress.setAttribute(`value`, `${mainPinInactiveCoordinateX}, ${mainPinInactiveCoordinateY}`);
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
    window.pin.drawPins();

    const xCoefficientForMainPin = window.utils.getShiftX(mainPinButton, 2);
    const yCoefficientForMainPin = window.utils.getShiftY(mainPinButton);

    const mainPinCoordinateX = Math.round(mainPinCoordinates.x + window.scrollX - xCoefficientForMainPin);
    const mainPinCoordinateY = Math.round(mainPinCoordinates.y + window.scrollY - yCoefficientForMainPin);

    accomodationAddress.setAttribute(`value`, `${mainPinCoordinateX}, ${mainPinCoordinateY}`);

    window.nodes.adForm.classList.remove(`ad-form--disabled`);
    const addressInput = window.nodes.adForm.querySelector(`#address`);
    addressInput.setAttribute(`readonly`, `readonly`);

    document.removeEventListener(`DOMContentLoaded`, deactivatePage);
    mainPinButton.removeEventListener(`mousedown`, onMainPinButtonLeftClick);
    mainPinButton.removeEventListener(`keydown`, onMainPinButtonEnterPress);
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

  mainPinButton.addEventListener(`mousedown`, onMainPinButtonLeftClick);
  mainPinButton.addEventListener(`keydown`, onMainPinButtonEnterPress);
})();
