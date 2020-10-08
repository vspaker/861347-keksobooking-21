"use strict";
(function () {
  const roomsQuantityInput = window.page.adForm.querySelector(`#room_number`);
  const guestsQuantityInput = window.page.adForm.querySelector(`#capacity`);
  const accomodationType = window.page.adForm.querySelector(`#type`);
  const accomodationPrice = window.page.adForm.querySelector(`#price`);
  let timeIn = window.page.adForm.querySelector(`#timein`);
  let timeOut = window.page.adForm.querySelector(`#timeout`);

  function validateForm() {

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

    if (accomodationType.value === `bungalo`) {
      accomodationPrice.setCustomValidity(``);
      accomodationPrice.placeholder = 0;
    } else if (accomodationType.value === `flat` && accomodationPrice.value < 1000) {
      accomodationPrice.setCustomValidity(`Минимальная стоимость квартиры — 1000 ₽`);
      accomodationPrice.placeholder = 1000;
    } else if (accomodationType.value === `house` && accomodationPrice.value < 5000) {
      accomodationPrice.setCustomValidity(`Минимальная стоимость дома — 5000 ₽`);
      accomodationPrice.placeholder = 5000;
    } else if (accomodationType.value === `palace` && accomodationPrice.value < 10000) {
      accomodationPrice.setCustomValidity(`Минимальная стоимость дворца — 10000 ₽`);
      accomodationPrice.placeholder = 10000;
    } else {
      accomodationPrice.setCustomValidity(``);
    }

    if (timeIn.value !== timeOut.value) {
      timeOut.value = timeIn.value;
    }

  }

  window.page.adForm.addEventListener(`change`, validateForm);
  timeOut.addEventListener(`change`, function () {
    timeIn.value = timeOut.value;
  });
})();
