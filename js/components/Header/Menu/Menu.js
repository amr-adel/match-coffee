import { Component, h } from "../../../index.js";
import { Icon } from "../../Icon.js";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: false };
  }

  componentDidMount() {
    window.addEventListener("mousedown", (e) => this.hideMenu(e));
  }

  componentWillUnmout() {
    window.removeEventListener("mousedown", (e) => this.hideMenu(e));
  }

  toggle() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  hideMenu(e) {
    // Hide menu on clicking anywhere outside '.nav' div
    if (this.state.showMenu && !e.target.closest(".nav")) this.toggle();
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
          {
            onClick: (e) => {
              if (e.target.tagName === "LI") this.toggle();
            },
          },
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
