import { Component, h } from "../../index.js";
import { Icon } from "../Icon.js";

class Stopwatch extends Component {
  state = {
    min: Math.floor(this.props.time / 60),
    sec: this.props.time % 60,
  };

  componentDidUpdate(prevProps) {
    const { time, endGame, removeBean } = this.props;

    if (time !== prevProps.time) {
      if (time === 0) endGame("Fail");

      if (time === 60 || time === 30) removeBean();
    }
  }

  render({ time }) {
    const min = Math.floor(time / 60);
    const sec = time % 60;

    const formatedTime = `${+min}:${sec <= 9 ? "0" + sec : sec}`;

    return h(
      "div",
      { class: "stopwatch" },
      h(Icon, { name: "stopwatch" }),
      h("span", null, formatedTime)
    );
  }
}

// const Stopwatch = ({ time, removeBean, endGame }) => {
//   if (time === 0) endGame("Fail");
//   if (time === 60 || time === 30) {
//     // removeBean();
//   }

//   let min = 0;
//   let sec = time;

//   while (sec >= 60) {
//     sec -= 60;
//     min += 1;
//   }

//   const formatedTime = `${min}:${sec <= 9 ? "0" + sec : sec}`;

//   return h(
//     "div",
//     { class: "stopwatch" },
//     h(Icon, { name: "stopwatch" }),
//     h("span", null, formatedTime)
//   );
// };

export { Stopwatch };
