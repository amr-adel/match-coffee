import { Component, h } from "../../index.js";
import { getUsers } from "../../firebase.js";
import { AdminPanel } from "../layout/AdminPanel/AdminPanel.js";

class AdminPanelContainer extends Component {
  componentDidMount() {
    getUsers().then((data) => this.setState({ list: data }));
  }

  toggleUserRole = (uid, isAdmin) => {
    if (isAdmin) console.log("Downgraded to user");
    else console.log("Upgraded to admin");
  };

  deleteUser = (uid) => {
    console.log("User deleted");
  };

  copyUserUid = (uid) => {
    console.log("User uid copied");
  };

  render({}, { list }) {
    const { toggleUserRole, deleteUser, copyUserUid } = this;
    return h(AdminPanel, { list, toggleUserRole, deleteUser, copyUserUid });
  }
}

export { AdminPanelContainer };
