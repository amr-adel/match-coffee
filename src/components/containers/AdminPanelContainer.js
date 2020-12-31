import { Component, h } from "../../index.js";
import { getUsers, toggleUserRole, deleteUserByAdmin } from "../../firebase.js";
import { AdminPanel } from "../layout/AdminPanel/AdminPanel.js";

class AdminPanelContainer extends Component {
  componentDidMount() {
    getUsers().then((data) => this.setState({ list: data, query: "" }));
  }

  handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    this.setState({ query });
  };

  handleToggleUserRole = async (uid, isAdmin) => {
    const op = isAdmin ? "downgrade" : "upgrade";
    const result = await toggleUserRole(uid, op);

    if (result.message.includes("successfully!")) {
      const updatedList = this.state.list.map((user) => {
        if (user.uid === uid) {
          user.isAdmin = result.message.includes("upgrade") ? true : null;
        }

        return user;
      });
      this.setState({ list: updatedList });
    } else console.log("result:", result);
  };

  deleteUser = async (uid) => {
    const result = await deleteUserByAdmin(uid);

    if (result.message.includes("successfully!")) {
      const updatedList = this.state.list.filter((user) => user.uid != uid);
      this.setState({ list: updatedList });
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

  render({}, { list, query }) {
    const {
      handleFilter,
      handleToggleUserRole,
      deleteUser,
      copyUserUid,
    } = this;

    const filteredList =
      list && list.filter((user) => user.email.includes(query));

    return h(AdminPanel, {
      filteredList,
      query,
      handleFilter,
      handleToggleUserRole,
      deleteUser,
      copyUserUid,
    });
  }
}

export { AdminPanelContainer };
