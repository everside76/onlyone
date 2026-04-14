/* ===== 블록 쌓기 (테트리스) ===== */
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const COLS = 10;
const ROWS = 20;
let CELL;
let score = 0;
let level = 1;
let lines = 0;
let paused = false;
let gameOver = false;
let board = [];
let current = null;
let dropTimer = 0;
let lastTime = 0;
let animFrame;

const COLORS = ['#00000000','#FF6B6B','#4A90D9','#00b894','#fdcb6e','#6c5ce7','#e17055','#00cec9'];

const SHAPES = [
    [[1,1,1,1]],
    [[2,2],[2,2]],
    [[0,3,0],[3,3,3]],
    [[4,0,0],[4,4,4]],
    [[0,0,5],[5,5,5]],
    [[0,6,6],[6,6,0]],
    [[7,7,0],[0,7,7]]
];

function resize() {
    const area = document.querySelector('.game-canvas-area');
    const maxW = area.clientWidth - 16;
    const maxH = area.clientHeight - 16;
    CELL = Math.floor(Math.min(maxW / COLS, maxH / ROWS));
    canvas.width = COLS * CELL;
    canvas.height = ROWS * CELL;
}

function createBoard() {
    board = Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
}

function newPiece() {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    current = {
        shape: shape.map(r => [...r]),
        x: Math.floor((COLS - shape[0].length) / 2),
        y: 0
    };
    if (collides(current.shape, current.x, current.y)) {
        endGame();
    }
}

function collides(shape, ox, oy) {
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (!shape[r][c]) continue;
            const nx = ox + c, ny = oy + r;
            if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
            if (ny >= 0 && board[ny][nx]) return true;
        }
    }
    return false;
}

function merge() {
    current.shape.forEach((row, r) => {
        row.forEach((val, c) => {
            if (val && current.y + r >= 0) {
                board[current.y + r][current.x + c] = val;
            }
        });
    });
}

function clearLines() {
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r].every(c => c !== 0)) {
            board.splice(r, 1);
            board.unshift(new Array(COLS).fill(0));
            cleared++;
            r++;
        }
    }
    if (cleared) {
        const pts = [0, 100, 300, 500, 800];
        score += (pts[cleared] || 800) * level;
        lines += cleared;
        level = Math.floor(lines / 10) + 1;
        document.getElementById('score').textContent = score;
        // 10줄 달성 시 짜장밥 쿠폰 해금
        if (lines >= 10 && !localStorage.getItem('onlyone_coupon_짜장밥')) {
            localStorage.setItem('onlyone_coupon_짜장밥', 'unlocked');
            showCouponUnlock('짜장밥');
        }
    }
}

function rotate() {
    const s = current.shape;
    const rotated = s[0].map((_, i) => s.map(r => r[i]).reverse());
    if (!collides(rotated, current.x, current.y)) {
        current.shape = rotated;
    } else if (!collides(rotated, current.x - 1, current.y)) {
        current.shape = rotated; current.x--;
    } else if (!collides(rotated, current.x + 1, current.y)) {
        current.shape = rotated; current.x++;
    }
}

function move(dx) {
    if (!collides(current.shape, current.x + dx, current.y)) {
        current.x += dx;
    }
}

function drop() {
    if (!collides(current.shape, current.x, current.y + 1)) {
        current.y++;
    } else {
        merge();
        clearLines();
        newPiece();
    }
}

function hardDrop() {
    while (!collides(current.shape, current.x, current.y + 1)) {
        current.y++;
        score += 2;
    }
    document.getElementById('score').textContent = score;
    merge();
    clearLines();
    newPiece();
}

function draw() {
    ctx.fillStyle = '#16213e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 그리드
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            ctx.strokeRect(c * CELL, r * CELL, CELL, CELL);
        }
    }

    // 보드
    board.forEach((row, r) => {
        row.forEach((val, c) => {
            if (val) {
                ctx.fillStyle = COLORS[val];
                ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
                ctx.fillStyle = 'rgba(255,255,255,0.15)';
                ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, 3);
            }
        });
    });

    // 현재 블록
    if (current) {
        current.shape.forEach((row, r) => {
            row.forEach((val, c) => {
                if (val) {
                    const x = (current.x + c) * CELL;
                    const y = (current.y + r) * CELL;
                    ctx.fillStyle = COLORS[val];
                    ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
                    ctx.fillStyle = 'rgba(255,255,255,0.2)';
                    ctx.fillRect(x + 1, y + 1, CELL - 2, 3);
                }
            });
        });
    }
}

function update(time) {
    if (gameOver) return;
    animFrame = requestAnimationFrame(update);
    if (paused) return;

    const dt = time - lastTime;
    lastTime = time;
    dropTimer += dt;

    const speed = Math.max(100, 800 - (level - 1) * 70);
    if (dropTimer > speed) {
        drop();
        dropTimer = 0;
    }
    draw();
}

function endGame() {
    gameOver = true;
    cancelAnimationFrame(animFrame);
    const hi = parseInt(localStorage.getItem('onlyone_tetris_high') || '0');
    if (score > hi) localStorage.setItem('onlyone_tetris_high', score);
    document.getElementById('final-score').textContent = score;
    document.getElementById('high-score-text').textContent = '최고 점수: ' + Math.max(score, hi);
    // 쿠폰 해금 여부 표시
    const couponArea = document.getElementById('coupon-reward');
    if (localStorage.getItem('onlyone_coupon_짜장밥')) {
        couponArea.innerHTML = '<button class="btn-coupon" onclick="location.href=\'../../coupons/index.html\'">🍚 짜장밥 쿠폰 받기</button>';
    } else {
        couponArea.innerHTML = '<p style="color:#888;font-size:0.8rem;">🔒 10줄 완성 시 짜장밥 쿠폰 해금! (현재 ' + lines + '줄)</p>';
    }
    document.getElementById('game-over').classList.add('active');
}

function showCouponUnlock(name) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);color:#fff;padding:20px 32px;border-radius:16px;z-index:999;text-align:center;font-size:1.1rem;font-weight:700;animation:fadeIn 0.3s ease-out;box-shadow:0 8px 32px rgba(0,0,0,0.5)';
    toast.innerHTML = '🎉 쿠폰 해금!<br><span style="font-size:1.4rem">🍚 ' + name + ' 교환권</span>';
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
    score = 0; level = 1; lines = 0; dropTimer = 0; gameOver = false; paused = false;
    document.getElementById('score').textContent = '0';
    document.getElementById('pause-btn').textContent = '일시정지';
    resize();
    createBoard();
    newPiece();
    lastTime = performance.now();
    cancelAnimationFrame(animFrame);
    animFrame = requestAnimationFrame(update);
}

// 터치 조작
let touchStartX, touchStartY, touchStartTime;

canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
    touchStartTime = Date.now();
});

canvas.addEventListener('touchend', e => {
    e.preventDefault();
    if (paused || gameOver || !current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    const elapsed = Date.now() - touchStartTime;

    if (Math.abs(dx) < 15 && Math.abs(dy) < 15 && elapsed < 300) {
        rotate();
    } else if (Math.abs(dx) > Math.abs(dy)) {
        move(dx > 0 ? 1 : -1);
    } else if (dy > 30) {
        hardDrop();
    }
    draw();
});

// 키보드 (데스크톱)
document.addEventListener('keydown', e => {
    if (paused || gameOver || !current) return;
    switch (e.key) {
        case 'ArrowLeft': move(-1); break;
        case 'ArrowRight': move(1); break;
        case 'ArrowDown': drop(); break;
        case 'ArrowUp': rotate(); break;
        case ' ': hardDrop(); break;
    }
    draw();
});

window.addEventListener('resize', () => { if (!gameOver) { resize(); draw(); } });
resize();
draw();
