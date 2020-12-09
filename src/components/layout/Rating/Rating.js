import { h } from "../../../index.js";
import { Icon } from "../../Icon.js";

const Rating = ({ beans, endGame }) => {
  if (beans === 0) endGame("Fail");

  const beansArr = Array(beans).fill("beans");

  return h(
    "ul",
    { class: "rating" },
    beansArr.map(() => h(Icon, { name: "bean" }))
  );
};

export { Rating };
