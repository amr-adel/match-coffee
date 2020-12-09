import { h } from "../../../index.js";
import { MenuContainer } from "../../containers/MenuContainer.js";

const Header = (props) =>
  h(
    "header",
    { class: "header" },
    h("div", { class: "brand" }, h("h1", null, "Match Coffee")),
    h(MenuContainer, props)
  );

export { Header };
