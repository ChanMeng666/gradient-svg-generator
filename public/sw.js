// Service Worker for PWA functionality
// v2: Fixed to exclude API routes from caching
const CACHE_NAME = 'gradient-svg-v2';
const urlsToCache = [
  '/',
  '/create',
  '/templates',
  '/manifest.json',
  '/favicon.ico'
];

// Routes that should NEVER be cached
const NEVER_CACHE_PATTERNS = [
  '/api/',  // All API routes including /api/svg
  '/_next/', // Next.js internal routes
];

// Check if a URL should be cached
function shouldCache(url) {
  const urlPath = new URL(url).pathname;
  return !NEVER_CACHE_PATTERNS.some(pattern => urlPath.includes(pattern));
}

// Install event
self.addEventListener('install', event => {
  // Skip waiting to activate new service worker immediately
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event with network-first strategy
self.addEventListener('fetch', event => {
  const requestUrl = event.request.url;

  // Never cache API routes - always fetch from network
  if (!shouldCache(requestUrl)) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // Network request failed, try to get from cache
        return caches.match(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Listen for messages from the app
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});