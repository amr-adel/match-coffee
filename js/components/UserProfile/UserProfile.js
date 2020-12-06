import { Component, h } from "../../index.js";
import { auth, currUser, getBeans, deleteUser } from "../firebase.js";

class UserProfile extends Component {
  state = { beans: 0, sure: false, password: "" };

  componentDidMount() {
    getBeans(currUser.uid).then((beans) => this.setState({ beans }));
  }

  ToggleDeletabilty = () => {
    const checked = !this.state.sure;
    this.setState({ sure: checked });
  };

  handleInput = (e) => {
    this.setState({ password: e.target.value });
  };

  render({ setModal }, { beans, sure, password }) {
    return h(
      "div",
      { class: "user-profile" },
      h("h2", { class: "title" }, currUser.displayName),
      h(
        "div",
        { class: "beans" },
        h("p", null, beans && Number.isInteger(beans) ? beans : "---"),
        h("img", { src: "./images/coffee-bean.svg" })
      ),
      h("p", { class: "email" }, `(${currUser.email})`),
      h(
        "button",
        {
          class: "btn log-out",
          onClick: () => {
            auth.signOut();
            setTimeout(() => setModal(), 500);
          },
        },
        "Log out"
      ),
      h(
        "form",
        { class: "delete-form" },
        h(
          "label",
          { for: "sure", class: "sure" },
          h("input", {
            id: "sure",
            type: "checkbox",
            onClick: this.ToggleDeletabilty,
          }),
          "I'm sure, I want to delete my account"
        ),
        sure &&
          h(
            "label",
            { for: "password", class: "password-label" },
            h("input", {
              id: "password",
              type: "password",
              value: password,
              placeholder: "Password",
              autocomplete: "current-password",
              onInput: (e) => this.handleInput(e),
            })
          ),
        h(
          "button",
          {
            class: "btn btn-delete",
            type: "submit",
            disabled: sure && password ? false : true,
            onClick: async (e) => {
              e.preventDefault();
              let deleteUserResult = await deleteUser(password);
              setModal(deleteUserResult, true);
            },
          },
          "Delete"
        )
      )
    );
  }
}

export { UserProfile };
