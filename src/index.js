import React from "react";
import ReactDOM from "react-dom/client"; // React 18's createRoot
import "./index.css"; // Tailwind styles
import App from "./App"; // Main App

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


