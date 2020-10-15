"use strict";
(function () {
  const roomsQuantityInput = window.nodes.adForm.querySelector(`#room_number`);
  const guestsQuantityInput = window.nodes.adForm.querySelector(`#capacity`);
  const accomodationType = window.nodes.adForm.querySelector(`#type`);
  const accomodationPrice = window.nodes.adForm.querySelector(`#price`);
  const timeIn = window.nodes.adForm.querySelector(`#timein`);
  const timeOut = window.nodes.adForm.querySelector(`#timeout`);

  const validateForm = () => {

    const roomsQuantityInputValue = Number(roomsQuantityInput.value);
    const guestsQuantityInputValue = Number(guestsQuantityInput.value);

    if (roomsQuantityInputValue > 3 && guestsQuantityInputValue !== 0) {
      guestsQuantityInput.setCustomValidity(`Сто комнат — только не для гостей`);
    } else if (guestsQuantityInputValue === 0 && roomsQuantityInputValue <= 3) {
      guestsQuantityInput.setCustomValidity(`Не для гостей только 100 комнат`);
    } else if (roomsQuantityInputValue < guestsQuantityInputValue) {
      guestsQuantityInput.setCustomValidity(`Каждая комната вмещает только одного гостя`);
    } else {
      guestsQuantityInput.setCustomValidity(``);
    }

    const minPrice = {
      flat: 1000,
      house: 5000,
      palace: 10000
    };
    const houseTypes = {
      BUNGALO: `bungalo`,
      FLAT: `flat`,
      HOUSE: `house`,
      PALACE: `palace`
    };

    if (accomodationType.value === houseTypes.BUNGALO) {
      accomodationPrice.setCustomValidity(``);
      accomodationPrice.placeholder = 0;
    } else if (accomodationType.value === houseTypes.FLAT && accomodationPrice.value < minPrice.flat) {
      accomodationPrice.setCustomValidity(`Минимальная стоимость квартиры — 1000 ₽`);
      accomodationPrice.placeholder = 1000;
    } else if (accomodationType.value === houseTypes.HOUSE && accomodationPrice.value < minPrice.house) {
      accomodationPrice.setCustomValidity(`Минимальная стоимость дома — 5000 ₽`);
      accomodationPrice.placeholder = 5000;
    } else if (accomodationType.value === houseTypes.PALACE && accomodationPrice.value < minPrice.palace) {
      accomodationPrice.setCustomValidity(`Минимальная стоимость дворца — 10000 ₽`);
      accomodationPrice.placeholder = 10000;
    } else {
      accomodationPrice.setCustomValidity(``);
    }

    if (timeIn.value !== timeOut.value) {
      timeOut.value = timeIn.value;
    }

  };

  timeOut.addEventListener(`change`, () => {
    timeIn.value = timeOut.value;
  });

  window.nodes.adForm.addEventListener(`submit`, (evt) => {
    const successHandler = () => {
      window.nodes.adForm.reset();
      window.page.deactivatePage();

      const pinsCollection = document.querySelectorAll(`.map__pin`);
      const pins = Array.from(pinsCollection);
      pins.shift();
      pins.forEach((item) => {
        item.remove();
      });
      window.nodes.mainPinButton.addEventListener(`mousedown`, window.page.onMainPinButtonLeftClick);
      window.nodes.mainPinButton.addEventListener(`keydown`, window.page.onMainPinButtonEnterPress);

      window.nodes.adForm.classList.add(`ad-form--disabled`);

      const successMessageTemplate = document.querySelector(`#success`).content;
      const successMessageElement = successMessageTemplate.cloneNode(true);
      window.nodes.mapBlock.appendChild(successMessageElement);
      const successOverlay = document.querySelector(`.success`);

      const onSuccessOverlayEscPress = (evtSuccessEscPress) => {
        if (evtSuccessEscPress.key === `Escape`) {
          evtSuccessEscPress.preventDefault();
          successOverlay.remove();
          document.removeEventListener(`keydown`, onSuccessOverlayEscPress);
          document.removeEventListener(`click`, onSuccessOverlayClick);
        }
      };
      const onSuccessOverlayClick = (evtSuccessClick) => {
        evtSuccessClick.preventDefault();
        successOverlay.remove();
        document.removeEventListener(`click`, onSuccessOverlayClick);
        document.removeEventListener(`keydown`, onSuccessOverlayEscPress);
      };
      document.addEventListener(`keydown`, onSuccessOverlayEscPress);
      document.addEventListener(`click`, onSuccessOverlayClick);
    };
    const errorHandler = () => {
      const errorTemplate = document.querySelector(`#error`).content;
      const errorMessage = errorTemplate.cloneNode(true);
      const errorMessageContainer = document.querySelector(`main`);
      errorMessageContainer.appendChild(errorMessage);
      const errorButton = document.querySelector(`.error__button`);
      const errorOverlay = document.querySelector(`.error`);

      const onErrorOverlayButtonClick = (evtErrorButtonClick) => {
        evtErrorButtonClick.preventDefault();
        errorOverlay.remove();
        errorButton.removeEventListener(`click`, onErrorOverlayButtonClick);
        document.removeEventListener(`keydown`, onErrorOverlayEscPress);
        document.removeEventListener(`click`, onErrorOverlayClick);
      };

      const onErrorOverlayEscPress = (evtErrorEscPress) => {
        if (evtErrorEscPress.key === `Escape`) {
          evtErrorEscPress.preventDefault();
          errorOverlay.remove();
          document.removeEventListener(`keydown`, onErrorOverlayEscPress);
          errorButton.removeEventListener(`click`, onErrorOverlayButtonClick);
          document.removeEventListener(`click`, onErrorOverlayClick);
        }
      };

      const onErrorOverlayClick = (evtErrorClick) => {
        evtErrorClick.preventDefault();
        errorOverlay.remove();
        document.removeEventListener(`click`, onErrorOverlayClick);
        document.removeEventListener(`keydown`, onErrorOverlayEscPress);
        errorButton.removeEventListener(`click`, onErrorOverlayButtonClick);
      };

      errorButton.addEventListener(`click`, onErrorOverlayButtonClick);
      document.addEventListener(`keydown`, onErrorOverlayEscPress);
      document.addEventListener(`click`, onErrorOverlayClick);
    };
    window.load.uploadData(new FormData(window.nodes.adForm), successHandler, errorHandler);
    evt.preventDefault();
  });
  const resetButton = window.nodes.adForm.querySelector(`.ad-form__reset`);
  resetButton.addEventListener(`click`, () => {
    window.nodes.adForm.reset();
  });
  window.form = {
    validateForm
  };
})();
