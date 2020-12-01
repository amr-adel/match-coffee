import { h, Component, render } from "https://unpkg.com/preact?module";

import { App } from "./App.js";

render(h(App), document.body);

export { h, Component, render };

// Preload card icons
window.onload = () => {
  const fragment = new DocumentFragment();

  const preloadCardIcon = (n) => {
    if (n < 8) preloadCardIcon(n + 1);

    const preloadLink = document.createElement("link");
    preloadLink.href = `./images/cards/card-${n}.svg`;
    preloadLink.rel = "preload";
    preloadLink.as = "image";
    fragment.appendChild(preloadLink);
  };

  preloadCardIcon(1);
  document.head.appendChild(fragment);
};
