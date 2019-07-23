self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('PWAConsultantCalculator').then(function(cache) {
      return cache.addAll([
				'index.html',
				'favicon.ico',
				'styles/main.css', 
				'scripts/main.js',
				'scripts/localforage.min.js',
				'scripts/install.js'
			]);
		})
	);
});  // install


self.addEventListener('fetch', function(event) {
	console.log(event.request.url);
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});  // fetch