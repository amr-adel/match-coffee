import { Component, h } from "../../../index.js";
import { Icon } from "../../Icon.js";

class Menu extends Component {
  constructor() {
    super();
    this.state = { showMenu: false };
  }

  toggle() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  render(props, { showMenu }) {
    return h(
      "div",
      { class: "nav" },
      h(
        "button",
        { class: "toggle", onClick: () => this.toggle() },
        Icon(showMenu ? "close" : "menu")
      )
    );
  }
}

export { Menu };
