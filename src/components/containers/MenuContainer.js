import { Component, h } from "../../index.js";
import { Menu } from "../layout/Menu/Menu.js";
import { currentUser } from "../../firebase.js";

class MenuContainer extends Component {
  constructor({ setModal }) {
    super({ setModal });
    this.state = { showMenu: false };
  }

  componentDidMount() {
    window.addEventListener("click", this.hideMenu);
  }

  componentWillUnmout() {
    window.removeEventListener("click", this.hideMenu);
  }

  toggleMenuVisibility = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  hideMenu = (e) => {
    // Hide menu on clicking anywhere outside '.nav' div
    if (this.state.showMenu && e.target.closest(".nav") == null)
      this.setState({ showMenu: false });
  };

  handleMenuClicks = (e) => {
    // (e.target.closest) to tigger action if user clicked on the "SVG" icon
    if (e.target.tagName === "LI" || e.target.closest("li")) {
      this.props.setModal(e.target.id || e.target.closest("li").id);
      this.toggleMenuVisibility();
    }
  };

  render({}, { showMenu }) {
    const { toggleMenuVisibility, handleMenuClicks } = this;

    const item1 = currentUser
      ? { text: currentUser.displayName, id: "user-profile" }
      : { text: "Login / Sign up", id: "login-signup" };

    const menuItems = [
      item1,
      { text: "Leaderboard", id: "leaderboard" },
      { text: "About", id: "about" },
    ];

    if (currentUser && currentUser.isAdmin) {
      menuItems.push({ text: "Admin Panel", id: "admin-panel" });
    }

    return h(Menu, {
      showMenu,
      menuItems,
      toggleMenuVisibility,
      handleMenuClicks,
    });
  }
}

export { MenuContainer };
