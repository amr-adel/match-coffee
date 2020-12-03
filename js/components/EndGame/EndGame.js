import { h } from "../../index.js";
import { Moves } from "../Moves/Moves.js";
import { Rating } from "../Rating/Rating.js";
import { Stopwatch } from "../Stopwatch/Stopwatch.js";

const EndGame = ({ result, moves, time, beans }) => {
  const won = result === "Success";

  const message = h(
    "div",
    { class: "message" },
    h("h2", { class: "message-title" }, won ? "Congratulations!!" : "Ooooops!"),
    won && h(Rating, { beans }),
    h(
      "p",
      null,
      won ? "You matched them all in:" : "You didn't match them on time"
    ),
    h(Stopwatch, { time: 90 - time }),
    h(Moves, { moves }),
    won &&
      h(
        "p",
        { class: "login" },
        h("span", { class: "link" }, "Login "),
        "to save your score"
      )
  );

  return h("div", null, message);
};

export { EndGame };
