const CACHE = "whs-web-v69";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const path = new URL(event.request.url).pathname;
  if (path.endsWith("/ck-public.js") || path.endsWith("/config.js")) {
    event.respondWith(fetch(event.request, { cache: "no-store" }));
    return;
  }
  const url = new URL(event.request.url);
  // Images and PDFs rarely change: show the saved copy right away and refresh it in the background.
  // Pages, code, and data stay network-first so updates show up immediately.
  if (url.origin === self.location.origin && /\.(png|jpe?g|svg|webp|gif|ico|pdf)$/i.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        const refresh = fetch(event.request)
          .then((response) => {
            if (response.ok) cache.put(event.request, response.clone()).catch(() => {});
            return response;
          })
          .catch(() => cached);
        if (cached) {
          event.waitUntil(refresh);
          return cached;
        }
        return refresh;
      })
    );
    return;
  }
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          caches.open(CACHE).then((cache) => cache.put(event.request, copy)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
