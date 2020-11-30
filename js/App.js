import { h, Component } from "./index.js";

import { Header } from "./components/Header/Header.js";
import { Board } from "./components/Board/Board.js";
import { Rating } from "./components/Rating/Rating.js";
import { Restart } from "./components/Restart/Restart.js";
import { Stopwatch } from "./components/Stopwatch/Stopwatch.js";
import { Moves } from "./components/Moves/Moves.js";

const initialState = {
  time: 90,
  moves: 0,
  beans: 5,
};

class App extends Component {
  state = { ...initialState, game: 0 };

  removeBean = () => {
    this.setState({ beans: (this.state.beans -= 1) });
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

  incrementMoves = () => this.setState({ moves: (this.state.moves += 1) });

  init = () => {
    clearInterval(this.stopwatch);
    this.setState({ ...initialState, game: (this.state.game += 1) });
  };

  render({}, { time, beans, moves, game }) {
    const { incrementMoves, init } = this;
    return h(
      "main",
      { class: "main" },
      Header,
      h(Restart, { init }),
      h(Rating, { beans }),
      h(Board, { game, incrementMoves }),
      h(Stopwatch, { time }),
      h(Moves, { moves })
    );
  }
}

export { App };
