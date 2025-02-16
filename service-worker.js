self.addEventListener("install", (event) => {
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
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
