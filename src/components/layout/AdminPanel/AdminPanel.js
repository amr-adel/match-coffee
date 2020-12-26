import { h } from "../../../index.js";

const AdminPanel = ({ list, toggleUserRole, deleteUser, copyUserUid }) => {
  const usersList =
    list &&
    list.map((user) =>
      h(
        "li",
        null,
        h(
          "span",
          { class: "user-name" },
          user.name,
          user.isCurrentUser && h("span", { class: "curr-user" }, "[you]")
        ),
        h("span", { class: "user-beans" }, user.uid)
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
