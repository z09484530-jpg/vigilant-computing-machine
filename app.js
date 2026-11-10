const questions = [
  {
    text: "Жумуш берүүчү: «___ жыйыны саат 18:00дө өтөт» деп билдирүү жөнөттү. Кайсы жазылышы туура?",
    choices: ["ата-энелер", "ата энелер", "атаэнелер"],
    answer: 0,
    explanation: "Жупташкан кош сөз дефис менен жазылат: ата-эне."
  },
  {
    text: "Жетекчи кызматкерден отчетту ___ текшерүүнү өтүндү.",
    choices: ["кайра кайра", "кайра-кайра", "кайракайра"],
    answer: 1,
    explanation: "Кайталанма кош сөз дефис менен жазылат: кайра-кайра."
  },
  {
    text: "Кеңсе башчысы: «___ бюджеттин долбоорун бүгүн талкуулайбыз» деп жазды.",
    choices: ["Быйыл", "Бый жыл", "Бый-жыл"],
    answer: 0,
    explanation: "Быйыл — бириккен сөз, бирге жазылат."
  },
  {
    text: "Кызматкердин колу ___ болуп, документтин кызыл сыясы жайылып кетти.",
    choices: ["кып кызыл", "кып-кызыл", "кыпкызыл"],
    answer: 2,
    explanation: "Күчөтмө утурма сөз бирге жазылат: кыпкызыл."
  },
  {
    text: "Диспетчер бейтапты ___ бөлүмүнө жеткирүүнү суранды.",
    choices: ["тезжардам", "тез-жардам", "тез жардам"],
    answer: 2,
    explanation: "Кошмок сөз бөлөк жазылат: тез жардам."
  },
  {
    text: "Жарыяда: «___ бекетиндеги оңдоо иштери 20:00дө бүтөт» деп көрсөтүлгөн.",
    choices: ["темир жол", "темир-жол", "темиржол"],
    answer: 0,
    explanation: "Темир жол — бөлөк жазылган кошмок сөз."
  },
  {
    text: "Келишимге кол коюу мөөнөтү ___ жумуш күнү деп белгиленди.",
    choices: ["онбеш", "он-беш", "он беш"],
    answer: 2,
    explanation: "Эки сөздөн турган сан атооч бөлөк жазылат: он беш."
  },
  {
    text: "Билдирүүдө көздү коргоочу буюмдун аталышын туура жазыңыз.",
    choices: ["көз айнек", "көз-айнек", "көзайнек"],
    answer: 0,
    explanation: "Көз айнек — эки бөлүгү тең өз алдынча маанисин сактаган кошмок сөз."
  },
  {
    text: "Иш сапардын чыгымдарында кайсы жазылышы туура?",
    choices: ["кара нан", "каранан", "кара-нан"],
    answer: 0,
    explanation: "Кара нан — бөлөк жазылат."
  },
  {
    text: "Расмий отчетто Бириккен Улуттар Уюмунун кыскартмасы кандай жазылат?",
    choices: ["Б.У.У.", "БУУ", "Буу"],
    answer: 1,
    explanation: "Бул аталыштын кыскартмасы баш тамгалар менен жазылат: БУУ."
  },
  {
    text: "Арызда өлкөнүн аталышы кыскартылып берилген. Кайсы вариант туура?",
    choices: ["Кыргыз Республикасы (КР)", "Кыргыз Республикасы (К.Р.)", "Кыргыз Республикасы (кр)"],
    answer: 0,
    explanation: "Кыскартма баш тамгалар менен жазылат: КР."
  },
  {
    text: "Кеңседеги ашкананын жаңылануусу тууралуу сүйлөмдү толуктаңыз: «___ оңдолуп бүттү».",
    choices: ["Ашкана", "Аш кана", "Аш-кана"],
    answer: 0,
    explanation: "Ашкана — бириккен сөз, бирге жазылат."
  }
];

const form = document.querySelector("#quiz-form");
const result = document.querySelector("#quiz-result");

form.innerHTML = questions.map(({ text, choices }, i) =>
  `<fieldset class="question"><legend><span class="question-number">${String(i + 1).padStart(2, "0")}</span>${text}</legend>${choices.map((choice, j) =>
    `<label><input type="radio" name="q${i}" value="${j}"><span>${choice}</span></label>`
  ).join("")}<small hidden></small></fieldset>`
).join("") + '<button class="button" type="submit">Жоопторду текшерүү <span aria-hidden="true">→</span></button>';

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const missing = questions.findIndex((_, i) => !form.querySelector(`[name="q${i}"]:checked`));
  if (missing !== -1) {
    result.textContent = `${missing + 1}-суроого жооп тандаңыз.`;
    form.querySelector(`[name="q${missing}"]`).focus();
    return;
  }

  let score = 0;
  questions.forEach(({ answer, explanation }, i) => {
    const question = form.querySelectorAll(".question")[i];
    const correct = Number(question.querySelector(":checked").value) === answer;
    score += Number(correct);
    question.classList.toggle("correct", correct);
    question.classList.toggle("wrong", !correct);
    const feedback = question.querySelector("small");
    feedback.hidden = false;
    feedback.textContent = correct ? "Туура." : `Түшүндүрмө: ${explanation}`;
  });
  result.textContent = `Жыйынтык: ${score}/${questions.length}. ${score === questions.length ? "Мыкты жыйынтык!" : "Түшүндүрмөлөрдү карап, кайра текшерип көрүңүз."}`;
  result.scrollIntoView({ behavior: "smooth", block: "center" });
});
