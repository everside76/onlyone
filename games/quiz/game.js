/* ===== 퀴즈 게임 ===== */

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

let questions = [];
let currentIndex = 0;
let correctCount = 0;
let answered = false;

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-over').classList.remove('active');
    questions = shuffle(ALL_QUESTIONS).slice(0, 10);
    currentIndex = 0;
    correctCount = 0;
    answered = false;
    document.getElementById('score').textContent = '0';
    document.getElementById('total').textContent = '10';
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentIndex];
    answered = false;

    // 진행 상태 도트
    const dots = document.getElementById('quiz-progress');
    dots.innerHTML = questions.map((_, i) => {
        let cls = 'quiz-dot';
        if (i < currentIndex) cls += questions[i].result === 'correct' ? ' correct' : ' wrong';
        else if (i === currentIndex) cls += ' current';
        return `<div class="${cls}"></div>`;
    }).join('');

    document.getElementById('quiz-number').textContent = `문제 ${currentIndex + 1} / 10`;
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

    // 모든 옵션 비활성화
    options.forEach(o => o.classList.add('disabled'));

    // 정답 표시
    options[q.a].classList.add('correct');

    if (idx === q.a) {
        correctCount++;
        q.result = 'correct';
        feedback.innerHTML = '<span style="color:#00B894">⭕ 정답!</span>';
        document.getElementById('score').textContent = correctCount;
    } else {
        q.result = 'wrong';
        options[idx].classList.add('wrong');
        feedback.innerHTML = '<span style="color:#FF6B6B">❌ 오답!</span>';
    }

    // 다음 문제 또는 결과
    setTimeout(() => {
        currentIndex++;
        if (currentIndex < 10) {
            renderQuestion();
        } else {
            endGame();
        }
    }, 1200);
}

function endGame() {
    // 최고 기록 저장
    const hi = parseInt(localStorage.getItem('onlyone_quiz_high') || '0');
    if (correctCount > hi) localStorage.setItem('onlyone_quiz_high', correctCount);

    // 5개 이상 정답 시 떡볶이 쿠폰 해금
    if (correctCount >= 5 && !localStorage.getItem('onlyone_coupon_떡볶이')) {
        localStorage.setItem('onlyone_coupon_떡볶이', 'unlocked');
        showCouponUnlock('떡볶이');
    }

    document.getElementById('final-score').textContent = correctCount + ' / 10';
    document.getElementById('result-text').textContent = '10문제 중 ' + correctCount + '개 정답';

    const couponArea = document.getElementById('coupon-reward');
    if (localStorage.getItem('onlyone_coupon_떡볶이')) {
        couponArea.innerHTML = '<button class="btn-coupon" onclick="location.href=\'../../coupons/index.html\'">🌶️ 떡볶이 쿠폰 받기</button>';
    } else {
        couponArea.innerHTML = '<p style="color:#888;font-size:0.8rem;">🔒 5개 이상 정답 시 떡볶이 쿠폰 해금! (현재 ' + correctCount + '/5)</p>';
    }

    document.getElementById('game-over').classList.add('active');
}

function showCouponUnlock(name) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.9);color:#fff;padding:20px 32px;border-radius:16px;z-index:999;text-align:center;font-size:1.1rem;font-weight:700;animation:fadeIn 0.3s ease-out;box-shadow:0 8px 32px rgba(0,0,0,0.5)';
    toast.innerHTML = '🎉 쿠폰 해금!<br><span style="font-size:1.4rem">🌶️ ' + name + ' 교환권</span>';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}
