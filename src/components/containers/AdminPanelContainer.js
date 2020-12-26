import { Component, h } from "../../index.js";
import { getUsers, toggleUserRole } from "../../firebase.js";
import { AdminPanel } from "../layout/AdminPanel/AdminPanel.js";

class AdminPanelContainer extends Component {
  componentDidMount() {
    getUsers().then((data) =>
      this.setState({ list: data, filteredList: data, query: "" })
    );
  }

  handleFilter = (e) => {
    const { value: query } = e.target;
    this.setState({ query });

    const filteredList = this.state.list.filter((user) =>
      user.email.includes(query)
    );

    if (filteredList.length > 0) {
      this.setState({ filteredList });
    } else {
      this.setState({ filteredList: this.state.list });
    }
  };

  handleToggleUserRole = async (uid, isAdmin) => {
    const result = await toggleUserRole(uid, !isAdmin);
    console.log("result:", result);
  };

  deleteUser = (uid) => {
    console.log("User deleted");
  };

  copyUserUid = (uid) => {
    console.log("User uid copied");
  };

  render({}, { filteredList, query }) {
    const {
      handleFilter,
      handleToggleUserRole,
      deleteUser,
      copyUserUid,
    } = this;
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
