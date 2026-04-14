/* ===== 웹툰 뷰어 엔진 ===== */

const WebtoonViewer = {
  overlay: null,
  progressBar: null,
  isOpen: false,

  open(title, images, prevUrl, nextUrl) {
    if (!this.overlay) this.createOverlay();

    const header = this.overlay.querySelector('.viewer-header');
    header.querySelector('.title').textContent = title;

    const imagesContainer = this.overlay.querySelector('.viewer-images');
    imagesContainer.innerHTML = images.map(src =>
      `<img src="${src}" alt="웹툰 페이지" loading="lazy">`
    ).join('');

    // 에피소드 이동 네비게이션
    const nav = this.overlay.querySelector('.viewer-nav');
    nav.innerHTML = `
      <a href="${prevUrl || '#'}" class="${prevUrl ? '' : 'disabled'}">이전 화</a>
      <a href="${nextUrl || '#'}" class="${nextUrl ? '' : 'disabled'}">다음 화</a>
    `;

    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;

    this.overlay.scrollTop = 0;
    this.updateProgress();
  },

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
    this.isOpen = false;
  },

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'viewer-overlay';
    this.overlay.innerHTML = `
      <div class="viewer-header">
        <button class="viewer-close" onclick="WebtoonViewer.close()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <span class="title"></span>
      </div>
      <div class="progress-bar"></div>
      <div class="viewer-images"></div>
      <div class="viewer-nav"></div>
    `;

    this.progressBar = this.overlay.querySelector('.progress-bar');

    // 스크롤 시 진행률 업데이트 + 헤더 자동 숨김
    let lastScroll = 0;
    this.overlay.addEventListener('scroll', () => {
      this.updateProgress();

      const header = this.overlay.querySelector('.viewer-header');
      const currentScroll = this.overlay.scrollTop;
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
      lastScroll = currentScroll;
    });

    // 이미지 탭 시 헤더 토글
    this.overlay.querySelector('.viewer-images').addEventListener('click', () => {
      const header = this.overlay.querySelector('.viewer-header');
      header.classList.toggle('hidden');
    });

    document.body.appendChild(this.overlay);
  },

  updateProgress() {
    if (!this.overlay || !this.progressBar) return;
    const scrollTop = this.overlay.scrollTop;
    const scrollHeight = this.overlay.scrollHeight - this.overlay.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    this.progressBar.style.width = progress + '%';
  }
};
