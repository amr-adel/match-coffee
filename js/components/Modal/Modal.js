import { h } from "../../index.js";

const Modal = ({ content, hideModal }) =>
  h(
    "div",
    { class: "modal", onClick: (e) => hideModal(e) },
    h("div", { class: "modal-body" }, content)
  );

export { Modal };
