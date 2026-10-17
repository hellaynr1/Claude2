// Offline support for the Second Brain web app: always try the network first (so updates arrive),
// fall back to the last saved copy when offline. Notes themselves live in the browser and sync later.
const CACHE = "sb-v1";
const SHELL = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./knowledge.json", "./reports.json", "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"];
const CDN = ["cdnjs.cloudflare.com", "js.puter.com", "fonts.googleapis.com", "fonts.gstatic.com"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (u.origin !== location.origin && !CDN.includes(u.hostname)) return;
  e.respondWith(fetch(r).then(res => {
    if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)); }
    return res;
  }).catch(() => caches.match(r, { ignoreSearch: r.mode === "navigate" }).then(m => m || (r.mode === "navigate" ? caches.match("./index.html") : Response.error()))));
});
