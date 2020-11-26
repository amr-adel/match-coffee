import { Component, html } from "../../../index.js";
import { Icon } from "../../Icon.js";

class Menu extends Component {
  constructor() {
    super();
    this.state = { showMenu: false };
  }

  toggle() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  render() {
    const { showMenu } = this.state;
    return html`
      <div class="nav">
        <button class="toggle" onClick=${() => this.toggle()}>
          <${Icon} name=${showMenu ? "close" : "menu"} />
        </button>
      </div>
    `;
  }
}

export { Menu };
