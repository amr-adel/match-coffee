import { h } from "../index.js";

const Input = ({ id, type, placeholder, value, autocomplete, onInput }) => {
  return h(
    "label",
    { for: id, class: `${id}-label` },
    h("input", {
      id: id || null,
      type: type || null,
      value: value || null,
      placeholder: placeholder || null,
      autocomplete: autocomplete || null,
      onInput,
    })
  );
};

export { Input };
