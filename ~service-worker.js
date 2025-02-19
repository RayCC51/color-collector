if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/color-collector/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        "/",
        "index.html",
        "styles.css",
        "init.csv",
        "sample.csv",
        "icon/icon192.png",
        "icon/icon512.png",
        "lib/blackwhite.js",
        "lib/ntc.js",
        "lib/parsingCSV.js",
        "script/event.js",
        "script/expandTable.js",
        "script/export.js",
        "script/generateTable.js",
        "script/main.js",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
