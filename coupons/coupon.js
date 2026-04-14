/* ===== 쿠폰 이미지 생성 & 다운로드 ===== */

const COUPONS = [
    { id: 1, name: '짜장밥',  emoji: '🍚', label: '교환권', colors: ['#2C3E50', '#3498DB'] },
    { id: 2, name: '오뎅탕',  emoji: '🍢', label: '교환권', colors: ['#E74C3C', '#F39C12'] },
    { id: 3, name: '팝콘',    emoji: '🍿', label: '교환권', colors: ['#8E44AD', '#E84393'] },
    { id: 4, name: '떡볶이',  emoji: '🌶️', label: '교환권', colors: ['#D63031', '#E17055'] },
    { id: 5, name: '닭꼬치',  emoji: '🍗', label: '교환권', colors: ['#00B894', '#00CEC9'] }
];

/**
 * Canvas로 쿠폰 이미지 생성
 */
function generateCouponImage(coupon) {
    const W = 600, H = 340;
    const canvas = document.getElementById('coupon-canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // 배경 그라데이션
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, coupon.colors[0]);
    grad.addColorStop(1, coupon.colors[1]);
    ctx.fillStyle = grad;
    roundRect(ctx, 0, 0, W, H, 24);
    ctx.fill();

    // 장식 원 (우측 상단)
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath();
    ctx.arc(W - 60, 60, 120, 0, Math.PI * 2);
    ctx.fill();

    // 장식 원 (좌측 하단)
    ctx.beginPath();
    ctx.arc(80, H - 40, 80, 0, Math.PI * 2);
    ctx.fill();

    // 티켓 노치 (좌우 원형 절취)
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(-4, H / 2, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(W + 4, H / 2, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // 점선 구분선 (우측)
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W - 130, 30);
    ctx.lineTo(W - 130, H - 30);
    ctx.stroke();
    ctx.setLineDash([]);

    // 이모지 (큰 사이즈)
    ctx.font = '72px serif';
    ctx.textAlign = 'left';
    ctx.fillText(coupon.emoji, 40, H / 2 + 10);

    // 음식명
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 36px "Noto Sans KR", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(coupon.name, 140, H / 2 - 12);

    // "교환권" 레이블
    ctx.font = '500 18px "Noto Sans KR", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillText('교 환 권', 140, H / 2 + 22);

    // 우측 영역 - "FREE"
    ctx.font = 'bold 28px "Noto Sans KR", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.textAlign = 'center';
    ctx.fillText('FREE', W - 65, H / 2 - 8);

    // 우측 작은 텍스트
    ctx.font = '500 11px "Noto Sans KR", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText('1회 사용', W - 65, H / 2 + 16);

    // 하단 OnlyOne 로고
    ctx.font = 'bold 12px "Noto Sans KR", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.textAlign = 'left';
    ctx.fillText('OnlyOne', 30, H - 20);

    // 하단 유효기간
    ctx.font = '11px "Noto Sans KR", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('유효기간: 발행일로부터 30일', W - 30, H - 20);

    // 상단 테두리 장식
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    roundRect(ctx, 8, 8, W - 16, H - 16, 20);
    ctx.stroke();

    return canvas.toDataURL('image/png');
}

/**
 * 둥근 사각형 그리기 헬퍼
 */
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

/**
 * 쿠폰 다운로드
 */
function downloadCoupon(couponId) {
    const coupon = COUPONS.find(c => c.id === couponId);
    if (!coupon) return;

    const dataUrl = generateCouponImage(coupon);

    // 다운로드 트리거
    const link = document.createElement('a');
    link.download = `OnlyOne_${coupon.name}_교환권.png`;
    link.href = dataUrl;
    link.click();

    // 카드에 다운로드 완료 표시
    const card = document.querySelector(`[data-coupon-id="${couponId}"]`);
    if (card) {
        card.classList.add('downloaded');
        const text = card.querySelector('.coupon-dl-text');
        if (text) text.textContent = '완료!';
    }

    showToast(`${coupon.emoji} ${coupon.name} 교환권이 저장되었습니다!`);
}

/**
 * 토스트 메시지
 */
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}
