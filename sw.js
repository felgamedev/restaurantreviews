const swPrefix = "restaurant-review-";
const swId = "v1";
const urlsToCache = [
  "/",
  "/css/styles.css",
  "/js/dbhelper.js",
  "/js/main.js",
  "/js/restaurant_info.js",
  "/data/restaurants.json",
  "/img/1.jpg"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(swPrefix + swId).then(function(cache) {
      console.log("Cache opened!");
      return cache.addAll(urlsToCache);
    })
  );
  console.log("Cache created, install complete");
});

self.addEventListener("activate", function(event) {});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }

      var fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(function(response) {
        if (!response || response.status !== 200) {
          return response;
        }

        // Create a copy to consume for the cache
        var responseToCache = response.clone();
        caches.open(swPrefix + swId).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });

      // Send the request to the network
      return fetch(event.request);
    })
  );
});
