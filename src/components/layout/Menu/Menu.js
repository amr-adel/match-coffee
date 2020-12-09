import { h } from "../../../index.js";
import { Icon } from "../../Icon.js";

const Menu = ({
  showMenu,
  menuItems,
  toggleMenuVisibility,
  handleMenuClicks,
}) => {
  menuItems = menuItems.map(({ text, id }) =>
    h(
      "li",
      { id, key: id },
      text,
      id === "user-profile" && h(Icon, { name: "user" })
    )
  );

  return h(
    "div",
    { class: "nav" },
    h(
      "button",
      { class: "toggle", onClick: toggleMenuVisibility },
      h(Icon, { className: !showMenu ? "active" : "", name: "menu" }),
      h(Icon, { className: showMenu ? "active" : "", name: "close" })
    ),
    showMenu && h("ul", { onClick: handleMenuClicks }, menuItems)
  );
};

export { Menu };
