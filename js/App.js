import { h, Component, render } from "./index.js";
import { Header } from "./components/Header/Header.js";
import { Footer } from "./components/Footer/Footer.js";
import { Board } from "./components/Board/Board.js";
import { Rating } from "./components/Rating/Rating.js";

const App = h("main", { class: "main" }, Header, Rating(5), Board, Footer);

export { App };
