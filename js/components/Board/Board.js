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
    matches: 0,
    cards: [],
    hold: false,
  };

  componentDidMount() {
    this.newBoard();
  }

  componentDidUpdate(prevProps) {
    if (this.props.game !== prevProps.game) {
      this.newBoard();
    }
  }

  newBoard = () => {
    const cards = shuffle(cardDataIds).map((bgId, i) => ({
      cardId: `card-${i}`,
      show: false,
      matched: false,
      bgId,
    }));
    this.setState({ cards });
  };

  reveal = (cardId) => {
    const { cards, glance, hold, matches } = this.state;

    const currentCard = cards.filter((card) => card.cardId === cardId)[0];

    if (hold || currentCard.matched || (glance && glance.cardId === cardId)) {
      console.log("aborted");
      return;
    }

    this.setState({ hold: true });

    const cardsUpdated = cards.map((card) => {
      if (card.cardId === cardId) return { ...card, show: true };
      return card;
    });

    this.setState({ cards: cardsUpdated });

    if (!glance) {
      this.setState({ glance: currentCard, hold: false });
    } else if (currentCard.bgId !== glance.bgId) {
      const cardsUpdated = cards.map((card) => {
        if (card.cardId === currentCard.cardId || card.cardId === glance.cardId)
          return { ...card, show: false };
        return card;
      });

      setTimeout(() => {
        this.setState({ glance: null, cards: cardsUpdated, hold: false });
      }, 750);
    } else if (currentCard.bgId === glance.bgId) {
      const cardsUpdated = cards.map((card) => {
        if (card.bgId === currentCard.bgId)
          return { ...card, matched: true, show: true };
        return card;
      });

      this.setState({
        cards: cardsUpdated,
        glance: null,
        hold: false,
        matches: (this.state.matches += 1),
      });

      if (matches === 7) {
        console.log("Success");
      }
    }
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
