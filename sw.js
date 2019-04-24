/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.1.0/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "CODE_OF_CONDUCT.md",
    "revision": "c705391b8834a912453248e4d16b2c53"
  },
  {
    "url": "CONTRIBUTING.md",
    "revision": "8c57c1b5376e195b201db907060554d4"
  },
  {
    "url": "docs/index.html",
    "revision": "f3d073871e2ffde47cb511a9f93bc46e"
  },
  {
    "url": "firebase.json",
    "revision": "658cbc648f9a12fc61a9df94db85dd3c"
  },
  {
    "url": "firestore.indexes.json",
    "revision": "7c66f9c17626f849c92bd1c0caffd514"
  },
  {
    "url": "firestore.rules",
    "revision": "fc029dbd9cab19099a150474dc715e1a"
  },
  {
    "url": "functions/index.js",
    "revision": "10be3e3e7e0ea62663880569677cc5c1"
  },
  {
    "url": "functions/package-lock.json",
    "revision": "7d50ce0ec3b238719e4f45b9867dd6c5"
  },
  {
    "url": "functions/package.json",
    "revision": "adb6e63d8fe496f8625ee2aaba85f427"
  },
  {
    "url": "index.html",
    "revision": "f3d073871e2ffde47cb511a9f93bc46e"
  },
  {
    "url": "README.md",
    "revision": "c6a72ac999793fac0165bfff95891d09"
  },
  {
    "url": "storage.rules",
    "revision": "307549de80ebee91ac86a65766bd6d25"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
