import { h } from "../../../index.js";
import { Icon } from "../../Icon.js";

const About = () => {
  return h(
    "div",
    { class: "about-screen" },
    h("h2", { class: "title" }, "Match Coffee"),
    h("p", null, "A matching game for coffee lovers!"),
    h(
      "p",
      null,
      "Match all cards as soon as possible, and with minimum moves."
    ),
    h(
      "p",
      null,
      "You lose a",
      h(Icon, { name: "bean" }),
      "every ",
      h("span", { class: "orange" }, "30"),
      " secondes, after ",
      h("span", { class: "orange" }, "12"),
      " moves, and after ",
      h("span", { class: "orange" }, "20"),
      " moves."
    ),
    h("h2", { class: "title" }, "Credits"),
    h(
      "p",
      null,
      "Cards (Coffee Icon Pack) by",
      h(
        "a",
        {
          class: "link",
          target: "_blank",
          rel: "noopener noreferrer",
          href: "https://iconscout.com/icon-pack/coffee-3",
        },
        "AomAm"
      ),
      ", icons by",
      h(
        "a",
        {
          class: "link",
          target: "_blank",
          rel: "noopener noreferrer",
          href: "https://fontawesome.com/icons?m=free",
        },
        "Font Awesome"
      ),
      "."
    ),
    h(
      "p",
      null,
      "Built with",
      h(
        "a",
        {
          class: "link",
          target: "_blank",
          rel: "noopener noreferrer",
          href: "https://preactjs.com/",
        },
        "Preact"
      ),
      "&",
      h(
        "a",
        {
          class: "link",
          target: "_blank",
          rel: "noopener noreferrer",
          href: "https://firebase.google.com/",
        },
        "Firebase"
      ),
      ", by",
      h(
        "a",
        {
          class: "link",
          target: "_blank",
          rel: "noopener noreferrer",
          href: "https://www.fullstackamr.com/",
        },
        "FULLSTACKAMR"
      ),
      "."
    ),
    h(
      "p",
      null,
      "For source-code and more technical info:",
      h(
        "a",
        {
          class: "link",
          target: "_blank",
          rel: "noopener noreferrer",
          href: "https://github.com/amr-adel/match-coffee",
        },
        "GitHub"
      )
    )
  );
};

export { About };
