import { h } from "../../../index.js";

const Board = ({ cards, reveal }) => {
  return h(
    "div",
    { class: "board" },
    h(
      "div",
      { class: "cards-container" },
      cards.map((card) =>
        h("div", {
          key: card.cardId,
          class: "card",
          id: card.cardId,
          "data-bgId": card.show ? card.bgId : null,
          onClick: reveal,
        })
      )
    )
  );
};

export { Board };
