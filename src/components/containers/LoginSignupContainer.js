import { Component, h } from "../../index.js";
import { createUser, loginUser, currentUser } from "../../firebase.js";
import { LoginSignUp } from "../layout/LoginSignUp/LoginSignUp.js";

class LoginSignupContainer extends Component {
  state = {
    form: "login",
    name: "",
    email: "",
    password: "",
    errorMsg: "",
  };

  // Sync state and input value
  handleInput = (e) => {
    if (this.state.errorMsg) this.setState({ errorMsg: "" });
    this.setState({ [e.target.id]: e.target.value });
  };

  // Switch between "Login" and "Sign up"
  switchForm = (switchTo) => {
    if (this.state !== switchTo) this.setState({ form: switchTo });
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { form, name, email, password } = this.state;
    const { beans } = this.props;

    // Show error message when any field is empty
    if (!email || !password || (form === "signUp" && !name)) {
      this.setState({ errorMsg: "All fields are required." });
    } else {
      this.setState({ errorMsg: "" });

      // "response" will hold Login/Sign up result
      let response;

      if (form === "signUp") {
        response = await createUser(name, email, password, beans);
      } else if (form === "login") {
        response = await loginUser(email, password, beans);
      }

      response.errorMsg
        ? this.setState({ errorMsg: response.errorMsg })
        : this.props.setModal(
            h(
              "p",
              { class: "welcome" },
              `Welcome${form === "login" ? " back" : ""}, ${
                currentUser.displayName || name
              }.`
            ),
            true
          );
    }
  };

  render({}, { form, name, email, password, errorMsg }) {
    const { handleInput, switchForm, handleFormSubmit } = this;
    return h(LoginSignUp, {
      handleInput,
      switchForm,
      handleFormSubmit,
      form,
      name,
      email,
      password,
      errorMsg,
    });
  }
}

export { LoginSignupContainer };
