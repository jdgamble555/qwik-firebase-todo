/*
 * WHAT IS THIS FILE?
 *
 * The service-worker.ts file is used to have state of the art prefetching.
 * https://qwik.builder.io/qwikcity/prefetching/overview/
 *
 * Qwik uses a service worker to speed up your site and reduce latency, ie, not used in the traditional way of offline.
 * You can also use this file to add more functionality that runs in the service worker.
 */
import { setupServiceWorker } from '@builder.io/qwik-city/service-worker';
import { requestProcessor } from '~/lib/utils';

declare const self: ServiceWorkerGlobalScope;

setupServiceWorker();

addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {

    const evt = event as ExtendableEvent;

    evt.waitUntil(self.clients.claim())
});


self.addEventListener('fetch', (event) => {

    const evt = event as FetchEvent;

    evt.respondWith(requestProcessor(evt));
});


