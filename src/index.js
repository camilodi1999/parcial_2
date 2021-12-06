import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { IntlProvider } from "react-intl";
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

let messages = localeEnMessages;
let locale = "en";
function getBrowserLanguage() {
  let languages = navigator.languages || navigator.userLanguage;
  for (let i = 0; i < languages.length; i++) {
    if (languages[i].includes("en")) {
      locale = "en";
      messages = localeEnMessages;
      break;
    } else {
      locale = "es";
      messages = localeEsMessages;
      break;
    }
  }
}

getBrowserLanguage();
ReactDOM.render(
  <IntlProvider locale={locale} messages={messages}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </IntlProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
