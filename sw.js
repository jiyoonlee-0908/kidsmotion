// Service Worker for KidsMotion PWA
const CACHE_NAME = 'kidsmotion-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/generated-icon.png'
];

// 설치 이벤트
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 활성화 이벤트
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 네트워크 요청 캐싱
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에 있으면 반환, 없으면 네트워크에서 가져오기
        return response || fetch(event.request);
      }
    )
  );
});

// 푸시 알림 수신
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : '새로운 체력 분석 결과가 준비되었습니다!',
    icon: '/generated-icon.png',
    badge: '/generated-icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: '결과 보기',
        icon: '/generated-icon.png'
      },
      {
        action: 'close',
        title: '닫기'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('KidsMotion 알림', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    // 결과 페이지로 이동
    event.waitUntil(
      clients.openWindow('/')
    );
  } else {
    // 기본 동작: 앱 열기
    event.waitUntil(
      clients.matchAll()
        .then(clientList => {
          if (clientList.length > 0) {
            return clientList[0].focus();
          }
          return clients.openWindow('/');
        })
    );
  }
});