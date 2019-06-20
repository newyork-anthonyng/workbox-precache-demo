console.log("%cThis is a service-worker.js", "background-color: tomato; color: white; font-size: 24px;");
const partials = {
    head: () => workbox.precaching.getCacheKeyForURL("partials/head.html"),
    offline: () => workbox.precaching.getCacheKeyForURL("partials/offline.html"),
    foot: () => workbox.precaching.getCacheKeyForURL("partials/foot.html")
};

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
workbox.setConfig({
    debug: true,
});
workbox.precaching.precacheAndRoute([
    "partials/head.html",
    "partials/foot.html",
    "partials/offline.html"
]);
workbox.precaching.cleanupOutdatedCaches();

const cacheStrategy = new workbox.strategies.CacheFirst({
    cacheName: workbox.core.cacheNames.precache
});

// console.log("***********");
// console.log("partials.head", workbox.precaching.getCacheKeyForURL("/partials/head.html"));
// console.log("partials.foot", workbox.precaching.getCacheKeyForURL("/partials/foot.html"));
// console.log("***********");
workbox.routing.registerRoute(
    new RegExp("/about"),
    workbox.streams.strategy([
        () => cacheStrategy.makeRequest({ request: partials.head() }),
        () => cacheStrategy.makeRequest({ request: partials.offline() }),
        () => cacheStrategy.makeRequest({ request: partials.foot() })
    ])
);

workbox.core.skipWaiting();
workbox.core.clientsClaim();