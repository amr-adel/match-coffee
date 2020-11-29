import { h } from "../../../index.js";

const Card = ({ id, bgId, reveal }) =>
  h("div", {
    class: "card",
    id,
    "data-bgId": bgId,
    onClick: (e) => reveal(e.target.id),
  });

export { Card };
