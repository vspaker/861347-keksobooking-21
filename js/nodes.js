"use strict";
(function () {
  const adForm = document.querySelector(`.ad-form`);
  const mapBlock = document.querySelector(`.map`);
  const filtersForm = mapBlock.querySelector(`.map__filters`);
  const mainPinButton = document.querySelector(`.map__pin--main`);
  const accomodationAddress = document.querySelector(`#address`);
  window.nodes = {
    adForm,
    mapBlock,
    filtersForm,
    mainPinButton,
    accomodationAddress
  };
})();
