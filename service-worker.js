importScripts("/tenth-project/precache-manifest.e78b077dc60dcac217a153e327614ff6.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.core.setCacheNameDetails({prefix: "v2"});

// First, import the library into the service worker global scope:
importScripts('path/to/offline-google-analytics-import.js');

// Then, call goog.offlineGoogleAnalytics.initialize():
// See https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-google-analytics
goog.offlineGoogleAnalytics.initialize();
workbox.skipWaiting();
workbox.clientsClaim();
/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
workbox.routing.registerRoute(/.*firebase.*/, workbox.strategies.networkFirst({ "cacheName":"api", plugins: [new workbox.expiration.Plugin({"maxAgeSeconds":86400,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/\.(png|svg|woff|ttf|eot)/, workbox.strategies.cacheFirst({ "cacheName":"assets", plugins: [new workbox.expiration.Plugin({"maxAgeSeconds":86400,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/\.html/, workbox.strategies.networkFirst({ "cacheName":"html", plugins: [new workbox.expiration.Plugin({"maxAgeSeconds":86400,"purgeOnQuotaError":false})] }), 'GET');

