import { h } from "../../index.js";
import { Icon } from "../Icon.js";

const Stopwatch = ({ time }) => {
  let min = 0;
  let sec = time;

  while (sec >= 60) {
    sec -= 60;
    min += 1;
  }

  const formatedTime = `${min}:${sec <= 9 ? "0" + sec : sec}`;

  return h(
    "div",
    { class: "stopwatch" },
    h(Icon, { name: "stopwatch" }),
    h("span", null, formatedTime)
  );
};

export { Stopwatch };
