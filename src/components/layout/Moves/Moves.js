import { h } from "../../../index.js";
import { Icon } from "../../Icon.js";

const Moves = ({ moves }) =>
  h(
    "div",
    { class: "moves" },
    h(Icon, { name: "eye" }),
    h("span", null, moves)
  );

export { Moves };
