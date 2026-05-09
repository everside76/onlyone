const QUESTION_SETS = [
    [
        {
            lesson: "22과",
            question: "하나님은 사람을 누구의 형상대로 만드셨나요?",
            options: ["동물", "하나님의 형상", "천사"],
            answer: 1,
            imageIndex: 0
        },
        {
            lesson: "22과",
            question: "하나님의 형상은 무엇을 닮은 것인가요?",
            options: ["겉모습", "속마음과 성품", "힘"],
            answer: 1,
            imageIndex: 1
        },
        {
            lesson: "22과",
            question: "처음 사람은 어떤 마음으로 하나님을 알 수 있었나요?",
            options: ["하나님을 아는 지식", "장난치는 마음", "숨는 마음"],
            answer: 0,
            imageIndex: 2
        },
        {
            lesson: "22과",
            question: "하나님이 처음 사람에게 주신 아름다운 성품은 무엇인가요?",
            options: ["거짓과 미움", "의와 참된 거룩함", "무서움"],
            answer: 1,
            imageIndex: 3
        },
        {
            lesson: "23과",
            question: "아담과 하와를 유혹한 것은 누구였나요?",
            options: ["뱀", "사자", "새"],
            answer: 0,
            imageIndex: 4
        },
        {
            lesson: "23과",
            question: "아담과 하와는 누구의 말보다 뱀의 말을 믿었나요?",
            options: ["하나님의 말씀", "천사의 노래", "친구의 말"],
            answer: 0,
            imageIndex: 5
        },
        {
            lesson: "23과",
            question: "죄가 들어오자 무엇이 깨졌나요?",
            options: ["하나님과의 관계", "운동장", "집"],
            answer: 0,
            imageIndex: 6
        },
        {
            lesson: "23과",
            question: "죄 때문에 우리에게 꼭 필요한 분은 누구인가요?",
            options: ["구원자", "심부름꾼", "요리사"],
            answer: 0,
            imageIndex: 7
        },
        {
            lesson: "24과",
            question: "아담은 누구의 대표였나요?",
            options: ["자기 혼자", "모든 사람", "동물들"],
            answer: 1,
            imageIndex: 8
        },
        {
            lesson: "24과",
            question: "아담의 죄는 누구에게 영향을 주었나요?",
            options: ["아담 혼자", "모든 사람", "뱀만"],
            answer: 1,
            imageIndex: 9
        },
        {
            lesson: "24과",
            question: "우리에게 필요한 새 대표는 누구인가요?",
            options: ["노아", "다윗", "예수님"],
            answer: 2,
            imageIndex: 10
        },
        {
            lesson: "24과",
            question: "예수님은 우리에게 무엇을 주시나요?",
            options: ["용서와 생명", "죄와 죽음", "두려움"],
            answer: 0,
            imageIndex: 11
        }
    ],
    [
        {
            lesson: "22과",
            question: "사람이 특별한 까닭은 무엇인가요?",
            options: ["빠르게 달려서", "하나님의 형상대로 지어져서", "키가 커서"],
            answer: 1,
            imageIndex: 0
        },
        {
            lesson: "22과",
            question: "하나님을 닮은 모습은 어디에서 드러나나요?",
            options: ["옷 색깔", "마음과 생각과 성품", "머리 모양"],
            answer: 1,
            imageIndex: 1
        },
        {
            lesson: "22과",
            question: "처음 사람은 누구를 바르게 알 수 있었나요?",
            options: ["하나님", "뱀", "먼 나라 왕"],
            answer: 0,
            imageIndex: 2
        },
        {
            lesson: "22과",
            question: "처음 사람의 마음은 하나님 앞에서 어땠나요?",
            options: ["거룩하고 바름", "심술궂음", "늘 화남"],
            answer: 0,
            imageIndex: 3
        },
        {
            lesson: "23과",
            question: "뱀은 아담과 하와가 무엇을 의심하게 했나요?",
            options: ["하나님의 말씀", "나무의 키", "동물의 이름"],
            answer: 0,
            imageIndex: 4
        },
        {
            lesson: "23과",
            question: "아담과 하와가 먹지 말아야 했던 것은 무엇인가요?",
            options: ["선악을 알게 하는 나무 열매", "물고기", "빵"],
            answer: 0,
            imageIndex: 5
        },
        {
            lesson: "23과",
            question: "죄가 들어오자 사람은 하나님과 어떻게 되었나요?",
            options: ["더 가까워짐", "멀어짐", "상관없어짐"],
            answer: 1,
            imageIndex: 6
        },
        {
            lesson: "23과",
            question: "죄 문제를 해결하려면 우리에게 누가 필요할까요?",
            options: ["구원자", "더 큰 집", "새 신발"],
            answer: 0,
            imageIndex: 7
        },
        {
            lesson: "24과",
            question: "대표가 한 일을 함께 받는다는 비유는 무엇과 비슷한가요?",
            options: ["대표팀", "혼자 숨바꼭질", "색칠 공부"],
            answer: 0,
            imageIndex: 8
        },
        {
            lesson: "24과",
            question: "아담의 죄는 몇 사람에게만 영향을 주었나요?",
            options: ["아담 한 사람만", "모든 사람", "동물들만"],
            answer: 1,
            imageIndex: 9
        },
        {
            lesson: "24과",
            question: "하나님이 보내주신 새 대표는 누구인가요?",
            options: ["예수님", "요나", "솔로몬"],
            answer: 0,
            imageIndex: 10
        },
        {
            lesson: "24과",
            question: "예수님 안에 있는 사람에게 주어지는 것은 무엇인가요?",
            options: ["생명", "죄와 죽음", "두려움"],
            answer: 0,
            imageIndex: 11
        }
    ],
    [
        {
            lesson: "22과",
            question: "하나님은 사람을 아무렇게나 만드셨나요?",
            options: ["아니요, 하나님의 형상대로", "네, 우연히", "동물과 똑같이"],
            answer: 0,
            imageIndex: 0
        },
        {
            lesson: "22과",
            question: "하나님의 형상은 주로 무엇을 말하나요?",
            options: ["겉모습만", "하나님을 닮은 속사람", "키와 몸무게"],
            answer: 1,
            imageIndex: 1
        },
        {
            lesson: "22과",
            question: "사람은 처음에 하나님의 말씀을 어떻게 알 수 있었나요?",
            options: ["바르게 알 수 있었어요", "전혀 몰랐어요", "동물에게 배웠어요"],
            answer: 0,
            imageIndex: 2
        },
        {
            lesson: "22과",
            question: "처음 사람에게 있던 참된 거룩함은 누구를 닮은 것인가요?",
            options: ["하나님", "뱀", "천둥"],
            answer: 0,
            imageIndex: 3
        },
        {
            lesson: "23과",
            question: "뱀은 하나님 말씀을 잘 따르라고 도와줬나요?",
            options: ["아니요", "네", "모르겠어요"],
            answer: 0,
            imageIndex: 4
        },
        {
            lesson: "23과",
            question: "아담과 하와는 하나님의 말씀 대신 누구의 말을 따랐나요?",
            options: ["뱀의 말", "천사의 말", "노아의 말"],
            answer: 0,
            imageIndex: 5
        },
        {
            lesson: "23과",
            question: "죄는 하나님과 우리 사이를 어떻게 만들까요?",
            options: ["멀어지게 해요", "더 재미있게 해요", "아무 일도 없게 해요"],
            answer: 0,
            imageIndex: 6
        },
        {
            lesson: "23과",
            question: "우리는 스스로 죄를 완전히 이길 수 있나요?",
            options: ["아니요, 구원자가 필요해요", "네, 언제나 쉬워요", "연습만 하면 돼요"],
            answer: 0,
            imageIndex: 7
        },
        {
            lesson: "24과",
            question: "아담은 모든 사람의 무엇이었나요?",
            options: ["대표", "손님", "심부름꾼"],
            answer: 0,
            imageIndex: 8
        },
        {
            lesson: "24과",
            question: "우리가 태어날 때부터 죄인인 까닭은 무엇인가요?",
            options: ["아담이 우리의 대표였기 때문에", "밥을 안 먹어서", "잠을 적게 자서"],
            answer: 0,
            imageIndex: 9
        },
        {
            lesson: "24과",
            question: "예수님은 아담과 비교할 때 어떤 대표인가요?",
            options: ["새 대표", "나쁜 대표", "모르는 대표"],
            answer: 0,
            imageIndex: 10
        },
        {
            lesson: "24과",
            question: "예수님은 우리를 하나님께 어떻게 하시나요?",
            options: ["가까이 가게 해요", "멀리 도망가게 해요", "숨어 있게 해요"],
            answer: 0,
            imageIndex: 11
        }
    ],
    [
        {
            lesson: "22과",
            question: "하나님이 사람에게 주신 가장 귀한 모습은 무엇인가요?",
            options: ["하나님의 형상", "빠른 발", "큰 목소리"],
            answer: 0,
            imageIndex: 0
        },
        {
            lesson: "22과",
            question: "하나님의 형상대로 산다는 것은 어떤 모습인가요?",
            options: ["하나님을 알고 닮아 가는 모습", "마음대로만 사는 모습", "자랑만 하는 모습"],
            answer: 0,
            imageIndex: 1
        },
        {
            lesson: "22과",
            question: "처음 사람은 하나님을 모른 채 만들어졌나요?",
            options: ["아니요, 하나님을 알 수 있었어요", "네, 아무것도 몰랐어요", "동물만 알았어요"],
            answer: 0,
            imageIndex: 2
        },
        {
            lesson: "22과",
            question: "하나님이 기뻐하시는 마음은 어떤 마음인가요?",
            options: ["의롭고 거룩한 마음", "거짓말하는 마음", "미워하는 마음"],
            answer: 0,
            imageIndex: 3
        },
        {
            lesson: "23과",
            question: "선악과 앞에서 뱀은 무엇을 했나요?",
            options: ["유혹했어요", "찬양했어요", "청소했어요"],
            answer: 0,
            imageIndex: 4
        },
        {
            lesson: "23과",
            question: "아담과 하와가 잘못 선택한 것은 무엇인가요?",
            options: ["하나님 말씀보다 뱀의 말을 믿은 것", "서로 인사한 것", "동물 이름을 지은 것"],
            answer: 0,
            imageIndex: 5
        },
        {
            lesson: "23과",
            question: "죄가 들어오면 마음의 빛은 어떻게 되나요?",
            options: ["어두워져요", "더 밝아져요", "색깔만 바뀌어요"],
            answer: 0,
            imageIndex: 6
        },
        {
            lesson: "23과",
            question: "우리를 다시 하나님께 가까이 가게 하시는 분은 누구인가요?",
            options: ["예수님", "뱀", "아담 혼자"],
            answer: 0,
            imageIndex: 7
        },
        {
            lesson: "24과",
            question: "대표가 지면 대표 안에 있는 사람들은 어떻게 되나요?",
            options: ["함께 진 것처럼 돼요", "상관없어요", "모두 왕이 돼요"],
            answer: 0,
            imageIndex: 8
        },
        {
            lesson: "24과",
            question: "아담이 가져온 것은 무엇인가요?",
            options: ["죄와 죽음", "용서와 생명", "기쁨과 찬양"],
            answer: 0,
            imageIndex: 9
        },
        {
            lesson: "24과",
            question: "예수님 안에 있으면 무엇을 받을 수 있나요?",
            options: ["용서와 생명", "죄와 죽음", "혼자 힘"],
            answer: 0,
            imageIndex: 10
        },
        {
            lesson: "24과",
            question: "오늘 복습의 핵심은 누구에게 우리가 필요하다는 것인가요?",
            options: ["새 대표 예수님", "뱀", "아담의 힘"],
            answer: 0,
            imageIndex: 11
        }
    ]
];

const MIN_PLAYERS = 1;
const MAX_PLAYERS = 12;
const QUESTIONS_PER_SET = 12;

const state = {
    playerCount: 6,
    setIndex: 0,
    questionCount: 6,
    questions: [],
    solved: [],
    activeIndex: 0,
    locked: false
};

const els = {
    startScreen: document.getElementById("start-screen"),
    gameScreen: document.getElementById("game-screen"),
    finishScreen: document.getElementById("finish-screen"),
    startButton: document.getElementById("start-button"),
    againButton: document.getElementById("again-button"),
    resetButton: document.getElementById("reset-button"),
    playerMinus: document.getElementById("player-minus"),
    playerPlus: document.getElementById("player-plus"),
    playerCount: document.getElementById("player-count"),
    treasureGrid: document.getElementById("treasure-grid"),
    gemTray: document.getElementById("gem-tray"),
    gemCount: document.getElementById("gem-count"),
    gemTotal: document.getElementById("gem-total"),
    turnPill: document.getElementById("turn-pill"),
    roundTitle: document.getElementById("round-title"),
    guideText: document.getElementById("guide-text"),
    modal: document.getElementById("question-modal"),
    playerLabel: document.getElementById("player-label"),
    lessonLabel: document.getElementById("lesson-label"),
    questionVisual: document.getElementById("question-visual"),
    questionTitle: document.getElementById("question-title"),
    options: document.getElementById("options"),
    answerReveal: document.getElementById("answer-reveal"),
    answerThumb: document.getElementById("answer-thumb"),
    answerText: document.getElementById("answer-text"),
    feedback: document.getElementById("feedback")
};

function getImagePosition(imageIndex) {
    const col = imageIndex % 4;
    const row = Math.floor(imageIndex / 4);
    return `${col * 33.3333}% ${row * 50}%`;
}

function setIllustration(element, imageIndex) {
    element.style.backgroundPosition = getImagePosition(imageIndex);
}

function setPlayerCount(playerCount) {
    state.playerCount = Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, playerCount));
    state.questionCount = state.playerCount;
    renderStartOptions();
}

function renderStartOptions() {
    els.playerCount.textContent = String(state.playerCount);
    els.playerMinus.disabled = state.playerCount === MIN_PLAYERS;
    els.playerPlus.disabled = state.playerCount === MAX_PLAYERS;
}

function getCurrentSetLabel() {
    return `${state.setIndex + 1}세트`;
}

function startGame({ nextSet = false } = {}) {
    if (nextSet) {
        state.setIndex = (state.setIndex + 1) % QUESTION_SETS.length;
    }

    state.questionCount = state.playerCount;
    state.questions = QUESTION_SETS[state.setIndex].slice(0, state.questionCount);
    state.solved = Array.from({ length: state.questionCount }, () => false);
    state.activeIndex = 0;
    state.locked = false;

    els.gemTotal.textContent = String(state.questionCount);
    els.startScreen.classList.add("hidden");
    els.finishScreen.classList.add("hidden");
    els.gameScreen.classList.remove("hidden");
    els.modal.classList.add("hidden");

    renderGame();
}

function renderGame() {
    renderTreasureGrid();
    renderGemTray();
    updateProgressText();
}

function renderTreasureGrid() {
    els.treasureGrid.innerHTML = state.questions.map((_, index) => {
        const done = state.solved[index];
        const current = index === state.activeIndex && !done;
        return `
            <button class="treasure-tile ${done ? "done" : ""} ${current ? "current" : ""}" type="button" data-index="${index}" ${done ? "disabled" : ""}>
                <span class="tile-icon" aria-hidden="true"></span>
                <span class="tile-number">${index + 1}번 보물</span>
                <span class="tile-status">${done ? "보석 획득" : "열어보기"}</span>
            </button>
        `;
    }).join("");

    els.treasureGrid.querySelectorAll(".treasure-tile").forEach((tile) => {
        tile.addEventListener("click", () => openQuestion(Number(tile.dataset.index)));
    });
}

function renderGemTray() {
    const count = state.solved.filter(Boolean).length;
    els.gemCount.textContent = String(count);
    els.gemTray.innerHTML = state.solved.map((done) => (
        `<span class="gem ${done ? "" : "empty"}" aria-hidden="true"></span>`
    )).join("");
}

function updateProgressText() {
    const playerNumber = state.activeIndex + 1;

    els.turnPill.textContent = `${playerNumber}번 친구 차례`;
    els.roundTitle.textContent = `${playerNumber}번 친구가 보물을 열 차례예요`;
    els.guideText.textContent = `${getCurrentSetLabel()} 문제입니다. ${state.playerCount}명이 한 번씩 말씀 보석을 모아요.`;
}

function openQuestion(index) {
    if (state.locked || state.solved[index]) {
        return;
    }

    if (index !== state.activeIndex) {
        els.guideText.textContent = "차례대로 진행해 주세요. 반짝이는 보물칸이 지금 차례예요.";
        return;
    }

    const question = state.questions[index];
    const playerNumber = index + 1;

    els.playerLabel.textContent = `${playerNumber}번 친구`;
    els.lessonLabel.textContent = `${question.lesson} · ${getCurrentSetLabel()}`;
    els.questionTitle.textContent = question.question;
    els.feedback.textContent = "";
    els.answerReveal.classList.add("hidden");
    els.answerText.textContent = "";
    setIllustration(els.questionVisual, question.imageIndex);
    setIllustration(els.answerThumb, question.imageIndex);
    els.options.innerHTML = question.options.map((option, optionIndex) => (
        `<button class="option-button" type="button" data-option="${optionIndex}">${optionIndex + 1}. ${option}</button>`
    )).join("");

    els.options.querySelectorAll(".option-button").forEach((button) => {
        button.addEventListener("click", () => checkAnswer(index, Number(button.dataset.option)));
    });

    els.modal.classList.remove("hidden");
}

function checkAnswer(questionIndex, selectedIndex) {
    if (state.locked) {
        return;
    }

    const question = state.questions[questionIndex];
    const buttons = Array.from(els.options.querySelectorAll(".option-button"));
    const selectedButton = buttons[selectedIndex];

    if (selectedIndex !== question.answer) {
        selectedButton.classList.add("wrong");
        els.feedback.textContent = "다시 생각해보자!";
        window.setTimeout(() => {
            selectedButton.classList.remove("wrong");
            els.feedback.textContent = "괜찮아요. 한 번 더 눌러볼까요?";
        }, 720);
        return;
    }

    state.locked = true;
    selectedButton.classList.add("correct");
    els.answerText.textContent = `정답: ${question.options[question.answer]}`;
    els.answerReveal.classList.remove("hidden");
    els.feedback.textContent = "정답! 말씀 보석을 얻었어요.";

    window.setTimeout(() => {
        state.solved[questionIndex] = true;
        state.activeIndex += 1;
        state.locked = false;
        els.modal.classList.add("hidden");

        if (state.solved.every(Boolean)) {
            showFinish();
            return;
        }

        renderGame();
    }, 950);
}

function showFinish() {
    els.gameScreen.classList.add("hidden");
    els.finishScreen.classList.remove("hidden");
}

function resetToStart() {
    els.gameScreen.classList.add("hidden");
    els.finishScreen.classList.add("hidden");
    els.modal.classList.add("hidden");
    els.startScreen.classList.remove("hidden");
}

els.playerMinus.addEventListener("click", () => setPlayerCount(state.playerCount - 1));
els.playerPlus.addEventListener("click", () => setPlayerCount(state.playerCount + 1));
els.startButton.addEventListener("click", () => startGame());
els.againButton.addEventListener("click", () => startGame({ nextSet: true }));
els.resetButton.addEventListener("click", resetToStart);

renderStartOptions();
