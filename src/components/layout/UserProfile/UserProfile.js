import { h } from "../../../index.js";
import { Input } from "../../Input.js";

const UserProfile = ({
  currentUser,
  beans,
  sure,
  password,
  errorMsg,
  handleLogout,
  ToggleDeletabilty,
  handleInput,
  handleDeleteUser,
}) => {
  const { displayName, email } = currentUser;

  return h(
    "div",
    { class: "user-profile" },
    h("h2", { class: "title" }, displayName),
    h(
      "div",
      { class: "beans" },
      h("p", null, beans && Number.isInteger(beans) ? beans : "--"),
      h("img", { src: "./images/coffee-bean.svg" })
    ),
    h("p", { class: "email" }, `(${email})`),
    h(
      "button",
      {
        class: "btn log-out",
        onClick: handleLogout,
      },
      "Log out"
    ),
    h(
      "form",
      { class: "delete-form" },
      errorMsg && h("p", { class: "error-msg" }, errorMsg),
      h(
        "label",
        { for: "sure", class: "sure" },
        h("input", {
          id: "sure",
          type: "checkbox",
          onClick: ToggleDeletabilty,
        }),
        "I'm sure, I want to delete my account"
      ),
      sure &&
        h(Input, {
          id: "password",
          type: "password",
          value: password,
          placeholder: "Password",
          autocomplete: "current-password",
          onInput: handleInput,
        }),

      h(
        "button",
        {
          class: "btn btn-delete",
          type: "submit",
          disabled: sure && password ? false : true,
          onClick: handleDeleteUser,
        },
        "Delete"
      )
    )
  );
};

export { UserProfile };
