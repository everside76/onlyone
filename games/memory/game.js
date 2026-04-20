/* ===== 두더지 잡기 ===== */
const MOLE_EMOJIS = ['🐹'];
const BOMB_EMOJI = '💣';
const TOTAL_MOLES = 30;

let score = 0;
let caught = 0;
let missed = 0;
let remaining = TOTAL_MOLES;
let gameRunning = false;
let moleTimer = null;
let currentMole = -1;
let moleTimeout = null;

function buildBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const hole = document.createElement('div');
        hole.className = 'mole-hole';
        hole.dataset.index = i;
        hole.addEventListener('click', () => tapHole(i));
        board.appendChild(hole);
    }
}

function showMole() {
    if (!gameRunning || remaining <= 0) {
        endGame();
        return;
    }

    // 이전 두더지 제거
    clearCurrentMole(true);

    // 새 두더지 위치 (이전과 다른 곳)
    let pos;
    do {
        pos = Math.floor(Math.random() * 9);
    } while (pos === currentMole);
    currentMole = pos;

    // 폭탄 확률 20%
    const isBomb = Math.random() < 0.2;
    const emoji = isBomb ? BOMB_EMOJI : MOLE_EMOJIS[Math.floor(Math.random() * MOLE_EMOJIS.length)];

    const holes = document.querySelectorAll('.mole-hole');
    const hole = holes[pos];
    hole.textContent = emoji;
    hole.classList.add('active');
    hole.dataset.type = isBomb ? 'bomb' : 'mole';

    // 두더지 사라지는 시간 (점점 빨라짐)
    const showTime = Math.max(500, 1200 - (TOTAL_MOLES - remaining) * 20);
    moleTimeout = setTimeout(() => {
        if (hole.classList.contains('active') && hole.dataset.type === 'mole') {
            missed++;
            document.getElementById('missed').textContent = missed;
            hole.classList.remove('active');
            hole.classList.add('miss');
            setTimeout(() => { hole.classList.remove('miss'); hole.textContent = ''; }, 300);
        } else if (hole.classList.contains('active')) {
            hole.classList.remove('active');
            hole.textContent = '';
        }
        remaining--;
        document.getElementById('remaining').textContent = remaining;
        updateTimerBar();

        if (remaining > 0) {
            const gap = Math.max(200, 600 - (TOTAL_MOLES - remaining) * 10);
            moleTimer = setTimeout(showMole, gap);
        } else {
            endGame();
        }
    }, showTime);
}

function clearCurrentMole(silent) {
    const holes = document.querySelectorAll('.mole-hole');
    holes.forEach(h => {
        h.classList.remove('active', 'hit', 'miss');
        h.textContent = '';
        h.dataset.type = '';
    });
}

function tapHole(index) {
    if (!gameRunning) return;
    const holes = document.querySelectorAll('.mole-hole');
    const hole = holes[index];

    if (!hole.classList.contains('active')) return;

    clearTimeout(moleTimeout);

    if (hole.dataset.type === 'bomb') {
        // 폭탄 터치 = 감점
        score = Math.max(0, score - 30);
        hole.classList.remove('active');
        hole.classList.add('miss');
        hole.textContent = '💥';
        setTimeout(() => { hole.classList.remove('miss'); hole.textContent = ''; }, 400);
    } else {
        // 두더지 잡기 성공
        caught++;
        score += 10;
        if (typeof SFX !== 'undefined') SFX.click();
        hole.classList.remove('active');
        hole.classList.add('hit');
        hole.textContent = '✅';
        document.getElementById('caught').textContent = caught;
        setTimeout(() => { hole.classList.remove('hit'); hole.textContent = ''; }, 300);
    }

    document.getElementById('score').textContent = score;
    remaining--;
    document.getElementById('remaining').textContent = remaining;
    updateTimerBar();

    if (remaining > 0) {
        const gap = Math.max(200, 500 - (TOTAL_MOLES - remaining) * 10);
        moleTimer = setTimeout(showMole, gap);
    } else {
        endGame();
    }
}

function updateTimerBar() {
    const pct = (remaining / TOTAL_MOLES) * 100;
    document.getElementById('timer-bar').style.width = pct + '%';
}

function endGame() {
    gameRunning = false;
    clearTimeout(moleTimer);
    clearTimeout(moleTimeout);

    const hi = parseInt(localStorage.getItem('onlyone_memory_high') || '0');
    if (score > hi) localStorage.setItem('onlyone_memory_high', score);

    // 20마리 이상 잡으면 클리어로 인정
    if (caught >= 20) {
        let wins = parseInt(localStorage.getItem('onlyone_memory_wins') || '0') + 1;
        localStorage.setItem('onlyone_memory_wins', wins);

        if (wins >= 1 && !localStorage.getItem('onlyone_coupon_오뎅탕')) {
            localStorage.setItem('onlyone_coupon_오뎅탕', 'unlocked');
            showCouponUnlock('오뎅탕');
            if (typeof celebrate === 'function') celebrate();
        } else if (typeof SFX !== 'undefined') {
            SFX.victory();
        }
    } else if (typeof SFX !== 'undefined') {
        SFX.fail();
    }

    const wins = parseInt(localStorage.getItem('onlyone_memory_wins') || '0');

    document.getElementById('final-score').textContent = score;
    document.getElementById('result-text').textContent = `30마리 중 ${caught}마리 잡음 (${caught >= 20 ? '클리어!' : '20마리 이상 잡으면 클리어'})`;
    document.getElementById('high-score-text').textContent = '최고 점수: ' + Math.max(score, hi);

    const couponArea = document.getElementById('coupon-reward');
    if (localStorage.getItem('onlyone_coupon_오뎅탕')) {
        couponArea.innerHTML = '<button class="btn-coupon" onclick="location.href=\'../../coupons/index.html\'">🍢 오뎅탕 쿠폰 받기</button>';
    } else {
        couponArea.innerHTML = '<p style="color:#888;font-size:0.8rem;">🔒 1번 클리어 시 오뎅탕 쿠폰 해금!</p>';
    }

    document.getElementById('game-over').classList.add('active');
}

function showCouponUnlock(name) {
    const html = '🎉 쿠폰 해금!<br><span style="font-size:1.4rem">🍢 ' + name + ' 교환권</span>';
    if (typeof showCenterToast === 'function') showCenterToast(html);
}

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-over').classList.remove('active');
    score = 0; caught = 0; missed = 0; remaining = TOTAL_MOLES; currentMole = -1;
    gameRunning = true;
    document.getElementById('score').textContent = '0';
    document.getElementById('caught').textContent = '0';
    document.getElementById('missed').textContent = '0';
    document.getElementById('remaining').textContent = TOTAL_MOLES;
    updateTimerBar();
    buildBoard();
    moleTimer = setTimeout(showMole, 800);
}

buildBoard();
