import { h } from "../../../index.js";

const Leaderboard = ({ list }) => {
  const usersList =
    list &&
    list.map((user) =>
      h(
        "li",
        null,
        h(
          "span",
          { class: "user-name" },
          user.name,
          user.isCurrentUser && h("span", { class: "curr-user" }, "[you]")
        ),
        h("span", { class: "user-beans" }, user.beans)
      )
    );

  return h(
    "div",
    { class: "leaderboard" },
    h("h2", { class: "title" }, "Leaderboard"),
    list && h("ol", { class: "leaderboard-list" }, usersList),
    !list && h("p", null, "Loading...")
  );
};

export { Leaderboard };
