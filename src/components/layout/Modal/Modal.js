import { h } from "../../../index.js";

const Modal = ({ modalContent: content, hideModal }) => {
  // Wrap text-only content inside a "p" tag
  if (typeof content === "string") {
    content = h("p", { class: "orphan-text" }, content);
  }

  return h(
    "div",
    { class: "modal", onClick: hideModal },
    h("div", { class: "modal-body" }, content)
  );
};

export { Modal };
