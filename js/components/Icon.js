import { h } from "../index.js";

const Icon = (name) => {
  return name === "bean"
    ? h("img", { src: "./images/coffee-bean.svg" })
    : h("svg", null, h("use", { href: `./images/icons.svg#${name}` }));
};

export { Icon };
