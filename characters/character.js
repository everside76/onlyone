/* ===== 성경 인물 도감 ===== */

const CHARACTERS = [
    { id: '노아', emoji: '🚢', short: '방주를 만든 사람', detail: '하나님 말씀에 순종해 방주를 지어 홍수에서 가족과 동물을 지킨 사람이에요.' },
    { id: '모세', emoji: '🌊', short: '홍해를 가른 사람', detail: '지팡이로 홍해를 갈라 이스라엘 백성을 애굽에서 구해내고 십계명을 받았어요.' },
    { id: '다윗', emoji: '🎯', short: '골리앗을 이긴 소년 왕', detail: '물매 하나로 거인 골리앗을 이긴 용감한 소년, 나중에 이스라엘의 왕이 됐어요.' },
    { id: '다니엘', emoji: '🦁', short: '사자굴에서 지켜진 사람', detail: '매일 세 번 기도했고, 사자굴에 던져졌지만 하나님이 사자의 입을 막아 지켜주셨어요.' },
    { id: '요나', emoji: '🐋', short: '큰 물고기 속의 선지자', detail: '하나님 말씀을 피해 달아나다 큰 물고기 뱃속에서 3일을 지냈고, 니느웨에 복음을 전했어요.' },
    { id: '에스더', emoji: '👑', short: '유대인을 구한 왕비', detail: '페르시아 왕비가 되어 "죽으면 죽으리라" 결심으로 유대 민족을 구원한 용기 있는 여인이에요.' },
    { id: '룻', emoji: '🌾', short: '효성의 모압 여인', detail: '남편이 죽은 뒤에도 시어머니 나오미를 끝까지 따라가 보아스의 아내가 되고 다윗의 조상이 됐어요.' },
    { id: '예수', emoji: '✝️', short: '우리의 구원자', detail: '하나님의 아들, 십자가에서 우리 죄를 지고 죽으시고 부활하신 구원자 예수님이에요. 🌟 (7명 모두 모으면 만날 수 있어요)' }
];

function isCharUnlocked(id) {
    return !!localStorage.getItem('onlyone_char_' + id);
}

function checkJesusUnlock() {
    const others = ['노아','모세','다윗','다니엘','요나','에스더','룻'];
    const allDone = others.every(n => isCharUnlocked(n));
    if (!allDone) return false;

    let justUnlocked = false;
    if (!isCharUnlocked('예수')) {
        localStorage.setItem('onlyone_char_예수', 'unlocked');
        justUnlocked = true;
    }
    // 도감 완성 시 떡볶이 쿠폰 자동 해금
    if (!localStorage.getItem('onlyone_coupon_떡볶이')) {
        localStorage.setItem('onlyone_coupon_떡볶이', 'unlocked');
        showToast('🎉 떡볶이 쿠폰이 해금되었습니다!');
        justUnlocked = true;
    }
    if (justUnlocked && typeof celebrate === 'function') celebrate();
    return justUnlocked;
}

function renderCharacters() {
    const justUnlockedJesus = checkJesusUnlock();

    const grid = document.getElementById('character-grid');
    const total = CHARACTERS.length;
    const unlockedCount = CHARACTERS.filter(c => isCharUnlocked(c.id)).length;

    document.getElementById('progress-text').textContent = `${unlockedCount} / ${total} 수집`;
    const pct = Math.round((unlockedCount / total) * 100);
    document.getElementById('progress-bar').style.width = pct + '%';

    if (unlockedCount === total) {
        document.getElementById('progress-complete').style.display = 'block';
    }

    grid.innerHTML = CHARACTERS.map(c => {
        const unlocked = isCharUnlocked(c.id);
        return `
        <div class="char-card ${unlocked ? 'char-unlocked' : 'char-locked'}" onclick="showCharacterDetail('${c.id}')">
            <div class="char-emoji">${unlocked ? c.emoji : '❔'}</div>
            <div class="char-name">${unlocked ? c.id : '???'}</div>
            <div class="char-short">${unlocked ? c.short : '🔒 성경 퀴즈로 만나요'}</div>
        </div>`;
    }).join('');

    if (justUnlockedJesus) {
        setTimeout(() => showCharacterDetail('예수'), 500);
    }
}

function showCharacterDetail(id) {
    const c = CHARACTERS.find(x => x.id === id);
    if (!c || !isCharUnlocked(id)) {
        showToast('🔒 아직 만나지 못한 인물이에요. 성경 퀴즈에서 만나보세요!');
        return;
    }
    const modal = document.getElementById('char-modal');
    document.getElementById('modal-emoji').textContent = c.emoji;
    document.getElementById('modal-name').textContent = c.id;
    document.getElementById('modal-detail').textContent = c.detail;
    modal.classList.add('show');
}

function closeCharacterDetail() {
    document.getElementById('char-modal').classList.remove('show');
}

function showToast(msg) {
    let toast = document.querySelector('.char-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'char-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
}
