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

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-7fde608ef48adb4c0c22.js"
  },
  {
    "url": "framework-e83e5c6deaa6a0b453fd.js"
  },
  {
    "url": "styles.e0b5afed34e57a32a16f.css"
  },
  {
    "url": "app-ddfe1e671d457213ae82.js"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "22123e543fe6977aee32d720bad852f7"
  },
  {
    "url": "component---cache-caches-gatsby-plugin-offline-app-shell-js-978ad4957de37ad22e4c.js"
  },
  {
    "url": "polyfill-1973e99f3e0f9c4a3573.js"
  },
  {
    "url": "b3e0edbf557b01eaf43e59b06e56d70473c02d2c-2e1257423bf13238e8ee.js"
  },
  {
    "url": "8404b144cf2ad46e7de17bf4d936317e474a8ae6-520f9dfefd120ea2fb8d.js"
  },
  {
    "url": "component---src-pages-index-js-0f2bf7e69e994624583d.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "80347b9b1a6f2f1556220c8536967263"
  },
  {
    "url": "page-data/sq/d/3649515864.json",
    "revision": "dd5a276c1a39f2145a85f561ac65454e"
  },
  {
    "url": "page-data/sq/d/983108779.json",
    "revision": "cad50e9c0c286263223d170fd471b7cd"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "f3094aa9a4130c5512b490ac78436702"
  },
  {
    "url": "component---src-pages-about-js-ae026885c8ea1fe8fc1b.js"
  },
  {
    "url": "page-data/about/page-data.json",
    "revision": "538b1c086bd335b118eba1f45e864030"
  },
  {
    "url": "component---src-templates-blog-post-js-d635a0135ed5153a1391.js"
  },
  {
    "url": "page-data/blog/cryptodotcom/page-data.json",
    "revision": "6d5334180dda170381de847b4978996b"
  },
  {
    "url": "page-data/blog/hello-world/page-data.json",
    "revision": "776959cd90a1aa41b111dd6142bc8407"
  },
  {
    "url": "page-data/blog/senoko/page-data.json",
    "revision": "6bcfebfa532adf383c4607c744c176f3"
  },
  {
    "url": "page-data/blog/sf-functions/page-data.json",
    "revision": "07a2446737535841cf785b72e982ce01"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "e1a0abba1acdd540de71703b78e18ef3"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(\.js$|\.css$|static\/)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https?:.*\/page-data\/.*\.json/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:.*\.(png|jpg|jpeg|webp|avif|svg|gif|tiff|js|woff|woff2|json|css)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');

/* global importScripts, workbox, idbKeyval */
importScripts(`idb-keyval-3.2.0-iife.min.js`)

const { NavigationRoute } = workbox.routing

let lastNavigationRequest = null
let offlineShellEnabled = true

// prefer standard object syntax to support more browsers
const MessageAPI = {
  setPathResources: (event, { path, resources }) => {
    event.waitUntil(idbKeyval.set(`resources:${path}`, resources))
  },

  clearPathResources: event => {
    event.waitUntil(idbKeyval.clear())
  },

  enableOfflineShell: () => {
    offlineShellEnabled = true
  },

  disableOfflineShell: () => {
    offlineShellEnabled = false
  },
}

self.addEventListener(`message`, event => {
  const { gatsbyApi: api } = event.data
  if (api) MessageAPI[api](event, event.data)
})

function handleAPIRequest({ event }) {
  const { pathname } = new URL(event.request.url)

  const params = pathname.match(/:(.+)/)[1]
  const data = {}

  if (params.includes(`=`)) {
    params.split(`&`).forEach(param => {
      const [key, val] = param.split(`=`)
      data[key] = val
    })
  } else {
    data.api = params
  }

  if (MessageAPI[data.api] !== undefined) {
    MessageAPI[data.api]()
  }

  if (!data.redirect) {
    return new Response()
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: lastNavigationRequest,
    },
  })
}

const navigationRoute = new NavigationRoute(async ({ event }) => {
  // handle API requests separately to normal navigation requests, so do this
  // check first
  if (event.request.url.match(/\/.gatsby-plugin-offline:.+/)) {
    return handleAPIRequest({ event })
  }

  if (!offlineShellEnabled) {
    return await fetch(event.request)
  }

  lastNavigationRequest = event.request.url

  let { pathname } = new URL(event.request.url)
  pathname = pathname.replace(new RegExp(`^`), ``)

  // Check for resources + the app bundle
  // The latter may not exist if the SW is updating to a new version
  const resources = await idbKeyval.get(`resources:${pathname}`)
  if (!resources || !(await caches.match(`/app-ddfe1e671d457213ae82.js`))) {
    return await fetch(event.request)
  }

  for (const resource of resources) {
    // As soon as we detect a failed resource, fetch the entire page from
    // network - that way we won't risk being in an inconsistent state with
    // some parts of the page failing.
    if (!(await caches.match(resource))) {
      return await fetch(event.request)
    }
  }

  const offlineShell = `/offline-plugin-app-shell-fallback/index.html`
  const offlineShellWithKey = workbox.precaching.getCacheKeyForURL(offlineShell)
  return await caches.match(offlineShellWithKey)
})

workbox.routing.registerRoute(navigationRoute)

// this route is used when performing a non-navigation request (e.g. fetch)
workbox.routing.registerRoute(/\/.gatsby-plugin-offline:.+/, handleAPIRequest)
