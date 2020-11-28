import { h } from "../../index.js";
import { Icon } from "../Icon.js";

const Stopwatch = ({ time }) =>
  h(
    "div",
    { class: "stopwatch" },
    h(Icon, { name: "stopwatch" }),
    h("span", null, time)
  );

export { Stopwatch };
