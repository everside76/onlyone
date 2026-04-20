/* ===== OnlyOne 효과음 & 승리 애니메이션 공통 유틸 ===== */

const SOUND_KEY = 'onlyone_sound_enabled';
let _audioCtx = null;

function isSoundOn() {
    return localStorage.getItem(SOUND_KEY) !== 'false';
}

function toggleSound() {
    const next = !isSoundOn();
    localStorage.setItem(SOUND_KEY, next ? 'true' : 'false');
    return next;
}

function getAudioContext() {
    if (!isSoundOn()) return null;
    if (!_audioCtx) {
        try {
            _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            return null;
        }
    }
    if (_audioCtx.state === 'suspended') _audioCtx.resume();
    return _audioCtx;
}

function playTone(freq, duration = 0.12, type = 'sine', volume = 0.15) {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
}

function playChord(freqs, duration = 0.3, type = 'sine') {
    freqs.forEach((f, i) => {
        setTimeout(() => playTone(f, duration, type), i * 60);
    });
}

const SFX = {
    click:   () => playTone(800, 0.05, 'square', 0.08),
    score:   () => playTone(1200, 0.1, 'sine', 0.12),
    correct: () => playChord([659, 784], 0.18, 'sine'),
    levelUp: () => playChord([523, 659, 784], 0.25, 'triangle'),
    victory: () => playChord([523, 659, 784, 1047], 0.35, 'triangle'),
    fail:    () => playTone(180, 0.3, 'sawtooth', 0.1)
};

/* ===== 컨페티 애니메이션 ===== */

function ensureConfettiStyles() {
    if (document.getElementById('confetti-styles')) return;
    const style = document.createElement('style');
    style.id = 'confetti-styles';
    style.textContent = `
        .onlyone-confetti-wrap {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        }
        .onlyone-confetti-piece {
            position: absolute;
            width: 10px;
            height: 16px;
            top: -20px;
            opacity: 0;
            animation: confetti-fall linear forwards;
        }
        @keyframes confetti-fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0.9; }
        }
    `;
    document.head.appendChild(style);
}

function showConfetti(count = 60) {
    ensureConfettiStyles();
    const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#E84393', '#6C5CE7', '#FDA7DF', '#00CEC9'];
    const wrap = document.createElement('div');
    wrap.className = 'onlyone-confetti-wrap';
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'onlyone-confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (1.8 + Math.random() * 1.6) + 's';
        piece.style.animationDelay = (Math.random() * 0.5) + 's';
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        if (Math.random() > 0.5) {
            piece.style.width = '8px';
            piece.style.height = '8px';
            piece.style.borderRadius = '50%';
        }
        wrap.appendChild(piece);
    }
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), 4500);
}

function celebrate() {
    SFX.victory();
    showConfetti();
}

/* ===== 중앙 정렬 토스트 (해금 알림) ===== */
function showCenterToast(innerHtml, duration = 2500, topPercent = 50) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:fixed;left:0;right:0;top:0;bottom:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:9998;';
    if (topPercent !== 50) {
        wrap.style.alignItems = 'flex-start';
        wrap.style.paddingTop = topPercent + 'vh';
    }
    const toast = document.createElement('div');
    toast.style.cssText = 'pointer-events:auto;background:rgba(0,0,0,0.9);color:#fff;padding:20px 32px;border-radius:16px;text-align:center;font-size:1.1rem;font-weight:700;box-shadow:0 8px 32px rgba(0,0,0,0.5);opacity:0;transform:scale(0.9);transition:opacity 0.25s,transform 0.25s;max-width:90vw;';
    toast.innerHTML = innerHtml;
    wrap.appendChild(toast);
    document.body.appendChild(wrap);
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'scale(1)';
    });
    setTimeout(() => wrap.remove(), duration);
}
