import {
  html,
  render,
  Component,
} from "https://unpkg.com/htm/preact/standalone.module.js";

import { App } from "./App.js";

render(html`<${App} />`, document.body);

export { html, render, Component };
