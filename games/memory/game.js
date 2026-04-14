/* ===== 행사 카드 뒤집기 (3x3 고정) ===== */
const EMOJIS = ['⛪','🎵','🍖','🌤️'];
const BONUS = '🎉';
let cards = [];
let flipped = [];
let matched = 0;
let attempts = 0;
let totalPairs = 4;
let timerInterval;
let seconds = 0;
let locked = false;
let bonusFound = false;

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function buildCards() {
    // 4쌍(8장) + 보너스 1장 = 9장 (3x3)
    const pairs = [...EMOJIS, ...EMOJIS];
    cards = shuffle([...pairs, BONUS]);
    bonusFound = false;

    const board = document.getElementById('board');
    board.innerHTML = cards.map((emoji, i) => `
        <div class="mem-card" data-index="${i}" onclick="flipCard(this)">
            <div class="mem-card-inner">
                <div class="mem-card-back">?</div>
                <div class="mem-card-front">${emoji}</div>
            </div>
        </div>
    `).join('');

    document.getElementById('total-pairs').textContent = totalPairs;
    document.getElementById('matches').textContent = '0';
    document.getElementById('attempts').textContent = '0';
}

function flipCard(el) {
    if (locked) return;
    if (el.classList.contains('flipped') || el.classList.contains('matched')) return;

    const idx = parseInt(el.dataset.index);

    // 보너스 카드 처리 (짝 없는 카드)
    if (cards[idx] === BONUS) {
        el.classList.add('flipped');
        el.classList.add('matched');
        bonusFound = true;
        // 이미 카드 1장이 뒤집혀 있으면 되돌리지 않음
        if (flipped.length === 1) {
            // 첫 번째 뒤집은 카드 되돌리기
            locked = true;
            setTimeout(() => {
                flipped[0].classList.remove('flipped');
                flipped = [];
                locked = false;
            }, 500);
        }
        checkComplete();
        return;
    }

    // 이미 1장 뒤집혀 있는데 그게 보너스였으면 무시
    if (flipped.length >= 2) return;

    el.classList.add('flipped');
    flipped.push(el);

    if (flipped.length === 2) {
        attempts++;
        document.getElementById('attempts').textContent = attempts;

        const i1 = parseInt(flipped[0].dataset.index);
        const i2 = parseInt(flipped[1].dataset.index);

        if (cards[i1] === cards[i2]) {
            flipped[0].classList.add('matched');
            flipped[1].classList.add('matched');
            matched++;
            document.getElementById('matches').textContent = matched;
            flipped = [];
            checkComplete();
        } else {
            locked = true;
            setTimeout(() => {
                flipped[0].classList.remove('flipped');
                flipped[1].classList.remove('flipped');
                flipped = [];
                locked = false;
            }, 700);
        }
    }
}

function checkComplete() {
    if (matched === totalPairs && bonusFound) {
        endGame();
    }
}

function calcScore() {
    const base = totalPairs * 100;
    const penalty = Math.max(0, (attempts - totalPairs) * 10);
    const timeBonus = Math.max(0, 200 - seconds * 2);
    return Math.max(0, base - penalty + timeBonus);
}

function endGame() {
    clearInterval(timerInterval);
    const finalScore = calcScore();
    const hi = parseInt(localStorage.getItem('onlyone_memory_high') || '0');
    if (finalScore > hi) localStorage.setItem('onlyone_memory_high', finalScore);

    let wins = parseInt(localStorage.getItem('onlyone_memory_wins') || '0') + 1;
    localStorage.setItem('onlyone_memory_wins', wins);

    if (wins >= 5 && !localStorage.getItem('onlyone_coupon_오뎅탕')) {
        localStorage.setItem('onlyone_coupon_오뎅탕', 'unlocked');
        showCouponUnlock('오뎅탕');
    }

    document.getElementById('final-score').textContent = finalScore;
    document.getElementById('result-text').textContent = `${attempts}회 시도 / ${seconds}초`;
    document.getElementById('high-score-text').textContent = '최고 점수: ' + Math.max(finalScore, hi);

    const couponArea = document.getElementById('coupon-reward');
    if (localStorage.getItem('onlyone_coupon_오뎅탕')) {
        couponArea.innerHTML = '<button class="btn-coupon" onclick="location.href=\'../../coupons/index.html\'">🍢 오뎅탕 쿠폰 받기</button>';
    } else {
        couponArea.innerHTML = '<p style="color:#888;font-size:0.8rem;">🔒 5번 클리어 시 오뎅탕 쿠폰 해금! (현재 ' + wins + '/5)</p>';
    }

    document.getElementById('game-over').classList.add('active');
}

function showCouponUnlock(name) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);color:#fff;padding:20px 32px;border-radius:16px;z-index:999;text-align:center;font-size:1.1rem;font-weight:700;animation:fadeIn 0.3s ease-out;box-shadow:0 8px 32px rgba(0,0,0,0.5)';
    toast.innerHTML = '🎉 쿠폰 해금!<br><span style="font-size:1.4rem">🍢 ' + name + ' 교환권</span>';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function startTimer() {
    seconds = 0;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById('timer').textContent = seconds;
    }, 1000);
}

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-over').classList.remove('active');
    matched = 0; attempts = 0; flipped = []; locked = false;
    buildCards();
    startTimer();
}
