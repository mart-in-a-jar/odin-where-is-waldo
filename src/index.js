import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

if ("serviceWorker" in navigator) {
    const swUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`
    navigator.serviceWorker
        .register(swUrl)
        .then(() => console.log("Registered SW"))
        .catch((error) => {
            console.error("Failed to register SW:", error);
        });
}