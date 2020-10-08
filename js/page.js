"use strict";
(function () {
  let accomodationAddress = document.querySelector(`#address`);

  const accomodationOptionsFormItem = document.querySelector(`.ad-form`).children;
  const accomodationFiltersFormItem = document.querySelector(`.map__filters`).children;
  const options = Array.from(accomodationOptionsFormItem);
  const filters = Array.from(accomodationFiltersFormItem);
  const mainPinButton = document.querySelector(`.map__pin--main`);
  let mainPinCoordinates = mainPinButton.getBoundingClientRect();

  function deactivatePage() {
    function setDisabled(control) {
      return control.setAttribute(`disabled`, true);
    }
    options.forEach(function (value) {
      setDisabled(value);
    });
    filters.forEach(function (value) {
      setDisabled(value);
    });
    const xCoefficientForMainPinInactive = window.pin.shift.x(mainPinButton, 2);
    const yCoefficientForMainPinInactive = window.pin.shift.y(mainPinButton, 2);
    const mainPinInactiveCoordinateX = Math.round(mainPinCoordinates.x + window.scrollX - xCoefficientForMainPinInactive);
    const mainPinInactiveCoordinateY = Math.round(mainPinCoordinates.y + window.scrollY - yCoefficientForMainPinInactive);
    accomodationAddress.setAttribute(`value`, `${mainPinInactiveCoordinateX}, ${mainPinInactiveCoordinateY}`);
  }

  document.addEventListener(`DOMContentLoaded`, deactivatePage);

  window.page = {
    adForm: document.querySelector(`.ad-form`)
  };
  function activatePage() {
    function setEnabled(control) {
      return control.removeAttribute(`disabled`);
    }
    options.forEach(function (value) {
      setEnabled(value);
    });
    filters.forEach(function (value) {
      setEnabled(value);
    });
    window.pin.drawPins.draw();

    const xCoefficientForMainPin = window.pin.shift.x(mainPinButton, 2);
    const yCoefficientForMainPin = window.pin.shift.y(mainPinButton);

    const mainPinCoordinateX = Math.round(mainPinCoordinates.x + window.scrollX - xCoefficientForMainPin);
    const mainPinCoordinateY = Math.round(mainPinCoordinates.y + window.scrollY - yCoefficientForMainPin);

    accomodationAddress.setAttribute(`value`, `${mainPinCoordinateX}, ${mainPinCoordinateY}`);

    window.page.adForm.classList.remove(`ad-form--disabled`);
    const addressInput = window.page.adForm.querySelector(`#address`);
    addressInput.setAttribute(`readonly`, `readonly`);

    document.removeEventListener(`DOMContentLoaded`, deactivatePage);
    mainPinButton.removeEventListener(`mousedown`, onMainPinButtonLeftClick);
    mainPinButton.removeEventListener(`keydown`, onMainPinButtonEnterPress);
  }

  function onMainPinButtonLeftClick(evt) {
    if (evt.button === 0) {
      activatePage();
    }
  }

  function onMainPinButtonEnterPress(evt) {
    if (evt.key === `Enter`) {
      activatePage();
    }
  }

  mainPinButton.addEventListener(`mousedown`, onMainPinButtonLeftClick);
  mainPinButton.addEventListener(`keydown`, onMainPinButtonEnterPress);
})();
