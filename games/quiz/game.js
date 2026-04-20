/* ===== 퀴즈 게임 (행사 퀴즈 + 성경 인물 퀴즈) ===== */

const ALL_QUESTIONS = [
    { q: '2026 Revival Only One 소풍은 어느 교회 행사인가요?', o: ['사랑교회', '혜림교회', '은혜교회', '소망교회'], a: 1 },
    { q: '뭉게뭉게챌린지는 몇 월 며칠에 열리나요?', o: ['5월 1일', '5월 3일', '5월 9일', '5월 10일'], a: 1 },
    { q: '뭉게뭉게챌린지에 초청된 바리톤 연주자의 이름은?', o: ['유영광', '김영광', '이영광', '박영광'], a: 0 },
    { q: '봄음악제 바베큐파티는 무슨 요일에 열리나요?', o: ['주일', '토요일', '금요일', '수요일'], a: 1 },
    { q: '봄음악제 바베큐파티의 시작 시간은?', o: ['오전 10시', '오후 2시', '오후 4시', '오후 6시'], a: 2 },
    { q: '은혜가 있는 소풍은 며칠에 열리나요?', o: ['5/3, 9', '5/9, 10', '5/10, 17', '5/17, 24'], a: 2 },
    { q: '이번 소풍의 슬로건은 무엇인가요?', o: ['함께 걷는 여정, 한 사람을 향한 초대', '사랑으로 하나 되는 날', '은혜의 봄날', '복음의 기쁨'], a: 0 },
    { q: '"가족 소풍"의 주제는 무엇인가요?', o: ['교제가 있는 소풍', '사랑이 있는 소풍', '은혜가 있는 소풍', '기쁨이 있는 소풍'], a: 1 },
    { q: '"이웃 소풍"의 주제는 무엇인가요?', o: ['사랑이 있는 소풍', '은혜가 있는 소풍', '교제가 있는 소풍', '평화가 있는 소풍'], a: 2 },
    { q: '"영혼 소풍"의 주제는 무엇인가요?', o: ['사랑이 있는 소풍', '교제가 있는 소풍', '기쁨이 있는 소풍', '은혜가 있는 소풍'], a: 3 },
    { q: '뭉게뭉게 마켓에서 쿠폰을 사용할 수 있는 날은?', o: ['5월 9일', '5월 10일', '5월 3일', '5월 17일'], a: 2 },
    { q: '봄음악제에서 함께 하는 활동이 아닌 것은?', o: ['음악 감상', '바베큐', '캠프파이어', '교제'], a: 2 },
    { q: '은혜가 있는 소풍에서 초대하는 것은?', o: ['음악과 춤', '예배와 복음', '게임과 놀이', '영화와 간식'], a: 1 },
    { q: '이번 행사의 연도 슬로건에 포함된 단어는?', o: ['Revival', 'Festival', 'Celebration', 'Blessing'], a: 0 },
    { q: '소풍 행사는 총 몇 가지로 나뉘나요?', o: ['2가지', '3가지', '4가지', '5가지'], a: 1 },
    { q: '5월 3일(주일) 행사의 이름은?', o: ['봄음악제', '은혜가 있는 소풍', '뭉게뭉게챌린지', '바베큐파티'], a: 2 },
    { q: '5월 9일(토) 행사에 포함되지 않는 것은?', o: ['봄음악제', '바베큐파티', '초청연주', '교제'], a: 2 },
    { q: '소풍 행사에서 "가족" 행사의 날짜는?', o: ['5월 3일', '5월 9일', '5월 10일', '5월 17일'], a: 0 },
    { q: '소풍 행사에서 "이웃" 행사의 날짜는?', o: ['5월 3일', '5월 9일', '5월 10일', '5월 17일'], a: 1 },
    { q: '이번 소풍의 계절은?', o: ['여름', '가을', '봄', '겨울'], a: 2 }
];

// 성경 인물 문제 (정답 시 해당 인물 도감 해금)
const BIBLE_QUESTIONS = [
    { q: '홍수 심판 때 하나님 말씀을 듣고 방주를 만든 사람은?', o: ['아브라함', '노아', '야곱', '솔로몬'], a: 1, char: '노아' },
    { q: '비가 얼마 동안 내렸나요? (노아의 방주)', o: ['7일', '30일', '40일', '100일'], a: 2, char: '노아' },
    { q: '지팡이로 홍해를 갈라 이스라엘 백성을 인도한 사람은?', o: ['여호수아', '모세', '사무엘', '엘리야'], a: 1, char: '모세' },
    { q: '모세가 받은 하나님의 법 두 돌판을 무엇이라 하나요?', o: ['십계명', '주기도문', '사도신경', '팔복'], a: 0, char: '모세' },
    { q: '물매 하나로 거인 골리앗을 이긴 소년은?', o: ['사울', '솔로몬', '다윗', '요셉'], a: 2, char: '다윗' },
    { q: '다윗은 이스라엘의 무엇이 되었나요?', o: ['제사장', '왕', '선지자', '목수'], a: 1, char: '다윗' },
    { q: '사자굴에 던져졌지만 하나님이 지켜주신 사람은?', o: ['예레미야', '다니엘', '에스겔', '이사야'], a: 1, char: '다니엘' },
    { q: '다니엘이 하루에 몇 번 기도했나요?', o: ['1번', '2번', '3번', '7번'], a: 2, char: '다니엘' },
    { q: '큰 물고기 뱃속에서 3일을 지낸 선지자는?', o: ['엘리사', '요나', '이사야', '말라기'], a: 1, char: '요나' },
    { q: '요나가 복음을 전하러 간 도시 이름은?', o: ['바벨론', '애굽', '니느웨', '예루살렘'], a: 2, char: '요나' },
    { q: '유대인을 멸망에서 구원한 페르시아의 왕비 이름은?', o: ['룻', '한나', '에스더', '마리아'], a: 2, char: '에스더' },
    { q: '에스더의 삼촌으로 에스더를 키운 사람은?', o: ['모르드개', '하만', '아하수에로', '다윗'], a: 0, char: '에스더' },
    { q: '시어머니 나오미를 끝까지 따른 모압 여인은?', o: ['한나', '사라', '룻', '리브가'], a: 2, char: '룻' },
    { q: '룻의 후손 중에 훗날 나온 유명한 이스라엘 왕은?', o: ['솔로몬', '사울', '다윗', '히스기야'], a: 2, char: '룻' }
];

const CHAR_EMOJI = {
    '노아': '🚢', '모세': '🌊', '다윗': '🎯', '다니엘': '🦁',
    '요나': '🐋', '에스더': '👑', '룻': '🌾', '예수': '✝️'
};

let questions = [];
let currentIndex = 0;
let correctCount = 0;
let answered = false;
let currentMode = 'event'; // 'event' or 'bible'
let unlockedChars = [];

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function startGame(mode) {
    currentMode = mode || 'event';
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-over').classList.remove('active');
    const pool = currentMode === 'bible' ? BIBLE_QUESTIONS : ALL_QUESTIONS;
    const takeCount = Math.min(10, pool.length);
    questions = shuffle(pool).slice(0, takeCount);
    currentIndex = 0;
    correctCount = 0;
    answered = false;
    unlockedChars = [];
    document.getElementById('score').textContent = '0';
    document.getElementById('total').textContent = takeCount;
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentIndex];
    answered = false;

    const dots = document.getElementById('quiz-progress');
    dots.innerHTML = questions.map((_, i) => {
        let cls = 'quiz-dot';
        if (i < currentIndex) cls += questions[i].result === 'correct' ? ' correct' : ' wrong';
        else if (i === currentIndex) cls += ' current';
        return `<div class="${cls}"></div>`;
    }).join('');

    document.getElementById('quiz-number').textContent = `문제 ${currentIndex + 1} / ${questions.length}`;
    document.getElementById('quiz-question').textContent = q.q;
    document.getElementById('quiz-feedback').textContent = '';

    const optionsEl = document.getElementById('quiz-options');
    optionsEl.innerHTML = q.o.map((opt, i) =>
        `<button class="quiz-option" onclick="selectAnswer(${i})">${opt}</button>`
    ).join('');
}

function selectAnswer(idx) {
    if (answered) return;
    answered = true;

    const q = questions[currentIndex];
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');

    options.forEach(o => o.classList.add('disabled'));
    options[q.a].classList.add('correct');

    if (idx === q.a) {
        correctCount++;
        q.result = 'correct';
        feedback.innerHTML = '<span style="color:#00B894">⭕ 정답!</span>';
        document.getElementById('score').textContent = correctCount;
        if (typeof SFX !== 'undefined') SFX.correct();

        // 성경 모드: 정답 시 캐릭터 해금
        if (currentMode === 'bible' && q.char) {
            const key = 'onlyone_char_' + q.char;
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, 'unlocked');
                unlockedChars.push(q.char);
                showCharacterUnlock(q.char);
            }
        }
    } else {
        q.result = 'wrong';
        options[idx].classList.add('wrong');
        feedback.innerHTML = '<span style="color:#FF6B6B">❌ 오답!</span>';
        if (typeof SFX !== 'undefined') SFX.fail();
    }

    setTimeout(() => {
        currentIndex++;
        if (currentIndex < questions.length) {
            renderQuestion();
        } else {
            endGame();
        }
    }, 1200);
}

function endGame() {
    if (currentMode === 'event') {
        const hi = parseInt(localStorage.getItem('onlyone_quiz_high') || '0');
        if (correctCount > hi) localStorage.setItem('onlyone_quiz_high', correctCount);

        if (correctCount >= 5 && !localStorage.getItem('onlyone_coupon_떡볶이')) {
            localStorage.setItem('onlyone_coupon_떡볶이', 'unlocked');
            showCouponUnlock('떡볶이');
            if (typeof celebrate === 'function') celebrate();
        } else if (correctCount >= 5 && typeof SFX !== 'undefined') {
            SFX.victory();
        }
    } else {
        // 성경 모드 승리 판정: 정답 시 해금 처리됨
        checkAllBibleUnlocked();
        if (correctCount >= 5 && typeof celebrate === 'function') celebrate();
        else if (correctCount >= 3 && typeof SFX !== 'undefined') SFX.victory();
    }

    document.getElementById('final-score').textContent = correctCount + ' / ' + questions.length;
    document.getElementById('result-text').textContent = questions.length + '문제 중 ' + correctCount + '개 정답';

    const couponArea = document.getElementById('coupon-reward');
    if (currentMode === 'event') {
        if (localStorage.getItem('onlyone_coupon_떡볶이')) {
            couponArea.innerHTML = '<button class="btn-coupon" onclick="location.href=\'../../coupons/index.html\'">🌶️ 떡볶이 쿠폰 받기</button>';
        } else {
            couponArea.innerHTML = '<p style="color:#888;font-size:0.8rem;">🔒 5개 이상 정답 시 떡볶이 쿠폰 해금! (현재 ' + correctCount + '/5)</p>';
        }
    } else {
        const unlockedNow = unlockedChars.length;
        const totalUnlocked = ['노아','모세','다윗','다니엘','요나','에스더','룻']
            .filter(n => localStorage.getItem('onlyone_char_' + n)).length;
        const msg = unlockedNow > 0
            ? `✨ 이번에 ${unlockedNow}명 해금! (도감 ${totalUnlocked}/7)`
            : `도감에서 ${totalUnlocked}/7명 수집 중`;
        couponArea.innerHTML = `<p style="color:#8E44AD;font-size:0.85rem;font-weight:700;margin-bottom:10px;">${msg}</p>
            <button class="btn-coupon" onclick="location.href='../../characters/index.html'">📖 성경 인물 도감 보기</button>`;
    }

    document.getElementById('game-over').classList.add('active');
}

function checkAllBibleUnlocked() {
    const required = ['노아','모세','다윗','다니엘','요나','에스더','룻'];
    const allDone = required.every(n => localStorage.getItem('onlyone_char_' + n));
    if (allDone && !localStorage.getItem('onlyone_char_예수')) {
        localStorage.setItem('onlyone_char_예수', 'unlocked');
    }
}

function showCouponUnlock(name) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);color:#fff;padding:20px 32px;border-radius:16px;z-index:999;text-align:center;font-size:1.1rem;font-weight:700;animation:fadeIn 0.3s ease-out;box-shadow:0 8px 32px rgba(0,0,0,0.5)';
    toast.innerHTML = '🎉 쿠폰 해금!<br><span style="font-size:1.4rem">🌶️ ' + name + ' 교환권</span>';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function showCharacterUnlock(name) {
    const emoji = CHAR_EMOJI[name] || '⭐';
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:18%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#8E44AD,#3498DB);color:#fff;padding:16px 28px;border-radius:16px;z-index:999;text-align:center;font-size:0.95rem;font-weight:700;box-shadow:0 8px 32px rgba(0,0,0,0.5);animation:fadeIn 0.3s ease-out';
    toast.innerHTML = '📖 도감 해금!<br><span style="font-size:1.3rem">' + emoji + ' ' + name + '</span>';
    document.body.appendChild(toast);
    if (typeof SFX !== 'undefined') SFX.levelUp();
    setTimeout(() => toast.remove(), 2000);
}
