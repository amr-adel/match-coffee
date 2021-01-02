import { Component, h } from "../../index.js";
import { getUsers, toggleUserRole, deleteUserByAdmin } from "../../firebase.js";
import { AdminPanel } from "../layout/AdminPanel/AdminPanel.js";

const migrateUser = (uid, fromList, toList) => {
  const updatedFromList = fromList.filter((user) => user.uid !== uid);

  const user = fromList.filter((user) => user.uid === uid)[0];
  user.isAdmin = user.isAdmin === true ? null : true;

  const updatedToList = [...toList, user];

  return [updatedFromList, updatedToList];
};

class AdminPanelContainer extends Component {
  componentDidMount() {
    getUsers().then((usersList) =>
      this.setState({ allUsers: usersList, query: "" })
    );
  }

  handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    this.setState({ query });
  };

  handleToggleUserRole = async (uid, isAdmin) => {
    const op = isAdmin ? "downgrade" : "upgrade";
    const result = await toggleUserRole(uid, op);

    if (result.message.includes("successfully!")) {
      const { admins, users } = this.state.allUsers;
      let updatedList;

      if (op === "upgrade") {
        const { [0]: newUsers, [1]: newAdmins } = migrateUser(
          uid,
          users,
          admins
        );

        updatedList = {
          ...this.state.allUsers,
          admins: newAdmins,
          users: newUsers,
        };
      } else if (op === "downgrade") {
        const { [0]: newAdmins, [1]: newUsers } = migrateUser(
          uid,
          admins,
          users
        );

        updatedList = {
          ...this.state.allUsers,
          admins: newAdmins,
          users: newUsers,
        };
      }

      this.setState({ allUsers: updatedList });
    } else console.error("result:", result);
  };

  deleteUser = async (uid, docOnly) => {
    const result = await deleteUserByAdmin(uid, docOnly);

    if (result.message.includes("successfully!")) {
      const newAllUsers = {};

      for (let list in this.state.allUsers) {
        newAllUsers[list] = this.state.allUsers[list].filter(
          (user) => user.uid != uid
        );
      }

      this.setState({ allUsers: newAllUsers });
    } else console.error("result:", result);
  };

  copyUserUid = (uid) => {
    // https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
    const el = document.createElement("textarea");
    el.value = uid;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  render({}, { allUsers, query }) {
    const {
      handleFilter,
      handleToggleUserRole,
      deleteUser,
      copyUserUid,
    } = this;

    const filteredLists = allUsers && {
      admins: allUsers.admins.filter((user) => user.email.includes(query)),
      users: allUsers.users.filter((user) => user.email.includes(query)),
      orphanAccounts: allUsers.orphanAccounts.filter((user) =>
        user.email.includes(query)
      ),
      orphanDocs: allUsers.orphanDocs,
    };

    return h(AdminPanel, {
      filteredLists,
      query,
      handleFilter,
      handleToggleUserRole,
      deleteUser,
      copyUserUid,
    });
  }
}

export { AdminPanelContainer };
