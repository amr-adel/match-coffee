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
    beans.map(() => Icon("bean"))
  );
};

export { Rating };
