import { h } from "../../../index.js";
import { Icon } from "../../Icon.js";

const User = ({ user, handleToggleUserRole, deleteUser, copyUserUid }) => {
  return h(
    "li",
    { key: user.uid, id: user.uid, class: user.isAdmin ? "admin" : "" },
    h(
      "div",
      { class: "user-info" },
      h(
        "span",
        { class: "user-name" },
        user.name,
        user.isCurrentUser && h("span", { class: "curr-user" }, "[you]")
      ),
      h("span", { class: "user-email" }, user.email || "[Orphan doc]")
    ),
    h(
      "div",
      { class: "user-control" },
      h("button", { class: "user-beans" }, user.beans || "--"),
      user.email &&
        h(
          "button",
          {
            onclick: () => handleToggleUserRole(user.uid, user.isAdmin),
            class: "admin-button",
            disabled: user.isCurrentUser,
          },
          h(Icon, { name: "admin" })
        ),
      h(
        "button",
        { onclick: () => copyUserUid(user.uid) },
        h(Icon, { name: "copy" })
      ),
      h(
        "button",
        {
          onclick: () => deleteUser(user.uid, user.email ? false : true),
          disabled: user.isCurrentUser,
        },
        h(Icon, { name: "delete" })
      )
    )
  );
};

export { User };
