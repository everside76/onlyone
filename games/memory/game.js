/* ===== 카드 뒤집기 (메모리 게임) ===== */
const EMOJIS = ['⛪','🎵','🍖','🌤️','🎾','🤝','✝️','🎤','🌸','🙏'];
let cardCount = 12;
let cards = [];
let flipped = [];
let matched = 0;
let attempts = 0;
let totalPairs = 0;
let timerInterval;
let seconds = 0;
let locked = false;

function selectDiff(btn, count) {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    cardCount = count;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function buildCards() {
    const pairs = cardCount / 2;
    totalPairs = pairs;
    const picked = EMOJIS.slice(0, pairs);
    cards = shuffle([...picked, ...picked]);

    const board = document.getElementById('board');
    board.className = 'memory-board ' + (cardCount === 20 ? 'cols-5' : 'cols-4');
    board.innerHTML = cards.map((emoji, i) => `
        <div class="mem-card" data-index="${i}" onclick="flipCard(this)">
            <div class="mem-card-inner">
                <div class="mem-card-back">?</div>
                <div class="mem-card-front">${emoji}</div>
            </div>
        </div>
    `).join('');

    document.getElementById('total-pairs').textContent = pairs;
    document.getElementById('matches').textContent = '0';
    document.getElementById('attempts').textContent = '0';
}

function flipCard(el) {
    if (locked) return;
    if (el.classList.contains('flipped') || el.classList.contains('matched')) return;
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

            if (matched === totalPairs) {
                endGame();
            }
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

    // 클리어 횟수 추적
    let wins = parseInt(localStorage.getItem('onlyone_memory_wins') || '0') + 1;
    localStorage.setItem('onlyone_memory_wins', wins);

    // 5번 클리어 시 오뎅탕 쿠폰 해금
    if (wins >= 5 && !localStorage.getItem('onlyone_coupon_오뎅탕')) {
        localStorage.setItem('onlyone_coupon_오뎅탕', 'unlocked');
        showCouponUnlock('오뎅탕');
    }

    document.getElementById('final-score').textContent = finalScore;
    document.getElementById('result-text').textContent = `${attempts}회 시도 / ${seconds}초`;
    document.getElementById('high-score-text').textContent = '최고 점수: ' + Math.max(finalScore, hi);

    // 쿠폰 해금 여부 표시
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
