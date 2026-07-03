import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import App from "./App";
import "./styles.css";
import "./i18n/i18n";

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    window.dispatchEvent(new Event("matchpoint:update-available"));
  },

  onOfflineReady() {
    console.log("App ist offline bereit.");
  },
});

window.addEventListener("matchpoint:update-confirmed", () => {
  void updateSW(true);
  window.location.reload();
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
