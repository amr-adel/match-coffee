import { h } from "../../../index.js";
import { Icon } from "../../Icon.js";

const AdminPanel = ({ list, toggleUserRole, deleteUser, copyUserUid }) => {
  const usersList =
    list &&
    list.map((user) =>
      h(
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
          h("span", { class: "user-email" }, user.email)
        ),
        h(
          "div",
          { class: "user-control" },
          h("button", { class: "user-beans" }, user.beans),
          h("button", { onclick: copyUserUid }, h(Icon, { name: "copy" })),
          h(
            "button",
            { onclick: toggleUserRole, class: "admin-button" },
            h(Icon, { name: "admin" })
          ),
          h(
            "button",
            { onclick: deleteUser, disabled: user.isCurrentUser },
            h(Icon, { name: "delete" })
          )
        )
      )
    );

  return h(
    "div",
    { class: "admin-panel" },
    h("h2", { class: "title" }, "Admin panel"),
    list && h("ol", { class: "users-list" }, usersList),
    !list && h("p", null, "Loading...")
  );
};

export { AdminPanel };
