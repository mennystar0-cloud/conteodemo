const CACHE = 'cc-v1';
const ASSETS = [
'./',
'./index.html',
'./static/quagga.min.js',
'./static/xlsx.full.min.js',
'./static/catalogo-master.xlsx'
];


self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE)
.then((cache) => cache.addAll(ASSETS.filter(Boolean)))
.then(() => self.skipWaiting())
);
});


self.addEventListener('activate', (event) => {
event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', (event) => {
const url = new URL(event.request.url);
// Cache-first solo para recursos locales clave y /static/
if (url.origin === location.origin && (url.pathname.startsWith('/static/') || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html'))) {
event.respondWith(
caches.match(event.request).then((cached) => {
if (cached) return cached;
return fetch(event.request).then((res) => {
const copy = res.clone();
caches.open(CACHE).then((c) => c.put(event.request, copy));
return res;
});
})
);
}
});
