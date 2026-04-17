/* ===== 성경 말씀 카드 생성기 ===== */

const VERSES = [
    // 두려움/불안에 대한 위로
    { text: '두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라 내가 너를 굳세게 하리라 참으로 너를 도와주리라', ref: '이사야 41:10' },
    { text: '여호와는 나의 목자시니 내게 부족함이 없으리로다', ref: '시편 23:1' },
    { text: '내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라', ref: '시편 23:4' },
    { text: '너는 내게 부르짖으라 내가 네게 응답하겠고 네가 알지 못하는 크고 은밀한 일을 네게 보이리라', ref: '예레미야 33:3' },
    { text: '여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요 달음박질하여도 곤비하지 아니하겠고 걸어가도 피곤하지 아니하리로다', ref: '이사야 40:31' },
    { text: '평안을 너희에게 끼치노니 곧 나의 평안을 너희에게 주노라 너희는 마음에 근심도 말고 두려워하지도 말라', ref: '요한복음 14:27' },
    { text: '하나님이 우리에게 주신 것은 두려워하는 마음이 아니요 오직 능력과 사랑과 절제하는 마음이니', ref: '디모데후서 1:7' },
    { text: '환난 날에 나를 부르라 내가 너를 건지리니 네가 나를 영화롭게 하리로다', ref: '시편 50:15' },

    // 미래에 대한 희망
    { text: '너희를 향한 나의 생각을 내가 아나니 평안이요 재앙이 아니니라 너희에게 미래와 희망을 주는 것이니라', ref: '예레미야 29:11' },
    { text: '우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라', ref: '로마서 8:28' },
    { text: '내가 확신하노니 사망이나 생명이나 천사들이나 다른 어떤 피조물이라도 우리를 우리 주 그리스도 예수 안에 있는 하나님의 사랑에서 끊을 수 없으리라', ref: '로마서 8:38-39' },
    { text: '이것을 너희에게 이르는 것은 너희로 내 안에서 평안을 누리게 하려 함이라 세상에서는 너희가 환난을 당하나 담대하라 내가 세상을 이기었노라', ref: '요한복음 16:33' },
    { text: '눈물을 흘리며 씨를 뿌리는 자는 기쁨으로 거두리로다', ref: '시편 126:5' },
    { text: '우리의 잠시 받는 환난의 경한 것이 지극히 크고 영원한 영광의 중한 것을 우리에게 이루게 함이니', ref: '고린도후서 4:17' },
    { text: '항상 기뻐하라 쉬지 말고 기도하라 범사에 감사하라 이것이 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라', ref: '데살로니가전서 5:16-18' },

    // 자존감/정체성
    { text: '내가 주께 감사하옴은 나를 지으심이 심히 기묘하심이라 주께서 하시는 일이 기이함을 내 영혼이 잘 아나이다', ref: '시편 139:14' },
    { text: '우리는 그가 만드신 바라 그리스도 예수 안에서 선한 일을 위하여 지으심을 받은 자니', ref: '에베소서 2:10' },
    { text: '그런즉 누구든지 그리스도 안에 있으면 새로운 피조물이라 이전 것은 지나갔으니 보라 새 것이 되었도다', ref: '고린도후서 5:17' },
    { text: '너희는 세상의 빛이라 산 위에 있는 동네가 숨겨지지 못할 것이요', ref: '마태복음 5:14' },
    { text: '보라 내가 너를 내 손바닥에 새겼고 너의 성벽이 항상 내 앞에 있나니', ref: '이사야 49:16' },
    { text: '너희 중에 착한 일을 시작하신 이가 그리스도 예수의 날까지 이루실 줄을 우리는 확신하노라', ref: '빌립보서 1:6' },

    // 사랑과 격려
    { text: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라', ref: '요한복음 3:16' },
    { text: '내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라', ref: '빌립보서 4:13' },
    { text: '여호와는 나의 빛이요 나의 구원이시니 내가 누구를 두려워하리요 여호와는 내 생명의 능력이시니 내가 누구를 무서워하리요', ref: '시편 27:1' },
    { text: '수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라', ref: '마태복음 11:28' },
    { text: '여호와를 기뻐하라 그가 네 마음의 소원을 네게 이루어 주시리로다', ref: '시편 37:4' },
    { text: '네 짐을 여호와께 맡기라 그가 너를 붙드시고 의인의 요동함을 영원히 허락하지 아니하시리로다', ref: '시편 55:22' },
    { text: '강하고 담대하라 두려워하지 말며 놀라지 말라 네가 어디로 가든지 네 하나님 여호와가 너와 함께 하느니라', ref: '여호수아 1:9' },
    { text: '여호와는 가까이 하는 모든 자 곧 진실하게 가까이 하는 모든 자에게 가까이 하시는도다', ref: '시편 145:18' },
    { text: '낙심하지 말라 때가 이르매 거두리라', ref: '갈라디아서 6:9' },
    { text: '사랑 안에 두려움이 없고 온전한 사랑이 두려움을 내쫓나니', ref: '요한일서 4:18' },
    { text: '여호와께서 너를 위하여 그의 천사들을 명령하사 네 모든 길에서 너를 지키게 하심이라', ref: '시편 91:11' },
    { text: '구하라 그리하면 너희에게 주실 것이요 찾으라 그리하면 찾아낼 것이요 문을 두드리라 그리하면 너희에게 열릴 것이니', ref: '마태복음 7:7' },
    { text: '너희가 나를 온 마음으로 찾고 구하면 나를 만나리라', ref: '예레미야 29:13' },
    { text: '여호와의 인자와 긍휼이 무궁하시도다 이것들이 아침마다 새로우니 주의 성실하심이 크시도다', ref: '예레미야애가 3:22-23' },
    { text: '네 시작은 미약하였으나 네 나중은 심히 창대하리라', ref: '욥기 8:7' },
    { text: '여호와는 나의 힘이요 나의 노래시며 나의 구원이시로다', ref: '시편 118:14' },
    { text: '내가 산을 향하여 눈을 들리라 나의 도움이 어디서 올까 나의 도움은 천지를 지으신 여호와에게서로다', ref: '시편 121:1-2' },
    { text: '이르시되 내 은혜가 네게 족하도다 이는 내 능력이 약한 데서 온전하여짐이라', ref: '고린도후서 12:9' },
    { text: '기뻐하는 자들과 함께 기뻐하고 우는 자들과 함께 울라', ref: '로마서 12:15' }
];

const THEMES = [
    { name: '보라 하늘', colors: ['#667eea', '#764ba2'] },
    { name: '노을빛',   colors: ['#f093fb', '#f5576c'] },
    { name: '새벽 숲',  colors: ['#4facfe', '#00f2fe'] },
    { name: '따뜻한 봄', colors: ['#fa709a', '#fee140'] },
    { name: '평화로운 밤', colors: ['#0c3483', '#a2b6df'] }
];

let currentVerse = null;
let currentTheme = 0;

function pickVerse() {
    const prev = currentVerse;
    do {
        currentVerse = VERSES[Math.floor(Math.random() * VERSES.length)];
    } while (currentVerse === prev && VERSES.length > 1);

    renderPreview();
}

function setTheme(idx) {
    currentTheme = idx;
    document.querySelectorAll('.theme-btn').forEach((b, i) => {
        b.classList.toggle('active', i === idx);
    });
    renderPreview();
}

function renderPreview() {
    if (!currentVerse) return;
    const preview = document.getElementById('card-preview');
    const t = THEMES[currentTheme];
    preview.style.background = `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})`;
    document.getElementById('preview-text').textContent = currentVerse.text;
    document.getElementById('preview-ref').textContent = '- ' + currentVerse.ref + ' -';
    document.getElementById('card-actions').style.display = 'flex';
}

/**
 * 텍스트를 캔버스 폭에 맞게 자동 줄바꿈
 */
function wrapText(ctx, text, maxWidth) {
    const chars = text.split('');
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < chars.length; i++) {
        const testLine = currentLine + chars[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = chars[i];
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
}

function generateImage() {
    if (!currentVerse) return;
    const W = 1080, H = 1080;
    const canvas = document.getElementById('card-canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    const t = THEMES[currentTheme];

    // 배경
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, t.colors[0]);
    grad.addColorStop(1, t.colors[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 장식 원
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath(); ctx.arc(W - 100, 150, 250, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(100, H - 100, 180, 0, Math.PI * 2); ctx.fill();

    // 십자가 장식
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(W / 2, 60); ctx.lineTo(W / 2, 140); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W / 2 - 30, 90); ctx.lineTo(W / 2 + 30, 90); ctx.stroke();

    // 테두리
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 2;
    roundRect(ctx, 30, 30, W - 60, H - 60, 30);
    ctx.stroke();

    // 말씀 텍스트 - 자동 줄바꿈
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    const maxTextWidth = W - 160;
    const fontSize = 40;
    ctx.font = `bold ${fontSize}px "Noto Sans KR", sans-serif`;

    const lines = wrapText(ctx, currentVerse.text, maxTextWidth);
    const lineHeight = fontSize * 1.8;
    const totalHeight = lines.length * lineHeight;
    const startY = (H - totalHeight) / 2 + fontSize;

    lines.forEach((line, i) => {
        ctx.fillText(line, W / 2, startY + i * lineHeight);
    });

    // 출처
    ctx.font = 'bold 28px "Noto Sans KR", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText('- ' + currentVerse.ref + ' -', W / 2, startY + lines.length * lineHeight + 30);

    // 하단 사용처 안내
    ctx.font = '18px "Noto Sans KR", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText('OnlyOne | 혜림교회', W / 2, H - 50);

    return canvas.toDataURL('image/png');
}

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

function downloadCard() {
    const dataUrl = generateImage();
    const link = document.createElement('a');
    link.download = `말씀카드_${currentVerse.ref.replace(/\s/g, '_')}.png`;
    link.href = dataUrl;
    link.click();
    showToast('말씀 카드가 저장되었습니다!');
}

function shareCard() {
    const dataUrl = generateImage();
    if (navigator.share && navigator.canShare) {
        fetch(dataUrl)
            .then(r => r.blob())
            .then(blob => {
                const file = new File([blob], '말씀카드.png', { type: 'image/png' });
                navigator.share({ title: currentVerse.ref, files: [file] }).catch(() => {});
            });
    } else {
        downloadCard();
    }
}

function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(80px);background:rgba(45,52,54,0.95);color:#fff;padding:12px 24px;border-radius:14px;font-size:0.85rem;font-weight:600;z-index:2000;opacity:0;transition:all 0.4s;pointer-events:none;';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(80px)';
    }, 2500);
}
