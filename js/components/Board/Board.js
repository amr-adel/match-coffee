import { Component, h } from "../../index.js";
import { Card } from "./Card/Card.js";

const cardDataIds = [
  "n78d2ps",
  "n8sd1p0",
  "n74dfp6",
  "n75dnpc",
  "n06d9pa",
  "n5rdmp2",
  "n18dypr",
  "n6pdipz",
  "n78d2ps",
  "n8sd1p0",
  "n74dfp6",
  "n75dnpc",
  "n06d9pa",
  "n5rdmp2",
  "n18dypr",
  "n6pdipz",
];

// Shuffle function from http://stackoverflow.com/a/2450976
const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

class Board extends Component {
  state = {
    glance: null,
    matched: [],
    cards: [],
  };

  componentDidMount() {
    const cards = shuffle(cardDataIds).map((bgId, i) => ({
      cardId: `card-${i}`,
      show: false,
      bgId,
    }));
    this.setState({ cards });
  }

  reveal = (cardId) => {
    const { cards } = this.state;
    const updated = cards.map((card) => {
      if (card.cardId === cardId) return { ...card, show: true };
      return card;
    });
    this.setState({ cards: updated });
  };

  render({}, { cards }) {
    return h(
      "div",
      { class: "board" },
      h(
        "div",
        { class: "cards-container" },
        cards.map((card) =>
          h(Card, {
            key: card.cardId,
            id: card.cardId,
            reveal: this.reveal,
            bgId: card.show ? card.bgId : null,
          })
        )
      )
    );
  }
}

export { Board };
