// 服务工作线程 - 用于PWA缓存和离线功能
const CACHE_NAME = 'macos-web-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/base.css',
  '/css/desktop.css',
  '/css/dock.css',
  '/css/menubar.css',
  '/css/window.css',
  '/css/buttons.css',
  '/css/menu.css',
  '/css/dialog.css',
  '/css/control-center.css',
  '/css/animations.css',
  '/js/main.js',
  '/js/window.js',
  '/js/dock.js',
  '/js/menubar.js',
  '/js/control-center.js',
  '/js/animations.js',
  '/js/system.js',
  '/apps/finder.js',
  '/apps/launchpad.js',
  '/apps/settings.js',
  '/apps/safari.js',
  '/apps/style/finder.css',
  '/apps/style/launchpad.css',
  '/apps/style/settings.css',
  '/apps/style/safari.css',
  '/icons/apple-logo.png',
  '/icons/apple-touch-icon.png',
  '/icons/apple-touch-icon-512.png',
  '/icons/finder.png',
  '/icons/launchpad.png',
  '/icons/safari.png',
  '/icons/mail.png',
  '/icons/messages.png',
  '/icons/maps.png',
  '/icons/photos.png',
  '/icons/facetime.png',
  '/icons/calendar.png',
  '/icons/contacts.png',
  '/icons/notes.png',
  '/icons/settings.png',
  '/icons/trash.png',
  '/img/wallpaper.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/webfonts/fa-brands-400.woff2'
];

// 安装服务工作线程
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('缓存已打开');
        return cache.addAll(urlsToCache);
      })
  );
});

// 激活服务工作线程
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截请求并从缓存中提供响应
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果找到缓存的响应，则返回缓存的版本
        if (response) {
          return response;
        }
        
        // 否则，从网络获取
        return fetch(event.request)
          .then(response => {
            // 检查是否收到有效响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 克隆响应，因为响应是流，只能使用一次
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          });
      })
  );
});
