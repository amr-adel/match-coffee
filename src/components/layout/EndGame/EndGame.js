import { h } from "../../../index.js";
import { Moves } from "../Moves/Moves.js";
import { Rating } from "../Rating/Rating.js";
import { Stopwatch } from "../Stopwatch/Stopwatch.js";
import { addBeans, currentUser } from "../../../firebase.js";
import { LoginSignupContainer } from "../../containers/LoginSignupContainer.js";

const EndGame = async ({ result, moves, time, beans, setModal }) => {
  const won = result === "Success";

  // Add current game score to user's doc if loggedin
  if (won && currentUser) await addBeans(beans);

  const message = h(
    "div",
    { class: "endgame-screen" },
    h("h2", { class: "title" }, won ? "Hooray!" : "Ooooops!"),
    won && h(Rating, { beans }),
    h(
      "p",
      null,
      won ? "You matched them all in:" : "You didn't match them on time"
    ),
    h(Stopwatch, { time: 90 - time }),
    h(Moves, { moves }),
    won &&
      !currentUser &&
      h(
        "p",
        { class: "login" },
        h(
          "span",
          {
            class: "link",
            onClick: () =>
              setModal(h(LoginSignupContainer, { beans, setModal })),
          },
          "Login "
        ),
        "to save your score"
      )
  );

  return h("div", null, message);
};

export { EndGame };
