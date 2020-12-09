import { Component, h } from "../../index.js";
import {
  logout,
  getUserScore,
  deleteUser,
  currentUser,
} from "../../firebase.js";
import { UserProfile } from "../layout/UserProfile/UserProfile.js";

class UserProfileContainer extends Component {
  state = { beans: null, sure: false, password: "", errorMsg: "" };

  componentDidMount() {
    getUserScore().then((beans) => this.setState({ beans }));
  }

  handleLogout = () => {
    const { setModal } = this.props;
    logout();
    setTimeout(() => setModal(null), 500);
  };

  // Disable "delete" button unless checkbox is checked
  ToggleDeletabilty = () => {
    const checked = !this.state.sure;
    this.setState({ sure: checked });
  };

  handleInput = (e) => {
    if (this.state.errorMsg) this.setState({ errorMsg: "" });
    this.setState({ password: e.target.value });
  };

  handleDeleteUser = async (e) => {
    e.preventDefault();

    const result = await deleteUser(this.state.password);

    if (result.errorMsg) this.setState({ errorMsg: result.errorMsg });
    else this.props.setModal(result, true);
  };

  render({}, { beans, sure, password, errorMsg }) {
    const {
      handleLogout,
      ToggleDeletabilty,
      handleInput,
      handleDeleteUser,
    } = this;
    return h(UserProfile, {
      currentUser,
      beans,
      sure,
      password,
      errorMsg,
      handleLogout,
      ToggleDeletabilty,
      handleInput,
      handleDeleteUser,
    });
  }
}

export { UserProfileContainer };
