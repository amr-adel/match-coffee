import { h, Component } from "../../index.js";
import { Header } from "../layout/Header/Header.js";
import { Stopwatch } from "../layout/Stopwatch/Stopwatch.js";
import { Moves } from "../layout/Moves/Moves.js";
import { Rating } from "../layout/Rating/Rating.js";
import { Restart } from "../layout/Restart/Restart.js";
import { BoardContainer } from "./BoardContainer.js";

import { Modal } from "../layout/Modal/Modal.js";
import { LeaderboardContainer } from "./LeaderboardContainer.js";
import { LoginSignupContainer } from "./LoginSignupContainer.js";
import { UserProfileContainer } from "./UserProfileContainer.js";
import { EndGame } from "../layout/EndGame/EndGame.js";

const initialState = {
  time: 90,
  moves: 0,
  beans: 5,
};

class MatchCoffee extends Component {
  state = { ...initialState, game: 0 };

  componentDidMount() {
    // setTimeout(() => this.endGame("Success"), 2000);
  }

  init = () => {
    clearInterval(this.stopwatch);
    this.setState({
      ...initialState,
      game: (this.state.game += 1),
    });
  };

  startStopwatch = () => {
    this.stopwatch = setInterval(
      () => this.setState({ time: (this.state.time -= 1) }),
      1000
    );
  };

  stopStopwatch = () => {
    clearInterval(this.stopwatch);
  };

  incrementMoves = () => {
    this.setState({ moves: (this.state.moves += 1) });
  };

  removeBean = () => {
    this.setState({ beans: (this.state.beans -= 1) });
  };

  endGame = (result) => {
    const { moves, time, beans } = this.state;
    this.setModal(
      h(EndGame, { result, moves, time, beans, setModal: this.setModal })
    );
    this.init();
  };

  hideModal = (e) => {
    if (e.target.className === "modal") this.setState({ modalContent: null });
  };

  // Control what to render inside "Modal"
  setModal = (content, selfClose) => {
    if (selfClose)
      setTimeout(() => this.setState({ modalContent: null }), 2000);

    switch (content) {
      case "user-profile":
        content = h(UserProfileContainer, { setModal: this.setModal });
        break;
      case "login-signup":
        content = h(LoginSignupContainer, {
          setModal: this.setModal,
        });
        break;
      case "leaderboard":
        content = h(LeaderboardContainer);
        break;
      case "about":
        content = "About!";
        break;
    }

    this.setState({ modalContent: content });
  };

  render({}, { time, moves, beans, game, modalContent }) {
    const {
      init,
      startStopwatch,
      incrementMoves,
      removeBean,
      endGame,
      hideModal,
      setModal,
    } = this;

    // this.startStopwatch();

    return h(
      "main",
      { class: "main" },
      h(Header, { setModal }),
      h(Restart, { init }),
      h(Rating, { beans, endGame }),
      h(BoardContainer, {
        game,
        moves,
        removeBean,
        startStopwatch,
        incrementMoves,
        endGame,
      }),
      h(Stopwatch, { time, removeBean, endGame }),
      h(Moves, { moves }),
      modalContent && h(Modal, { modalContent, hideModal })
    );
  }
}

export { MatchCoffee };
