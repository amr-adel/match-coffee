import { h } from "../../index.js";
import { Icon } from "../Icon.js";

const Restart = ({ init }) =>
  h(
    "div",
    {
      class: "restart",
    },
    h("button", { onClick: () => init() }, h(Icon, { name: "restart" }))
  );

export { Restart };
