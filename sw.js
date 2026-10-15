
/* Seynaro — Service Worker
   Офлайн-режим и push-уведомления. */

const CACHE_NAME = 'seynaro-namaz-v5';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

// Установка — кэшируем файлы приложения
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS).catch(err => {
        console.warn('Некоторые файлы не загрузились:', err);
      }))
      .then(() => self.skipWaiting())
  );
});

// Активация — удаляем старые кэши и подключаем вкладки
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Загрузка страниц и ресурсов
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Сторонние ресурсы: сеть, затем кэш при отсутствии интернета
  if (url.origin !== self.location.origin) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // Ресурсы самого приложения
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const copy = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, copy);
          });
        }

        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }

        return Response.error();
      });
    })
  );
});

// Получение push-уведомления от сервера
self.addEventListener('push', event => {
  let payload = {};

  if (event.data) {
    try {
      payload = event.data.json();
    } catch (error) {
      payload = { body: event.data.text() };
    }
  }

  const title = payload.title || 'Seynaro — время намаза';

  const options = {
    body: payload.body || 'Проверьте расписание намаза.',
    icon: './icons/icon-192.png',
    badge: './icons/icon-192.png',
    tag: payload.tag || 'seynaro-notification',
    renotify: false,
    data: {
      url: payload.url || './'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Нажатие на уведомление — открываем приложение
self.addEventListener('notificationclick', event => {
  event.notification.close();

  const target = new URL(
    event.notification.data?.url || './',
    self.registration.scope
  );

  // Не разрешаем переход на сторонние сайты
  if (target.origin !== self.location.origin) return;

  event.waitUntil(
    self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(clients => {
      for (const client of clients) {
        if (new URL(client.url).origin === self.location.origin) {
          return client.navigate(target.href).then(
            navigated => navigated ? navigated.focus() : client.focus()
          );
        }
      }

      return self.clients.openWindow(target.href);
    })
  );
});
