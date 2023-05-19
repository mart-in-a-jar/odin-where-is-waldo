export default function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        const swUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`;
        navigator.serviceWorker
            .register(swUrl)
            .then(() => console.log("Registered SW"))
            .catch((error) => {
                console.error("Failed to register SW:", error);
            });
    }
}
