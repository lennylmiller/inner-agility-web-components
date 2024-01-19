const template = document.createElement("template");
template.innerHTML = /* html */ `
  <style>
    #app {
      display: contents;
    }

    @font-face {
      font-family: Inter var;
      font-style: normal;
      font-weight: 100 900;
      font-display: swap;
      src: url("/fonts/Inter-roman.var.woff2?v=3.18") format("woff2");
      font-named-instance: Regular;
    }

    @font-face {
      font-family: Inter var;
      font-style: italic;
      font-weight: 100 900;
      font-display: swap;
      src: url("/fonts/Inter-italic.var.woff2?v=3.18") format("woff2");
      font-named-instance: Italic;
    }

    body {
      font-family: "Inter var", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-feature-settings: "cv02", "cv03", "cv04", "cv11";
      -webkit-font-smoothing: antialiased;
    }
    section {
      padding: 1.2rem;
      text-align: center;
      border: 1px solid blue;
      border-radius: 2rem;
    }

    section.dark {
      background-color: rgb(73, 72, 73)
    }
    h3 {
      padding-top: 1rem;
      padding-bottom: 0.2rem;
    }
 </style>
 <div>
    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
    <div class="relative mt-2 rounded-md shadow-sm">
      <input type="email" name="email" id="email"
        class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
        placeholder="you@example.com" value="adamwathan" aria-invalid="true" aria-describedby="email-error">
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    <p class="mt-2 text-sm text-red-600" id="email-error">Not a valid email address.</p>
  </div>
`;

class Input extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get help() {
    return this.getAttribute("help");
  }

  set help(help) {
    this.setAttribute("help", help);
  }

  get validation() {
    return this.getAttribute("validation");
  }

  set validation(validation) {
    this.setAttribute("validation", validation);
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const label = this.shadowRoot.querySelector("label");
    label.textContent = this.getAttribute("label");

    this.span = this.shadowRoot.querySelector("span");
    this.span.textContent = this.getAttribute("help");

    const input = this.shadowRoot.querySelector("input");
    input.type = this.getAttribute("type");
    input.addEventListener("input", (event) => {
      event.stopPropagation();
      input.dispatchEvent(
        new CustomEvent("inag-input", {
          bubbles: true,
          composed: true,
          detail: event.target.value,
        })
      );
    });
  }


  static get observedAttributes() {
    return ["help"];
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    this.span.textContent = newValue;
  }

}

customElements.define("inag-input", Input);
