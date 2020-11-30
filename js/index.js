import { h, Component, render } from "https://unpkg.com/preact?module";

import { App } from "./App.js";

render(h(App), document.body);

export { h, Component, render };

// Preload card icons
window.onload = () => {
  const dummyImage = new Image();

  const load = (n) => {
    dummyImage.onload = () => {
      if (n < 8) load(n + 1);
    };
    dummyImage.src = `./images/cards/card-${n}.svg`;
  };

  load(1);
};
