// Service Worker for PWA functionality
// v3: Fixed cache.addAll failure due to missing favicon.ico
const CACHE_NAME = 'gradient-svg-v3';
const urlsToCache = [
  '/',
  '/create',
  '/templates',
  '/manifest.json'
  // Note: favicon.ico removed - it doesn't exist in this project
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
  console.log('[SW v3] Installing...');
  // Skip waiting to activate new service worker immediately
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW v3] Opened cache, caching URLs individually...');
        // Cache URLs individually to avoid failing if one URL is unavailable
        return Promise.all(
          urlsToCache.map(url => {
            return cache.add(url).then(() => {
              console.log('[SW v3] Cached:', url);
            }).catch(err => {
              console.warn('[SW v3] Failed to cache:', url, err.message);
            });
          })
        );
      })
      .then(() => {
        console.log('[SW v3] Install complete');
      })
  );
});

// Fetch event with network-first strategy
self.addEventListener('fetch', event => {
  const requestUrl = event.request.url;
  const urlPath = new URL(requestUrl).pathname;

  // Never cache API routes - always fetch from network
  if (!shouldCache(requestUrl)) {
    // Debug log for API requests
    if (urlPath.includes('/api/svg')) {
      console.log('[SW v3] API request (not cached):', urlPath.substring(0, 100));
    }
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
  console.log('[SW v3] Activating...');
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      console.log('[SW v3] Found caches:', cacheNames);
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('[SW v3] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW v3] Taking control of clients...');
      // Take control of all clients immediately
      return self.clients.claim();
    }).then(() => {
      console.log('[SW v3] Activation complete - now controlling all clients');
    })
  );
});

// Listen for messages from the app
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});