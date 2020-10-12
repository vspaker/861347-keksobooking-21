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
  window.form = {
    validateForm
  };
})();
