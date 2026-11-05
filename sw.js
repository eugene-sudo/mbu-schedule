/* App 外殼用的 service worker：只負責讓 Chrome 判定「可以安裝」。
 * 不快取任何行程資料，所有內容都即時向 Google 讀取。 */
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;          // Google 的內容不經過這裡
  e.respondWith(fetch(e.request).catch(() =>
    new Response('<p style="font-family:sans-serif;padding:24px">目前沒有網路，請連線後再開啟。</p>',
                 { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
