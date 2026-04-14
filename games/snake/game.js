/* ===== 뱀 게임 (Snake) ===== */
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const GRID = 20;
let COLS, ROWS, CELL;
let snake, food, dir, nextDir, score, speed, gameRunning, paused, animFrame, lastMove;

const SNAKE_COLOR = '#00b894';
const SNAKE_HEAD = '#00cec9';
const FOOD_COLOR = '#FF6B6B';
const BG_COLOR = '#16213e';
const GRID_COLOR = 'rgba(255,255,255,0.03)';

function resize() {
    const area = document.querySelector('.game-canvas-area');
    const maxW = area.clientWidth - 16;
    const maxH = area.clientHeight - 16;
    CELL = Math.floor(Math.min(maxW / GRID, maxH / GRID));
    COLS = GRID;
    ROWS = GRID;
    canvas.width = COLS * CELL;
    canvas.height = ROWS * CELL;
}

function spawnFood() {
    let pos;
    do {
        pos = {
            x: Math.floor(Math.random() * COLS),
            y: Math.floor(Math.random() * ROWS)
        };
    } while (snake.some(s => s.x === pos.x && s.y === pos.y));
    food = pos;
}

function draw() {
    // 배경
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 그리드
    ctx.strokeStyle = GRID_COLOR;
    ctx.lineWidth = 1;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            ctx.strokeRect(c * CELL, r * CELL, CELL, CELL);
        }
    }

    // 먹이 (애니메이션 효과)
    const pulse = 0.8 + Math.sin(Date.now() / 200) * 0.2;
    const foodSize = CELL * pulse;
    const foodOffset = (CELL - foodSize) / 2;
    ctx.fillStyle = FOOD_COLOR;
    ctx.beginPath();
    ctx.arc(
        food.x * CELL + CELL / 2,
        food.y * CELL + CELL / 2,
        foodSize / 2 - 1, 0, Math.PI * 2
    );
    ctx.fill();

    // 뱀
    snake.forEach((seg, i) => {
        const isHead = i === 0;
        ctx.fillStyle = isHead ? SNAKE_HEAD : SNAKE_COLOR;
        const r = isHead ? CELL / 2 - 1 : CELL / 2 - 2;

        ctx.beginPath();
        ctx.roundRect(
            seg.x * CELL + 1,
            seg.y * CELL + 1,
            CELL - 2,
            CELL - 2,
            isHead ? 6 : 4
        );
        ctx.fill();

        // 머리 눈
        if (isHead) {
            ctx.fillStyle = '#fff';
            let ex1, ey1, ex2, ey2;
            const cx = seg.x * CELL + CELL / 2;
            const cy = seg.y * CELL + CELL / 2;
            if (dir.x === 1) { ex1 = cx+3; ey1 = cy-4; ex2 = cx+3; ey2 = cy+4; }
            else if (dir.x === -1) { ex1 = cx-3; ey1 = cy-4; ex2 = cx-3; ey2 = cy+4; }
            else if (dir.y === -1) { ex1 = cx-4; ey1 = cy-3; ex2 = cx+4; ey2 = cy-3; }
            else { ex1 = cx-4; ey1 = cy+3; ex2 = cx+4; ey2 = cy+3; }
            ctx.beginPath(); ctx.arc(ex1, ey1, 2, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.arc(ex2, ey2, 2, 0, Math.PI*2); ctx.fill();
        }
    });
}

function update() {
    dir = nextDir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    // 벽 충돌
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        endGame();
        return;
    }

    // 자기 몸 충돌
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);

    // 먹이
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        speed = Math.max(80, 150 - Math.floor(score / 50) * 10);
        spawnFood();
        // 100점 달성 시 팝콘 쿠폰 해금
        if (score >= 80 && !localStorage.getItem('onlyone_coupon_팝콘')) {
            localStorage.setItem('onlyone_coupon_팝콘', 'unlocked');
            showCouponUnlock('팝콘');
        }
    } else {
        snake.pop();
    }
}

function gameLoop(time) {
    if (!gameRunning) return;
    animFrame = requestAnimationFrame(gameLoop);
    if (paused) { draw(); return; }

    if (time - lastMove >= speed) {
        update();
        lastMove = time;
    }
    draw();
}

function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animFrame);
    const hi = parseInt(localStorage.getItem('onlyone_snake_high') || '0');
    if (score > hi) localStorage.setItem('onlyone_snake_high', score);
    document.getElementById('final-score').textContent = score;
    document.getElementById('high-score-text').textContent = '최고 점수: ' + Math.max(score, hi);
    // 쿠폰 해금 여부 표시
    const couponArea = document.getElementById('coupon-reward');
    if (localStorage.getItem('onlyone_coupon_팝콘')) {
        couponArea.innerHTML = '<button class="btn-coupon" onclick="location.href=\'../../coupons/index.html\'">🍿 팝콘 쿠폰 받기</button>';
    } else {
        couponArea.innerHTML = '<p style="color:#888;font-size:0.8rem;">🔒 80점 달성 시 팝콘 쿠폰 해금! (현재 ' + score + '점)</p>';
    }
    document.getElementById('game-over').classList.add('active');
}

function showCouponUnlock(name) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);color:#fff;padding:20px 32px;border-radius:16px;z-index:999;text-align:center;font-size:1.1rem;font-weight:700;animation:fadeIn 0.3s ease-out;box-shadow:0 8px 32px rgba(0,0,0,0.5)';
    toast.innerHTML = '🎉 쿠폰 해금!<br><span style="font-size:1.4rem">🍿 ' + name + ' 교환권</span>';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function togglePause() {
    paused = !paused;
    document.getElementById('pause-btn').textContent = paused ? '계속' : '일시정지';
}

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-over').classList.remove('active');
    resize();
    score = 0;
    speed = 150;
    paused = false;
    gameRunning = true;
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    document.getElementById('score').textContent = '0';
    document.getElementById('pause-btn').textContent = '일시정지';

    const midX = Math.floor(COLS / 2);
    const midY = Math.floor(ROWS / 2);
    snake = [
        { x: midX, y: midY },
        { x: midX - 1, y: midY },
        { x: midX - 2, y: midY }
    ];
    spawnFood();
    lastMove = performance.now();
    cancelAnimationFrame(animFrame);
    animFrame = requestAnimationFrame(gameLoop);
}

// 터치 조작
let touchStartX, touchStartY;

canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
});

canvas.addEventListener('touchend', e => {
    e.preventDefault();
    if (paused || !gameRunning) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;

    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && dir.x !== -1) nextDir = { x: 1, y: 0 };
        else if (dx < 0 && dir.x !== 1) nextDir = { x: -1, y: 0 };
    } else {
        if (dy > 0 && dir.y !== -1) nextDir = { x: 0, y: 1 };
        else if (dy < 0 && dir.y !== 1) nextDir = { x: 0, y: -1 };
    }
});

// 키보드
document.addEventListener('keydown', e => {
    if (!gameRunning || paused) return;
    switch (e.key) {
        case 'ArrowUp': if (dir.y !== 1) nextDir = { x: 0, y: -1 }; break;
        case 'ArrowDown': if (dir.y !== -1) nextDir = { x: 0, y: 1 }; break;
        case 'ArrowLeft': if (dir.x !== 1) nextDir = { x: -1, y: 0 }; break;
        case 'ArrowRight': if (dir.x !== -1) nextDir = { x: 1, y: 0 }; break;
    }
});

window.addEventListener('resize', () => { if (gameRunning) { resize(); draw(); } });
resize();
draw();
