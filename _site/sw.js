var CACHE_NAME = '20170803185632';

self.addEventListener('install',event => {
  event.waitUntil(caches.open(CACHE_NAME)
  .then(cache => cache.addAll([
    '/404.html',
    '/about/',
    
    '/blog/',
    '/',
    
    
    
    
    
    
    '/blog/%E9%9A%8F%E4%BE%BF%E8%AF%B4%E5%87%A0%E5%8F%A5%E8%BF%91%E5%86%B5','/blog/%E8%A3%85Ubuntu%E5%90%8E%E7%94%B5%E8%84%91%E4%B8%80%E7%9B%B4%E5%8D%A1%E9%A1%BF%E7%9A%84%E5%8F%AF%E8%83%BD%E5%8E%9F%E5%9B%A0','/blog/my-first-page',
  ]))
);
});

self.addEventListener('fetch',event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) return response;

      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(response => {
          if (!response || response.status != 200 || response.type !== 'basic')
            return response;

          var responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache =>
            cache.put(event.request, responseToCache)
          );
          return response;
        }).catch(() => caches.match('/'))
    }));
});

self.addEventListener('activate',event => {
  var chacheWhiteList=[CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList => {
        return Promise.all(keyList.map(key => {
          if (chacheWhiteList.indexOf(key) === -1)
            return caches.delete(key);
        }));
      })
  );
});
