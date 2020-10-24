"use strict";
(function () {
  const fillCard = (index = 0) => {
    const TRANSLATIONS = {
      flat: `Квартира`,
      bungalow: `Бунгало`,
      house: `Дом`,
      palace: `Дворец`
    };

    const accomodationObject = window.filter.filteredHouses.filteredHouses[index];
    const cardTemplate = document.querySelector(`#card`).content;
    const newCardTemplate = window.utils.cloneElement(cardTemplate);
    const newCardTitle = newCardTemplate.querySelector(`.popup__title`);
    const newCardAddress = newCardTemplate.querySelector(`.popup__text--address`);
    const newCardPrice = newCardTemplate.querySelector(`.popup__text--price`);
    const newCardType = newCardTemplate.querySelector(`.popup__type`);
    const newCardGuestsAndRooms = newCardTemplate.querySelector(`.popup__text--capacity`);
    const newCardCheckinCheckoutTimes = newCardTemplate.querySelector(`.popup__text--time`);
    const newCardDescription = newCardTemplate.querySelector(`.popup__description`);
    const newCardPhotos = newCardTemplate.querySelector(`.popup__photos`);
    const newCardImageItem = newCardPhotos.querySelector(`img`);
    const newCardUserAvatar = newCardTemplate.querySelector(`.popup__avatar`);
    const newCardCloseButton = newCardTemplate.querySelector(`.popup__close`);

    newCardTitle.textContent = accomodationObject.offer.title;
    newCardAddress.textContent = accomodationObject.offer.address;
    newCardPrice.textContent = `${accomodationObject.offer.price}₽/ночь`;
    newCardType.textContent = `${TRANSLATIONS[accomodationObject.offer.type]}`;
    newCardGuestsAndRooms.textContent = `${accomodationObject.offer.rooms} комнаты для ${accomodationObject.offer.guests} гостей`;
    newCardCheckinCheckoutTimes.textContent = `Заезд после ${accomodationObject.offer.checkin}, выезд до ${accomodationObject.offer.checkout}`;
    newCardDescription.textContent = `${accomodationObject.offer.description}`;
    newCardUserAvatar.src = `${accomodationObject.author.avatar}`;
    newCardImageItem.src = accomodationObject.offer.photos[0];

    if (accomodationObject.offer.photos.length > 1) {
      for (let i = 1; i < accomodationObject.offer.photos.length; i++) {
        const newImage = newCardImageItem.cloneNode(true);
        newImage.src = accomodationObject.offer.photos[i];
        newCardPhotos.appendChild(newImage);
      }
    }

    const newCardFeatures = newCardTemplate.querySelector(`.popup__features`).children;
    for (let j = 0; j < newCardFeatures.length; j++) {
      newCardFeatures[j].classList.add(`hidden`);
    }

    for (let k = 0; k < accomodationObject.offer.features.length; k++) {
      const visibleFeature = newCardTemplate.querySelector(`.popup__feature--${accomodationObject.offer.features[k]}`);
      visibleFeature.classList.remove(`hidden`);
    }

    const hideMissingProperty = (block, property, node) => {
      if (accomodationObject[block].hasOwnProperty(`${property}`) === false || accomodationObject[block][property].length === 0) {
        node.classList.add(`hidden`);
      }
    };
    hideMissingProperty(`offer`, `title`, newCardTitle);
    hideMissingProperty(`offer`, `address`, newCardAddress);
    hideMissingProperty(`offer`, `price`, newCardPrice);
    hideMissingProperty(`offer`, `type`, newCardType);
    hideMissingProperty(`offer`, `price`, newCardPrice);
    hideMissingProperty(`offer`, `rooms`, newCardGuestsAndRooms);
    hideMissingProperty(`offer`, `guests`, newCardGuestsAndRooms);
    hideMissingProperty(`offer`, `checkin`, newCardCheckinCheckoutTimes);
    hideMissingProperty(`offer`, `checkout`, newCardCheckinCheckoutTimes);
    hideMissingProperty(`offer`, `description`, newCardDescription);
    hideMissingProperty(`author`, `avatar`, newCardUserAvatar);
    hideMissingProperty(`offer`, `photos`, newCardImageItem);

    const filtersContainer = window.nodes.mapBlock.querySelector(`.map__filters-container`);

    window.nodes.mapBlock.insertBefore(newCardTemplate, filtersContainer);

    document.addEventListener(`keydown`, window.utils.onPopUpEscPress);
    newCardCloseButton.addEventListener(`click`, window.utils.closePopup);
  };
  window.nodes.mainPinButton.addEventListener(`mousedown`, window.utils.onPinMouseDown);

  window.card = {
    fillCard
  };
})();
