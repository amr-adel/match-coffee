import { h } from "../index.js";

const Icon = ({ name, className }) => {
  const iconProps = className ? { class: className } : {};
  return name === "bean"
    ? h("img", { ...iconProps, src: "./images/coffee-bean.svg" })
    : h("svg", iconProps, h("use", { href: `./images/icons.svg#${name}` }));
};

export { Icon };
