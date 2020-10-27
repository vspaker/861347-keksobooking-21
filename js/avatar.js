"use strict";
(function () {

  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  const showPreview = (input, output, isBackground = false) => {
    const fileChooser = window.nodes.adForm.querySelector(`${input}`);
    const preview = window.nodes.adForm.querySelector(`${output}`);

    fileChooser.addEventListener(`change`, function () {
      const file = fileChooser.files[0];
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((it) => {
        return fileName.endsWith(it);
      });

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener(`load`, () => {
          if (isBackground) {
            preview.style.backgroundSize = `cover`;
            preview.style.backgroundImage = `url(${reader.result})`;
          }
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }

    });
  };

  showPreview(`#avatar`, `.ad-form-header__preview > img`);
  showPreview(`#images`, `.ad-form__photo`, true);

})();
