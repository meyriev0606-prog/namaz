/* Seynaro — Service Worker
   Обеспечивает работу офлайн. */

const CACHE_NAME = 'seynaro-namaz-v2';

const ASSETS = [
  './',
  './index.html',    
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

// Установка — кэшируем все файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS).catch(err => {
        console.warn('Некоторые файлы не загрузились:', err);
      }))
      .then(() => self.skipWaiting())
  );
});

// Активация — удаляем старые кэши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Перехват запросов: сначала кэш, потом сеть
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // Не кэшируем сторонние запросы (например, unpkg для adhan.js)
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    // Для библиотеки adhan — отдаём из кэша если офлайн
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');  
        }
      });
    })
  );
});
