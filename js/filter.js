"use strict";
(function () {
  const MAX_PINS_TO_DISPLAY = 5;
  const housingType = {
    any: `any`
  };
  const housingPrice = {
    any: `any`,
    low: `low`,
    mid: `mid`,
  };
  const housingRooms = {
    any: `any`
  };
  const housingGuests = {
    any: `any`,
    0: `0`
  };

  const PriceRange = {
    MID: 10000,
    HIGH: 50000
  };

  const filtersForm = window.nodes.mapBlock.querySelector(`.map__filters`);
  const typeFilter = filtersForm.querySelector(`#housing-type`);
  const priceFilter = filtersForm.querySelector(`#housing-price`);
  const roomsFilter = filtersForm.querySelector(`#housing-rooms`);
  const guestsFilter = filtersForm.querySelector(`#housing-guests`);


  const updatePins = () => {

    const sortByType = (house) => {
      if (typeFilter.value === housingType.any) {
        return true;
      }
      return house.offer.type === typeFilter.value;
    };

    const sortByPrice = (house) => {
      if (priceFilter.value === housingPrice.any) {
        return true;
      } else if (priceFilter.value === housingPrice.low) {
        return house.offer.price <= PriceRange.MID;
      } else if (priceFilter.value === housingPrice.mid) {
        return house.offer.price >= PriceRange.MID && house.offer.price <= PriceRange.HIGH;
      }
      return house.offer.price >= PriceRange.HIGH;
    };
    const sortByRooms = (house) => {
      if (roomsFilter.value === housingRooms.any) {
        return true;
      }
      return house.offer.rooms === Number(roomsFilter.value);
    };
    const sortByGuests = (house) => {
      if (guestsFilter.value === housingGuests.any) {
        return true;
      } else if (guestsFilter.value === housingGuests[0]) {
        return false;
      }
      return house.offer.guests >= Number(guestsFilter.value);
    };
    const sortByFeatures = (house) => {
      const featuresFilter = filtersForm.querySelectorAll(`input:checked`);
      return Array.from(featuresFilter).every(function (element) {
        return house.offer.features.includes(element.value);
      });
    };
    const filteredHouses = window.pins.houses.sortedHouses.filter(sortByType).filter(sortByPrice).filter(sortByRooms).filter(sortByGuests).filter(sortByFeatures).slice(0, MAX_PINS_TO_DISPLAY);
    window.filter.filteredHouses = {
      filteredHouses
    };
    return filteredHouses;
  };

  filtersForm.addEventListener(`change`, window.debounce(function () {
    window.pins.removePins();
    window.utils.closePopup();
    window.pins.renderPins(updatePins());
  }));
  window.filter = {
    updatePins
  };
})();
