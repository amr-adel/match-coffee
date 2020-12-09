import { h } from "../../../index.js";
import { Input } from "../../Input.js";

const LoginSignUp = ({
  handleInput,
  switchForm,
  handleFormSubmit,
  form,
  name,
  email,
  password,
  errorMsg,
}) => {
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
          onClick: () => switchForm("login"),
        },
        "Login"
      ),
      h(
        "span",
        {
          class: `sign-up${form === "signUp" ? " active" : ""}`,
          onClick: () => switchForm("signUp"),
        },
        "Sign Up"
      ),
      h(
        "form",
        { onSubmit: handleFormSubmit },
        errorMsg && h("p", { class: "error-msg" }, errorMsg),
        // "Name" input
        form === "signUp" &&
          h(Input, {
            id: "name",
            type: "text",
            placeholder: "Name",
            value: name,
            autocomplete: "username",
            onInput: handleInput,
          }),
        // "E-mail" input
        h(Input, {
          id: "email",
          type: "email",
          placeholder: "E-mail",
          value: email,
          autocomplete: "email",
          onInput: handleInput,
        }),
        // "Password" input
        h(Input, {
          id: "password",
          type: "password",
          placeholder: "Password",
          value: password,
          autocomplete: "password",
          onInput: handleInput,
        }),
        h(
          "button",
          {
            type: "submit",
            class: "btn submit",
            onClick: handleFormSubmit,
          },
          form === "login" ? "Login" : "Sign up"
        )
      )
    )
  );
};

export { LoginSignUp };
