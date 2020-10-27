"use strict";

const MAIN_PIN_BUTTON_DEFAULT_POSITION = {
  left: +/\d+/.exec(window.nodes.mainPinButton.style.left),
  top: +/\d+/.exec(window.nodes.mainPinButton.style.top)
};
const PIN_ARROW_HEIGHT = 22;
const MAIN_PIN_COORDS_SHIFT_ON_ACTIVATE_PAGE = {
  x: 0,
  y: window.nodes.mainPinButton.offsetHeight / 2 + PIN_ARROW_HEIGHT
};
const xCoefficientForMainPinDefaultPosition = window.utils.getShiftX(window.nodes.mainPinButton, 2);
const yCoefficientForMainPinDefaultPosition = window.utils.getShiftY(window.nodes.mainPinButton, 2);
const mainPinDefaultAddressCoordinateX = Math.round(window.nodes.mainPinButton.offsetLeft + xCoefficientForMainPinDefaultPosition);
const mainPinDefaultAddressCoordinateY = Math.round(window.nodes.mainPinButton.offsetTop + yCoefficientForMainPinDefaultPosition);
const accomodationOptionsFormItem = document.querySelector(`.ad-form`).children;
const accomodationFiltersFormItem = document.querySelector(`.map__filters`).children;
const options = Array.from(accomodationOptionsFormItem);
const filters = Array.from(accomodationFiltersFormItem);

const deactivatePage = () => {
  window.nodes.adForm.reset();
  window.nodes.filtersForm.reset();
  window.nodes.adForm.classList.add(`ad-form--disabled`);
  window.nodes.mapBlock.classList.add(`map--faded`);
  window.pins.removePins();
  window.utils.closePopup();
  const setDisabled = (control) => {
    return control.setAttribute(`disabled`, true);
  };
  options.forEach((value) => {
    setDisabled(value);
  });
  filters.forEach((value) => {
    setDisabled(value);
  });
  window.nodes.mainPinButton.style.left = MAIN_PIN_BUTTON_DEFAULT_POSITION.left + `px`;
  window.nodes.mainPinButton.style.top = MAIN_PIN_BUTTON_DEFAULT_POSITION.top + `px`;
  window.nodes.accomodationAddress.setAttribute(`value`, `${mainPinDefaultAddressCoordinateX}, ${mainPinDefaultAddressCoordinateY}`);

  window.nodes.mainPinButton.addEventListener(`mousedown`, window.page.onMainPinButtonLeftClick);
  window.nodes.mainPinButton.addEventListener(`keydown`, window.page.onMainPinButtonEnterPress);
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
  try {
    window.pins.renderPins(window.filter.updatePins());
  } catch (err) {
    window.utils.showErrorMessage(`Упс! Ошибка` + err.name + `. Обновите страницу и попробуйте ещё раз!`);
  }

  window.nodes.mapBlock.classList.remove(`map--faded`);

  const mainPinActiveCoordX = Math.round(mainPinDefaultAddressCoordinateX + MAIN_PIN_COORDS_SHIFT_ON_ACTIVATE_PAGE.x);
  const mainPinActiveCoordY = Math.round(mainPinDefaultAddressCoordinateY + MAIN_PIN_COORDS_SHIFT_ON_ACTIVATE_PAGE.y);

  window.nodes.accomodationAddress.setAttribute(`value`, `${mainPinActiveCoordX}, ${mainPinActiveCoordY}`);

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

