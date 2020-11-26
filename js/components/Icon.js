import { html } from "../index.js";

const Icon = ({ name }) => {
  return name === "bean"
    ? html`<img src="./images/coffee-bean.svg" />`
    : html`<svg>
        <use href="./images/icons.svg#${name}" />
      </svg>`;
};

export { Icon };
