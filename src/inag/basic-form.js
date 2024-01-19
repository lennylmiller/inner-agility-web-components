import "./input.js";
import "./button.js";
import "./card.js";

class BasicForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = {
      username: null,
      email: null,
      password: null,
      passwordRepeat: null,
    };
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /* html */ `
    <inag-card>
      <h3 slot="card-header">Register</h3>
      <inag-input slot="card-body" label="Username"></inag-input>
      <inag-input slot="card-body" label="Email"></inag-input>
      <inag-input slot="card-body" label="Password" type="password"></inag-input>
      <inag-input slot="card-body" label="Password Repeat" type="password"></inag-input>
      <inag-button slot="card-body">Register</inag-button>
    </inag-card>
    `;
    const inagInputs = this.shadowRoot.querySelectorAll("inag-input");
    const button = this.shadowRoot.querySelector("inag-button");
    const [
      usernameInput,
      emailInput,
      passwordInput,
      passwordRepeatInput,
    ] = inagInputs;
    usernameInput.addEventListener("inag-input", (event) => {
      this.state.username = event.detail;
      usernameInput.validation = "none";
    });
    emailInput.addEventListener("inag-input", (event) => {
      this.state.email = event.detail;
    });
    passwordInput.addEventListener("inag-input", (event) => {
      this.state.password = event.detail;
      if (this.state.password !== this.state.passwordRepeat) {
        passwordRepeatInput.help = "Password Mismatch";
        passwordRepeatInput.validation = "invalid";
      } else {
        passwordRepeatInput.help = "Passwords are matching";
        passwordRepeatInput.validation = "valid";
      }
    });
    passwordRepeatInput.addEventListener("inag-input", (event) => {
      this.state.passwordRepeat = event.detail;
      if (this.state.password !== this.state.passwordRepeat) {
        passwordRepeatInput.help = "Password Mismatch";
        passwordRepeatInput.validation = "invalid";
      } else {
        passwordRepeatInput.help = "Passwords are matching";
        passwordRepeatInput.validation = "valid";
      }
    });
    this.addEventListener("click-inag-button", (event) => {
      button.inprogress = true;
      setTimeout(() => {
        usernameInput.validation = "invalid";
        usernameInput.help = "Name must be unique";
        emailInput.validation = "invalid";
        emailInput.help = "Cannot be null";
        button.inprogress = false;
      }, 2000);
    });
  }
}

customElements.define("inag-form", BasicForm);
