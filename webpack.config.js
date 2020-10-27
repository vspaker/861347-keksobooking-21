const path = require("path");

module.exports = {
  entry: [
    "./js/nodes.js",
    "./js/utils.js",
    "./js/avatar.js",
    "./js/load.js",
    "./js/debounce.js",
    "./js/filter.js",
    "./js/pins.js",
    "./js/card.js",
    "./js/page.js",
    "./js/form.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
