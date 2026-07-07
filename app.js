const initialState = {
  turn: 0,
  sales: 18,
  happy: 70,
  stock: 70,
  review: 3.5,
  streak: 0,
  logs: [],
};

const events = [
  {
    time: "오전 10:30",
    tag: "오픈 준비",
    title: "점심 전에 무엇부터 챙길까요?",
    story: "임사부 식당 문을 열기 전입니다. 오늘 첫 인상이 하루 흐름을 좌우합니다.",
    choices: [
      {
        label: "대표 메뉴를 20인분 미리 준비",
        hint: "피크타임 속도는 빨라지지만 남으면 재고가 부담됩니다.",
        effect: { sales: 7, happy: 6, stock: -16, review: 0.1 },
        log: "대표 메뉴를 미리 준비해 점심 회전율을 올렸습니다.",
      },
      {
        label: "냉장고와 원산지 표시부터 점검",
        hint: "바로 돈은 안 되지만 신뢰도가 올라갑니다.",
        effect: { sales: 2, happy: 7, stock: 2, review: 0.2 },
        log: "위생과 표시를 정리해 손님 응대가 안정됐습니다.",
      },
      {
        label: "SNS에 오늘의 메뉴 사진 올리기",
        hint: "방문 기대감이 오르지만 준비 시간은 빠듯합니다.",
        effect: { sales: 9, happy: 1, stock: -6, review: 0 },
        log: "오늘의 메뉴 사진이 근처 손님들의 발길을 끌었습니다.",
      },
    ],
  },
  {
    time: "오후 12:10",
    tag: "점심 러시",
    title: "주문이 한꺼번에 밀려옵니다",
    story: "홀 손님과 포장 주문이 동시에 들어왔습니다. 주방 동선을 빨리 정해야 합니다.",
    choices: [
      {
        label: "점심 세트 메뉴만 빠르게 판매",
        hint: "매출과 속도는 좋지만 선택지는 줄어듭니다.",
        effect: { sales: 14, happy: 3, stock: -12, review: 0 },
        log: "세트 메뉴로 주문을 단순화해 긴 줄을 줄였습니다.",
      },
      {
        label: "주문 순서대로 천천히 정확하게 조리",
        hint: "실수는 줄지만 대기 손님이 생깁니다.",
        effect: { sales: 8, happy: 7, stock: -8, review: 0.1 },
        log: "속도보다 정확도를 택해 음식 품질을 지켰습니다.",
      },
      {
        label: "배달 주문을 잠시 닫기",
        hint: "홀 만족도는 오르지만 매출 기회가 줄어듭니다.",
        effect: { sales: 4, happy: 9, stock: -4, review: 0.15 },
        log: "배달 주문을 잠시 멈추고 홀 손님에게 집중했습니다.",
      },
    ],
  },
  {
    time: "오후 1:40",
    tag: "재료 관리",
    title: "인기 반찬 재료가 애매하게 남았습니다",
    story: "버리기엔 아깝고, 그냥 팔기엔 신선도가 걱정됩니다.",
    choices: [
      {
        label: "반값 추가 반찬으로 소진",
        hint: "재고 손실을 줄이고 객단가도 조금 올라갑니다.",
        effect: { sales: 8, happy: 4, stock: -10, review: 0.05 },
        log: "남은 재료를 추가 반찬으로 기분 좋게 소진했습니다.",
      },
      {
        label: "상태 좋은 것만 선별하고 나머지는 폐기",
        hint: "손실은 있지만 품질 불안을 줄입니다.",
        effect: { sales: -1, happy: 6, stock: -14, review: 0.15 },
        log: "품질 기준을 지키기 위해 애매한 재료를 과감히 정리했습니다.",
      },
      {
        label: "저녁 한정 사이드로 재구성",
        hint: "아이디어가 통하면 매출이 크게 오릅니다.",
        effect: { sales: 11, happy: 2, stock: -9, review: 0 },
        log: "남은 재료를 저녁 한정 사이드 메뉴로 바꿨습니다.",
      },
    ],
  },
  {
    time: "오후 3:20",
    tag: "직원 운영",
    title: "직원이 피곤해 보입니다",
    story: "임사부 혼자 버티기엔 저녁 장사가 걱정됩니다.",
    choices: [
      {
        label: "30분 휴식 후 저녁 준비",
        hint: "잠깐 느려져도 이후 응대가 좋아집니다.",
        effect: { sales: -2, happy: 8, stock: 0, review: 0.1 },
        log: "짧은 휴식으로 저녁 장사 전 팀 분위기를 회복했습니다.",
      },
      {
        label: "임사부가 홀과 주방을 직접 뛰기",
        hint: "비용은 아끼지만 실수가 늘 수 있습니다.",
        effect: { sales: 7, happy: -4, stock: -4, review: -0.05 },
        log: "임사부가 직접 뛰어 빈틈을 메웠지만 체력이 빠졌습니다.",
      },
      {
        label: "저녁 파트타이머를 추가 호출",
        hint: "비용은 들지만 저녁 피크 대응력이 좋아집니다.",
        effect: { sales: 5, happy: 7, stock: -2, review: 0.1 },
        log: "파트타이머를 불러 저녁 피크를 대비했습니다.",
      },
    ],
  },
  {
    time: "오후 5:50",
    tag: "날씨 변수",
    title: "갑자기 비가 내리기 시작합니다",
    story: "홀 방문은 줄 수 있지만 따뜻한 메뉴와 배달 주문은 기회가 됩니다.",
    choices: [
      {
        label: "국물 메뉴를 전면에 걸기",
        hint: "날씨와 잘 맞으면 주문 전환이 좋아집니다.",
        effect: { sales: 13, happy: 6, stock: -11, review: 0.1 },
        log: "비 오는 날에 맞춰 국물 메뉴를 앞세웠습니다.",
      },
      {
        label: "배달 최소 주문 금액 낮추기",
        hint: "주문 수는 늘지만 마진은 조금 얇아집니다.",
        effect: { sales: 10, happy: 3, stock: -10, review: 0 },
        log: "배달 문턱을 낮춰 비 오는 날 주문을 잡았습니다.",
      },
      {
        label: "우산꽂이와 바닥 안전부터 챙기기",
        hint: "매출보다 안전과 편안함을 우선합니다.",
        effect: { sales: 2, happy: 8, stock: 0, review: 0.15 },
        log: "매장을 정리해 빗길 손님들이 편하게 머물렀습니다.",
      },
    ],
  },
  {
    time: "오후 7:20",
    tag: "리뷰 대응",
    title: "배달앱에 낮은 별점 리뷰가 올라왔습니다",
    story: "내용을 보니 배달 지연과 국물 샘을 함께 지적했습니다.",
    choices: [
      {
        label: "정중히 사과하고 재발 방지 약속",
        hint: "당장 매출보다 신뢰 회복에 좋습니다.",
        effect: { sales: 1, happy: 6, stock: 0, review: 0.25 },
        log: "낮은 별점 리뷰에 차분히 사과하고 개선책을 남겼습니다.",
      },
      {
        label: "다음 주문 쿠폰을 제공",
        hint: "재주문 가능성은 오르지만 비용이 듭니다.",
        effect: { sales: 4, happy: 5, stock: -2, review: 0.18 },
        log: "쿠폰 보상으로 불만 고객의 재주문 가능성을 살렸습니다.",
      },
      {
        label: "포장 용기를 바로 교체",
        hint: "비용은 들지만 같은 문제가 줄어듭니다.",
        effect: { sales: -1, happy: 8, stock: -3, review: 0.28 },
        log: "국물 메뉴 포장 용기를 바꿔 배달 품질을 개선했습니다.",
      },
    ],
  },
  {
    time: "오후 8:30",
    tag: "단골 손님",
    title: "단골 손님이 단체 예약을 문의합니다",
    story: "내일 저녁 8명 예약입니다. 오늘 안에 답을 줘야 합니다.",
    choices: [
      {
        label: "단체 전용 코스 메뉴 제안",
        hint: "준비는 필요하지만 객단가가 좋아집니다.",
        effect: { sales: 12, happy: 5, stock: -5, review: 0.1 },
        log: "단체 전용 코스를 제안해 내일 예약 가능성을 높였습니다.",
      },
      {
        label: "평소 메뉴 그대로 받기",
        hint: "운영 부담은 낮지만 특별함은 덜합니다.",
        effect: { sales: 7, happy: 3, stock: -2, review: 0.05 },
        log: "평소 메뉴 중심으로 무리 없이 예약을 받았습니다.",
      },
      {
        label: "시간을 나눠 방문해달라고 요청",
        hint: "혼잡은 줄지만 예약 매력은 낮아집니다.",
        effect: { sales: 2, happy: -1, stock: 0, review: 0 },
        log: "주방 부담을 고려해 방문 시간을 나눠 달라고 안내했습니다.",
      },
    ],
  },
  {
    time: "오후 9:40",
    tag: "마감 선택",
    title: "마감 20분 전, 마지막 손님들이 들어옵니다",
    story: "임사부는 오늘의 마지막 선택을 해야 합니다.",
    choices: [
      {
        label: "마감 메뉴만 빠르게 받기",
        hint: "끝까지 매출을 챙기되 주방 부담을 낮춥니다.",
        effect: { sales: 9, happy: 2, stock: -6, review: 0.05 },
        log: "마감 메뉴만 받아 마지막 매출을 안정적으로 챙겼습니다.",
      },
      {
        label: "정상 주문을 모두 받기",
        hint: "매출은 좋지만 직원 피로와 실수 위험이 있습니다.",
        effect: { sales: 15, happy: -5, stock: -12, review: -0.08 },
        log: "마지막까지 정상 주문을 받아 매출을 크게 올렸습니다.",
      },
      {
        label: "따뜻하게 안내하고 내일 쿠폰 제공",
        hint: "오늘 매출은 줄어도 다음 방문을 기대할 수 있습니다.",
        effect: { sales: 1, happy: 8, stock: 0, review: 0.18 },
        log: "마감 시간을 정중히 안내하고 다음 방문 쿠폰을 전했습니다.",
      },
    ],
  },
];

let state = { ...initialState };

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const choicesEl = document.getElementById("choices");
const logList = document.getElementById("logList");
const howDialog = document.getElementById("howDialog");

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function formatSales(value) {
  return `${Math.max(0, Math.round(value))}만원`;
}

function updateStats() {
  document.getElementById("salesText").textContent = formatSales(state.sales);
  document.getElementById("happyText").textContent = Math.round(state.happy);
  document.getElementById("stockText").textContent = Math.round(state.stock);
  document.getElementById("reviewText").textContent = state.review.toFixed(1);
  document.getElementById("comboText").textContent = getMoodText();
}

function getMoodText() {
  if (state.happy >= 88 && state.review >= 4.4) return "입소문 상승 중";
  if (state.sales >= 95) return "매출 질주";
  if (state.stock <= 22) return "재고 빠듯";
  if (state.happy <= 48) return "응대 주의";
  return "차분한 운영";
}

function renderEvent() {
  const event = events[state.turn];
  if (!event) {
    showResult();
    return;
  }

  document.getElementById("turnText").textContent = `${state.turn + 1} / ${events.length}`;
  document.getElementById("timeText").textContent = event.time;
  document.getElementById("tagText").textContent = event.tag;
  document.getElementById("eventTitle").textContent = event.title;
  document.getElementById("eventStory").textContent = event.story;

  choicesEl.innerHTML = event.choices
    .map(
      (choice, index) => `
        <button class="choice-button" type="button" data-choice="${index}">
          <strong>${choice.label}</strong>
          <span>${choice.hint}</span>
        </button>
      `,
    )
    .join("");
}

function renderLogs() {
  const visibleLogs = state.logs.slice(-4).reverse();
  logList.innerHTML = visibleLogs.map((log) => `<li>${log}</li>`).join("");
}

function applyChoice(choice) {
  state.sales = clamp(state.sales + choice.effect.sales, 0, 160);
  state.happy = clamp(state.happy + choice.effect.happy, 0, 100);
  state.stock = clamp(state.stock + choice.effect.stock, 0, 100);
  state.review = clamp(state.review + choice.effect.review, 1, 5);
  state.logs.push(choice.log);
  state.turn += 1;

  updateStats();
  renderLogs();
  renderEvent();
}

function startGame() {
  state = {
    ...initialState,
    logs: ["임사부가 앞치마를 매고 오늘 영업을 시작했습니다."],
  };
  startScreen.hidden = true;
  resultScreen.hidden = true;
  gameScreen.hidden = false;
  updateStats();
  renderLogs();
  renderEvent();
}

function showResult() {
  gameScreen.hidden = true;
  resultScreen.hidden = false;

  const score = Math.round(
    state.sales * 0.42 + state.happy * 0.28 + state.stock * 0.12 + state.review * 20 * 0.18,
  );
  const grade = score >= 88 ? "S" : score >= 76 ? "A" : score >= 64 ? "B" : score >= 52 ? "C" : "D";
  const title = {
    S: "임사부, 동네 맛집 등극!",
    A: "임사부 식당, 오늘 장사 성공",
    B: "괜찮은 하루였습니다",
    C: "내일은 운영 점검이 필요해요",
    D: "임사부의 재정비 데이",
  }[grade];
  const summary =
    score >= 76
      ? "손님 흐름과 품질 사이의 균형이 좋았습니다. 이 감각이면 내일 예약과 리뷰도 기대할 만합니다."
      : "몇 번의 선택이 매출이나 만족도를 흔들었습니다. 가격, 재고, 응대 중 하나를 더 선명하게 잡아보세요.";

  document.getElementById("resultMark").textContent = grade;
  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultSummary").textContent = summary;
  document.getElementById("finalSales").textContent = formatSales(state.sales);
  document.getElementById("finalHappy").textContent = Math.round(state.happy);
  document.getElementById("finalStock").textContent = Math.round(state.stock);
  document.getElementById("finalReview").textContent = state.review.toFixed(1);
  document.getElementById("finalTip").textContent = getFinalTip();
}

function getFinalTip() {
  if (state.stock < 25) return "오늘은 재고 소진이 빠른 편입니다. 내일은 피크타임 전 준비량을 조금 더 촘촘히 잡아보세요.";
  if (state.happy < 55) return "매출보다 응대 품질이 흔들렸습니다. 주문 수를 잠깐 줄이는 선택도 장기적으로는 힘이 됩니다.";
  if (state.review < 3.8) return "리뷰는 작은 불편에서 크게 흔들립니다. 포장, 대기, 사과 문구를 먼저 정리해보세요.";
  if (state.sales < 70) return "만족도는 괜찮지만 매출이 아쉽습니다. 날씨나 시간대에 맞는 대표 메뉴 노출을 늘려보세요.";
  return "오늘의 균형이 좋습니다. 잘 팔린 선택을 내일의 기본 운영 규칙으로 남겨두세요.";
}

choicesEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-choice]");
  if (!button) return;

  const currentEvent = events[state.turn];
  const choice = currentEvent.choices[Number(button.dataset.choice)];
  applyChoice(choice);
});

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("restartBtn").addEventListener("click", startGame);
document.getElementById("playAgainBtn").addEventListener("click", startGame);

document.getElementById("howBtn").addEventListener("click", () => {
  if (typeof howDialog.showModal === "function") {
    howDialog.showModal();
  }
});

document.getElementById("closeHowBtn").addEventListener("click", () => {
  howDialog.close();
});
