import { h, Component, render } from "https://unpkg.com/preact?module";

import { App } from "./App.js";

render(h(App), document.body);

export { h, Component, render };

// Preload card icons
window.onload = () => {
  const dummyImage = new Image();
  Array(8)
    .fill("x")
    .forEach((n, i) => {
      dummyImage.src = `./images/cards/card-${i + 1}.svg`;
    });
};
