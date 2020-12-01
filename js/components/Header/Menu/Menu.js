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

  render({ setModal }, { showMenu }) {
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
          { onClick: () => this.toggle() },
          h(
            "li",
            {
              onClick: () => {
                setModal("Sign Me Up");
              },
            },
            "Signin / Sign up"
          ),
          h(
            "li",
            {
              onClick: () => {
                setModal("Leaderboard");
              },
            },
            "Leaderboard"
          ),
          h(
            "li",
            {
              onClick: () => {
                setModal("About Match Coffee!");
              },
            },
            "About"
          )
        )
    );
  }
}

export { Menu };
