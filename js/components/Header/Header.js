import { h } from "../../index.js";
import { Menu } from "./Menu/Menu.js";

const Header = ({ setModal }) =>
  h(
    "header",
    { class: "header" },
    h("div", { class: "brand" }, h("h1", null, "Match Coffee")),
    h(Menu, { setModal })
  );

export { Header };
