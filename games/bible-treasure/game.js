const QUESTION_BANK = [
    {
        lesson: "22과",
        question: "하나님은 사람을 누구의 형상대로 만드셨나요?",
        options: ["동물", "하나님의 형상", "천사"],
        answer: 1
    },
    {
        lesson: "22과",
        question: "하나님의 형상은 무엇을 닮은 것인가요?",
        options: ["겉모습", "속마음과 성품", "힘"],
        answer: 1
    },
    {
        lesson: "22과",
        question: "처음 사람은 어떤 마음으로 하나님을 알 수 있었나요?",
        options: ["하나님을 아는 지식", "장난치는 마음", "숨는 마음"],
        answer: 0
    },
    {
        lesson: "22과",
        question: "하나님이 처음 사람에게 주신 아름다운 성품은 무엇인가요?",
        options: ["거짓과 미움", "의와 참된 거룩함", "무서움"],
        answer: 1
    },
    {
        lesson: "23과",
        question: "아담과 하와를 유혹한 것은 누구였나요?",
        options: ["뱀", "사자", "새"],
        answer: 0
    },
    {
        lesson: "23과",
        question: "아담과 하와는 누구의 말보다 뱀의 말을 믿었나요?",
        options: ["하나님의 말씀", "천사의 노래", "친구의 말"],
        answer: 0
    },
    {
        lesson: "23과",
        question: "죄가 들어오자 무엇이 깨졌나요?",
        options: ["하나님과의 관계", "운동장", "집"],
        answer: 0
    },
    {
        lesson: "23과",
        question: "죄 때문에 우리에게 꼭 필요한 분은 누구인가요?",
        options: ["구원자", "심부름꾼", "요리사"],
        answer: 0
    },
    {
        lesson: "24과",
        question: "아담은 누구의 대표였나요?",
        options: ["자기 혼자", "모든 사람", "동물들"],
        answer: 1
    },
    {
        lesson: "24과",
        question: "아담의 죄는 누구에게 영향을 주었나요?",
        options: ["아담 혼자", "모든 사람", "뱀만"],
        answer: 1
    },
    {
        lesson: "24과",
        question: "우리에게 필요한 새 대표는 누구인가요?",
        options: ["노아", "다윗", "예수님"],
        answer: 2
    },
    {
        lesson: "24과",
        question: "예수님은 우리에게 무엇을 주시나요?",
        options: ["용서와 생명", "죄와 죽음", "두려움"],
        answer: 0
    }
];

const PLAYER_COUNT = 6;

const state = {
    mode: 6,
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
    modeButtons: Array.from(document.querySelectorAll(".mode-card")),
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
    questionTitle: document.getElementById("question-title"),
    options: document.getElementById("options"),
    feedback: document.getElementById("feedback")
};

function setMode(mode) {
    state.mode = mode;
    els.modeButtons.forEach((button) => {
        button.classList.toggle("selected", Number(button.dataset.mode) === mode);
    });
}

function startGame() {
    state.questions = QUESTION_BANK.slice(0, state.mode);
    state.solved = Array.from({ length: state.mode }, () => false);
    state.activeIndex = 0;
    state.locked = false;

    els.gemTotal.textContent = String(state.mode);
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
    const playerNumber = (state.activeIndex % PLAYER_COUNT) + 1;
    const roundNumber = Math.floor(state.activeIndex / PLAYER_COUNT) + 1;
    const roundSuffix = state.mode > PLAYER_COUNT ? ` · ${roundNumber}번째 바퀴` : "";

    els.turnPill.textContent = `${playerNumber}번 친구 차례${roundSuffix}`;
    els.roundTitle.textContent = `${playerNumber}번 친구가 보물을 열 차례예요`;
    els.guideText.textContent = state.mode > PLAYER_COUNT
        ? "12문제 모드는 한 명씩 두 번 돌아가며 말씀 보석을 모아요."
        : "한 명씩 차례대로 보물칸을 눌러 말씀 보석을 모아요.";
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
    const playerNumber = (index % PLAYER_COUNT) + 1;

    els.playerLabel.textContent = `${playerNumber}번 친구`;
    els.lessonLabel.textContent = question.lesson;
    els.questionTitle.textContent = question.question;
    els.feedback.textContent = "";
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

els.modeButtons.forEach((button) => {
    button.addEventListener("click", () => setMode(Number(button.dataset.mode)));
});

els.startButton.addEventListener("click", startGame);
els.againButton.addEventListener("click", startGame);
els.resetButton.addEventListener("click", resetToStart);

setMode(6);
