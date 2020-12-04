import { Component, h } from "../../index.js";

class Login extends Component {
  state = {
    form: "login",
    name: "",
    email: "",
    password: "",
    errorMsg: "",
  };

  formSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.name, this.state.email, this.state.password);
  };

  handleInput = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  switchForm = (switchTo) => {
    if (this.state !== switchTo) this.setState({ form: switchTo });
  };

  render({}, { form, name, email, password, errorMsg }) {
    return h(
      "div",
      { class: "login-screen" },
      h(
        "div",
        { class: "form-switch" },
        h(
          "span",
          {
            class: `login${form === "login" ? " active" : ""}`,
            onClick: () => this.switchForm("login"),
          },
          "Login"
        ),
        h(
          "span",
          {
            class: `sign-up${form === "signUp" ? " active" : ""}`,
            onClick: () => this.switchForm("signUp"),
          },
          "Sign Up"
        ),
        h(
          "form",
          { onSubmit: (e) => this.formsubmit(e) },
          errorMsg && h("p", { class: "error-msg" }, errorMsg),
          form === "signUp" &&
            h(
              "label",
              { for: "name", class: "name-label" },
              h("input", {
                id: "name",
                type: "text",
                value: name,
                placeholder: "Name",
                onInput: (e) => this.handleInput(e),
                required: true,
              })
            ),
          h(
            "label",
            { for: "email", class: "email-label" },
            h("input", {
              id: "email",
              type: "email",
              value: email,
              placeholder: "E-mail",
              onInput: (e) => this.handleInput(e),
            })
          ),
          h(
            "label",
            { for: "password", class: "password-label" },
            h("input", {
              id: "password",
              type: "password",
              value: password,
              placeholder: "Password",
              onInput: (e) => this.handleInput(e),
            })
          ),
          h("input", {
            type: "submit",
            class: "submit",
            value: form === "login" ? "Login" : "Sign up",
            onClick: (e) => this.formSubmit(e),
          })
        )
      )
    );
  }
}

export { Login };
