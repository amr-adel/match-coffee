import { Component, h } from "../../index.js";
import { currUser, getBeans } from "../firebase.js";
import { Icon } from "../Icon.js";

class UserProfile extends Component {
  state = { beans: 0 };

  componentDidMount() {
    getBeans(currUser.uid).then((beans) => this.setState({ beans }));
  }

  render({ setModal }, { beans }) {
    return h(
      "div",
      { class: "user-profile" },
      h("h2", { class: "title" }, currUser.displayName),
      h("p", null, currUser.email),
      h("p", null, beans, " beans"),
      h(
        "a",
        {
          class: "link",
          href: "/",
          onClick: () => {
            firebase.auth().signOut();
            setTimeout(() => setModal(), 500);
          },
        },
        "Log out"
      )
    );
  }
}

export { UserProfile };
