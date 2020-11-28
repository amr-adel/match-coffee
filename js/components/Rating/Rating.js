import { h } from "../../index.js";
import { Icon } from "../Icon.js";

const Rating = ({ beans }) => {
  const beansArr = [];

  while (beans > 0) {
    beans--;
    beansArr.push("bean");
  }

  return h(
    "ul",
    { class: "rating" },
    beansArr.map(() => h(Icon, { name: "bean" }))
  );
};

export { Rating };
