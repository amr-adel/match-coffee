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

const initialState = {
  glance: null,
  matches: 0,
  cards: [],
  hold: false,
  stopwatchInitiated: false,
};

class Board extends Component {
  state = initialState;

  componentDidMount() {
    this.newBoard();
  }

  // Check if the game was restarted
  componentDidUpdate(prevProps) {
    const { game, moves, removeBean } = this.props;

    if (game !== prevProps.game) {
      this.newBoard();
    }

    if (moves !== prevProps.moves && [12, 20].indexOf(moves) !== -1) {
      removeBean();
    }
  }

  // Reshuffle and initialize for new game
  newBoard = () => {
    const cards = shuffle(cardDataIds).map((bgId, i) => ({
      cardId: `card-${i}`,
      show: false,
      matched: false,
      bgId,
    }));
    this.setState({ ...initialState, cards });
  };

  // Animation
  animate = (animationName, cardToAnimate) => {
    const aCard = document.getElementById(cardToAnimate);
    aCard.classList.add(animationName);
    aCard.onanimationend = () => {
      aCard.classList.remove(animationName);
    };
  };

  // Card matching logic
  reveal = (cardId) => {
    const { glance, matches, cards, hold } = this.state;

    // Start stopwatch
    if (!this.state.stopwatchInitiated) {
      this.props.startStopwatch();
      this.setState({ stopwatchInitiated: true });
    }

    const currentCard = cards.filter((card) => card.cardId === cardId)[0];

    // Abort if game on "hold", clicking "matched" card or the same card
    if (hold || currentCard.matched || (glance && glance.cardId === cardId))
      return;

    // Hold game to avoid fast random clicks
    this.setState({ hold: true });

    // Reveal clicked card
    const cardsUpdated = cards.map((card) => {
      if (card.cardId === cardId) return { ...card, show: true };
      return card;
    });

    this.setState({ cards: cardsUpdated });

    if (!glance) {
      this.setState({ glance: currentCard, hold: false });
    } else {
      this.props.incrementMoves();

      const positiveMatch = currentCard.bgId === glance.bgId;

      const cardsUpdated = positiveMatch
        ? // If the seconed card does match the first one, mark them as matched and keep visible
          cards.map((card) => {
            if (card.bgId === currentCard.bgId) {
              this.animate("tada", card.cardId);
              return { ...card, show: true, matched: true };
            }
            return card;
          })
        : // If the seconed card doesn't match the first one, hide both
          cards.map((card) => {
            if (
              card.cardId === currentCard.cardId ||
              card.cardId === glance.cardId
            ) {
              this.animate("shake", card.cardId);
              return { ...card, show: false };
            }

            return card;
          });

      const newState = {
        glance: null,
        matches: positiveMatch ? (this.state.matches += 1) : this.state.matches,
        cards: cardsUpdated,
        hold: false,
      };

      if (positiveMatch) {
        this.setState(newState);

        if (matches === 7) {
          this.props.endGame("Success");
        }
      } else {
        // Delay hiding the unmatched cards
        setTimeout(() => {
          this.setState(newState);
        }, 750);
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
