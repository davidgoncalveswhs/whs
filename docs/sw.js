const CACHE = "whs-web-v81";

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
  // Images, PDFs, and versioned code (?v=) are served from the saved copy without asking the network
  // again. Every deploy gives this file a new cache name (see .github/workflows/pages.yml), and
  // "activate" deletes the old cache, so a new version is never stuck behind an old copy.
  // Pages, data, and the CloudKit config stay network-first so updates show up immediately.
  const versioned = url.searchParams.has("v");
  if (url.origin === self.location.origin && (versioned || /\.(png|jpe?g|svg|webp|gif|ico|pdf)$/i.test(url.pathname))) {
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        const response = await fetch(event.request);
        if (response.ok) cache.put(event.request, response.clone()).catch(() => {});
        return response;
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
