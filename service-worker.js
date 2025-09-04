// Simple no-op SW para permitir instalación y futuros caches
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => self.clients.claim());

// Network-first: deja pasar siempre; aquí podrías agregar caché si lo necesitas
self.addEventListener('fetch', () => {});

