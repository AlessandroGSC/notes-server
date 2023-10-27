importScripts('js/sw-utils.js')
const NAME_CACHE = 'cache.1'
const CACHE_DYNAMIC = 'dynamic-v1'; // Para los archivos que se van a descargar
const CACHE_STATIC = 'static-v1'; // App shell
const CACHE_INMUTABLE = 'inmutable-v1'; // CDN de terceros como librerias etc


const limpiarCache = (cacheName, numberItem) => {
    caches.open(cacheName)
        .then(cache => {
            cache.keys()
                .then(keys => {
                    if(keys.length > numberItem) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numberItem))
                    }
                })
        })
}

self.addEventListener('install', function(event) {
        const cachePromise = caches.open(CACHE_STATIC).then(function (cache) {
            
            // Esos son los archivos que se necesitan para que la aplicación pueda funcionar
            // Igual pueden variar dependiendo de que estemos usando
            return cache.addAll([
                '/',
                '/index.html',
                '/js/app.js',
                '/js/sw-utils.js',
                '/sw.js',
                'static/js/bundle.js',
                '/favicon.ico',
                '/pages/404Page.html',
            ])
        })

        const cacheInmutable = caches.open(CACHE_INMUTABLE).then(function (cache) {
            
            return cache.addAll([
                'https://fonts.googleapis.com/css?family=Tangerine',
            ])
        })

        event.waitUntil(Promise.all([cachePromise, cacheInmutable]));
})

// Funcion para eliminar cache anterior
self.addEventListener("activate", function (event) {
    const respuesta = caches.keys()
        .then(keys => {
            keys.forEach(key => {
                if(key !== CACHE_STATIC && key.includes("static")) {
                    return caches.delete(key);
                }
            });
        })
    event.waitUntil(respuesta);
})

// Funcion para actualizar cache
self.addEventListener("fetch", function (event) {
    const respuesta = caches.match(event.request) 
        .then(res => {
            if(res) {
                return res
            }else {
                return fetch(event.request)
                    .then(newRes => {
                        return actualizaCacheDinamico(CACHE_DYNAMIC, event.request, newRes)
                    })
            }
        })

    event.waitUntil(respuesta);
})








