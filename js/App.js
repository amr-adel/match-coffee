import { html, render, Component } from "./index.js";
import { Header } from "./components/Header/Header.js";
import { Footer } from "./components/Footer/Footer.js";
import { Board } from "./components/Board/Board.js";
import { Rating } from "./components/Rating/Rating.js";

const App = html`
  <main class="main">${Header} ${Rating} ${Board} ${Footer}</main>
`;

export { App };
