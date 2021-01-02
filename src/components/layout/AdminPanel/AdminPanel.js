import { h } from "../../../index.js";
import { Input } from "../../Input.js";
import { User } from "./User.js";

const AdminPanel = ({
  filteredLists,
  query,
  handleFilter,
  handleToggleUserRole,
  deleteUser,
  copyUserUid,
}) => {
  let usersList, adminsList, orphanAccountsList, orphanDocsList;

  if (filteredLists) {
    const { admins, users, orphanAccounts, orphanDocs } = filteredLists;

    adminsList =
      admins.length > 0 &&
      h(
        "div",
        { class: "admins" },
        h("h3", { class: "list-title" }, "Admins"),
        h(
          "ol",
          { class: "admins-list" },
          admins.map((user) =>
            h(User, { user, handleToggleUserRole, deleteUser, copyUserUid })
          )
        )
      );

    usersList =
      users.length > 0 &&
      h(
        "div",
        { class: "users" },
        h("h3", { class: "list-title" }, "Users"),
        h(
          "ol",
          { class: "users-list" },
          users.map((user) =>
            h(User, { user, handleToggleUserRole, deleteUser, copyUserUid })
          )
        )
      );

    orphanAccountsList =
      orphanAccounts.length > 0 &&
      h(
        "div",
        { class: "orphan-accounts" },
        h("h3", { class: "list-title" }, "Orphan accounts"),
        h(
          "ol",
          { class: "orphan-accounts-list" },
          orphanAccounts.map((user) =>
            h(User, { user, handleToggleUserRole, deleteUser, copyUserUid })
          )
        )
      );

    orphanDocsList =
      orphanDocs.length > 0 &&
      h(
        "div",
        { class: "orphan-docs" },
        h("h3", { class: "list-title" }, "Orphan Docs"),
        h(
          "ol",
          { class: "orphan-docs-list" },
          orphanDocs.map((user) =>
            h(User, { user, handleToggleUserRole, deleteUser, copyUserUid })
          )
        )
      );
  }

  return h(
    "div",
    { class: "admin-panel" },
    h("h2", { class: "title" }, "Admin panel"),
    h(Input, {
      id: "filter-users",
      type: "text",
      value: query,
      placeholder: "User email",
      onInput: handleFilter,
    }),
    filteredLists &&
      h(
        "div",
        { class: "lists" },
        adminsList,
        usersList,
        orphanAccountsList,
        orphanDocsList
      ),

    !filteredLists && h("p", null, "Loading...")
  );
};

export { AdminPanel };
