/* Service worker — Ma Collection de Thés
   Shell en cache (offline), thes.json en réseau d'abord avec repli cache. */
const CACHE = 'thes-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // fonts, API GitHub : réseau direct

  // Données : réseau d'abord, cache en secours (offline)
  if (url.pathname.endsWith('thes.json')) {
    e.respondWith(
      fetch(e.request).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put('./thes.json', copy));
        return r;
      }).catch(() => caches.match('./thes.json'))
    );
    return;
  }

  // Shell : cache d'abord, réseau en secours
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request))
  );
});
