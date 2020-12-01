import { Component, h } from "../../../index.js";
import { Icon } from "../../Icon.js";

class Menu extends Component {
  constructor(props) {
    super(props);
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
        h(Icon, { name: showMenu ? "close" : "menu" })
      ),
      showMenu &&
        h(
          "ul",
          {},
          h("li", null, "Signin / Sign up"),
          h("li", null, "Leaderboard"),
          h("li", null, "About")
        )
    );
  }
}

export { Menu };
