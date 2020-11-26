import { html } from "../../index.js";
import { Menu } from "./Menu/Menu.js";

const Header = html`
  <header class="header">
    <div class="brand">
      <h1>Match Coffee</h1>
    </div>
    <${Menu} />
  </header>
`;

export { Header };
