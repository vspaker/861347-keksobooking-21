"use strict";
(function () {
  const roomsQuantityInput = window.nodes.adForm.querySelector(`#room_number`);
  const guestsQuantityInput = window.nodes.adForm.querySelector(`#capacity`);
  const accomodationType = window.nodes.adForm.querySelector(`#type`);
  const accomodationPrice = window.nodes.adForm.querySelector(`#price`);
  const timeIn = window.nodes.adForm.querySelector(`#timein`);
  const timeOut = window.nodes.adForm.querySelector(`#timeout`);

  const RoomsQuantity = {
    3: 3
  };
  const MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  const houseTypes = {
    bungalo: `bungalo`,
    flat: `flat`,
    house: `house`,
    palace: `palace`
  };
  const MAX_PRICE = 1000000;

  const validateForm = () => {

    const roomsQuantityInputValue = Number(roomsQuantityInput.value);
    const guestsQuantityInputValue = Number(guestsQuantityInput.value);

    if (roomsQuantityInputValue > RoomsQuantity[3] && guestsQuantityInputValue !== 0) {
      guestsQuantityInput.setCustomValidity(`Сто комнат — только не для гостей`);
    } else if (guestsQuantityInputValue === 0 && roomsQuantityInputValue <= RoomsQuantity[3]) {
      guestsQuantityInput.setCustomValidity(`Не для гостей только 100 комнат`);
    } else if (roomsQuantityInputValue < guestsQuantityInputValue) {
      guestsQuantityInput.setCustomValidity(`Каждая комната вмещает только одного гостя`);
    } else {
      guestsQuantityInput.setCustomValidity(``);
    }

    if (accomodationType.value === houseTypes.bungalo) {
      accomodationPrice.setCustomValidity(``);
      accomodationPrice.placeholder = MinPrice.BUNGALO;
    } else if (accomodationType.value === houseTypes.flat && accomodationPrice.value < MinPrice.FLAT) {
      accomodationPrice.setCustomValidity(`Минимальная стоимость квартиры — 1000 ₽`);
      accomodationPrice.placeholder = MinPrice.FLAT;
    } else if (accomodationType.value === houseTypes.house && accomodationPrice.value < MinPrice.HOUSE) {
      accomodationPrice.setCustomValidity(`Минимальная стоимость дома — 5000 ₽`);
      accomodationPrice.placeholder = MinPrice.HOUSE;
    } else if (accomodationType.value === houseTypes.palace && accomodationPrice.value < MinPrice.PALACE) {
      accomodationPrice.setCustomValidity(`Минимальная стоимость дворца — 10000 ₽`);
      accomodationPrice.placeholder = MinPrice.PALACE;
    } else if (accomodationPrice.value > MAX_PRICE) {
      accomodationPrice.setCustomValidity(`Максимальная цена за ночь: ${MAX_PRICE}`);
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

      window.page.deactivatePage();

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
    window.page.deactivatePage();
  });
  window.form = {
    validateForm
  };
})();
