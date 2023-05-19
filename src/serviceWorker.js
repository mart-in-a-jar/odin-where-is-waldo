/* eslint-disable-next-line no-restricted-globals */
self.addEventListener("fetch", () => {
    return;
});

export default function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("serviceWorker.js")
            .then(() => console.log("Registered SW"))
            .catch((error) => {
                console.error("Failed to register SW:", error);
            });
    }
}
