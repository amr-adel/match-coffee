import { h } from "../../index.js";
import { currUser } from "../firebase.js";
import { Icon } from "../Icon.js";

const UserProfile = ({ setModal }) =>
  h(
    "div",
    { class: "user-profile" },
    h("h2", { class: "title" }, currUser.displayName),
    h("p", null, currUser.email),
    h(
      "p",
      {
        class: "link",
        onClick: () => {
          firebase.auth().signOut();
          setTimeout(() => setModal(), 500);
        },
      },
      "Log out"
    )
  );

export { UserProfile };
