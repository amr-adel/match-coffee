import { Component, h, render } from "https://unpkg.com/preact?module";
import { MatchCoffee } from "./components/containers/MatchCoffee.js";

render(h(MatchCoffee), document.querySelector("#root"));

export { Component, h, render };

// Preload card images by creating temporary "div"s,
// and assign them the same "data-bgId" that will be used on cards.
window.onload = () => {
  const fragment = new DocumentFragment();

  const bgIds = [
    "n78d2ps",
    "n8sd1p0",
    "n74dfp6",
    "n75dnpc",
    "n06d9pa",
    "n5rdmp2",
    "n18dypr",
    "n6pdipz",
  ];

  const tempCards = document.createElement("div");
  tempCards.id = "temp-cards";

  for (let bgId of bgIds) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-bgId", bgId);
    fragment.appendChild(card);
  }

  tempCards.appendChild(fragment);
  document.body.appendChild(tempCards);

  setTimeout(() => {
    document.querySelector("#temp-cards").remove();
  }, 2000);
};
