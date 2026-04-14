/* ===== OnlyOne 공통 컴포넌트 ===== */

/**
 * 현재 페이지 경로에 따라 활성 탭을 판별
 */
function getActivePage() {
  const path = window.location.pathname;
  if (path.includes('/events')) return 'events';
  if (path.includes('/webtoon')) return 'webtoon';
  if (path.includes('/games')) return 'games';
  return 'home';
}

/**
 * 기본 경로 계산 (하위 폴더 깊이에 따라 상대 경로 결정)
 */
function getBasePath() {
  const path = window.location.pathname;
  const parts = path.split('/').filter(p => p && p !== 'onlyone');
  // index.html이 아닌 파일이면 해당 파일 제외
  const depth = parts.filter(p => !p.endsWith('.html')).length;
  if (depth === 0) return '.';
  return Array(depth).fill('..').join('/');
}

/**
 * 하단 탭 네비게이션 렌더링
 */
function renderBottomNav() {
  const active = getActivePage();
  const base = getBasePath();

  const icons = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    events: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    webtoon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    games: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>'
  };

  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.innerHTML = `
    <a href="${base}/index.html" class="${active === 'home' ? 'active' : ''}">
      ${icons.home}<span>홈</span>
    </a>
    <a href="${base}/events/index.html" class="${active === 'events' ? 'active' : ''}">
      ${icons.events}<span>행사</span>
    </a>
    <a href="${base}/webtoon/index.html" class="${active === 'webtoon' ? 'active' : ''}">
      ${icons.webtoon}<span>웹툰</span>
    </a>
    <a href="${base}/games/index.html" class="${active === 'games' ? 'active' : ''}">
      ${icons.games}<span>게임</span>
    </a>
  `;
  document.body.appendChild(nav);
}

/**
 * 페이지 헤더 렌더링
 */
function renderHeader(title, showBack) {
  const header = document.createElement('header');
  header.className = 'page-header';
  const backHtml = showBack
    ? `<a href="javascript:history.back()" class="back-link"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></a>`
    : '';
  header.innerHTML = `${backHtml}<h1>${title}</h1>`;
  document.body.prepend(header);
}

/**
 * 초기화 - DOM 로드 시 공통 컴포넌트 삽입
 */
document.addEventListener('DOMContentLoaded', function() {
  renderBottomNav();
});
