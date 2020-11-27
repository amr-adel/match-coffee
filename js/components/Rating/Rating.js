import { h } from "../../index.js";
import { Icon } from "../Icon.js";

const Rating = (count) => {
  const beans = [];

  while (count > 0) {
    count--;
    beans.push("bean");
  }

  return h(
    "ul",
    { class: "rating" },
    beans.map(() => h(Icon, { name: "bean" }))
  );
};

export { Rating };
