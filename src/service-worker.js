self.addEventListener('message', (e) => {
	if (!e.data) {
		return;
	}
	switch (e.data) {
		case 'skipWaiting':
			self.skipWaiting();
			break;
		default:
			break;
	}
});

// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || []);
