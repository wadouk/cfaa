var CACHE = 'cache-and-update';

// On install, cache some resources.
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');

  // Ask the service worker to keep installing until the returning promise
  // resolves.
  evt.waitUntil(precache());
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  // You can use `respondWith()` to answer immediately, without waiting for the
  // network response to reach the service worker...
  evt.respondWith(fromCache(evt.request));
  // ...and `waitUntil()` to prevent the worker from being killed until the
  // cache is updated.
  evt.waitUntil(update(evt.request));
});

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      './CFAA.html',
      './cfaa/aide.gif',
      './cfaa/Aide.jpg',
      './cfaa/Barlow.jpg',
      './cfaa/black.css',
      './cfaa/black_orange.css',
      './cfaa/book.gif',
      './cfaa/calendar.gif',
      './cfaa/CCD.jpg',
      './cfaa/cfaa.ico',
      './cfaa/cfg.jpg',
      './cfaa/down.gif',
      './cfaa/ex_30.jpg',
      './cfaa/ex_50.jpg',
      './cfaa/feedback.gif',
      './cfaa/file.gif',
      './cfaa/grey_red.css',
      './cfaa/grey_white.css',
      './cfaa/Jumelles.jpg',
      './cfaa/Jupiter.jpg',
      './cfaa/Lune.jpg',
      './cfaa/M20.jpg',
      './cfaa/M42.jpg',
      './cfaa/M51.jpg',
      './cfaa/Mars.jpg',
      './cfaa/Mercure.jpg',
      './cfaa/methode.gif',
      './cfaa/moins.gif',
      './cfaa/Neptune.jpg',
      './cfaa/oc.gif',
      './cfaa/ocr.gif',
      './cfaa/Oculaire.jpg',
      './cfaa/Photo.jpg',
      './cfaa/plus.gif',
      './cfaa/Pluton.jpg',
      './cfaa/Saturne.jpg',
      './cfaa/scroll.gif',
      './cfaa/Soleil.jpg',
      './cfaa/standard.css',
      './cfaa/Telescope.jpg',
      './cfaa/text.gif',
      './cfaa/Tirage.jpg',
      './cfaa/tools.gif',
      './cfaa/trait_coud.gif',
      './cfaa/trait_droit.gif',
      './cfaa/trait_vert.gif',
      './cfaa/up.gif',
      './cfaa/Uranus.jpg',
      './cfaa/Venus.jpg',
      './cfaa/vid.gif',
      './cfaa/white.css',
      './cfaa/zip.gif',
    ]);
  });
}

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}