const questions = [
  {
    q: "🌐 Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    q: "🎨 What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Computer Style System",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    q: "📄 Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    answer: "<h1>",
  },
  {
    q: "🧠 What is the correct syntax to link CSS?",
    options: [
      "<css src='style.css'>",
      "<link rel='stylesheet' href='style.css'>",
      "<style src='style.css'>",
    ],
    answer: "<link rel='stylesheet' href='style.css'>",
  },
  {
    q: "⚙️ Which company developed JavaScript?",
    options: ["Netscape", "Microsoft", "Google", "Apple"],
    answer: "Netscape",
  },
  {
    q: "💡 What does 'DOM' stand for in web development?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Document Oriented Model",
    ],
    answer: "Document Object Model",
  },
  {
    q: "🌟 What is the default display property of a <div> element?",
    options: ["inline", "block", "inline-block", "none"],
    answer: "block",
  },
  {
    q: "🔧 Which CSS property controls the text size?",
    options: ["font-weight", "font-size", "text-size", "font-style"],
    answer: "font-size",
  },
  {
    q: "📊 Which HTML attribute is used to define inline styles?",
    options: ["class", "style", "font", "styles"],
    answer: "style",
  },
  {
    q: "⚡ Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//",
  },
];

let current = 0;
let score = 0;

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.q;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(btn, opt);
    optionsDiv.appendChild(btn);
  });

  updateProgress();
  document.getElementById("score").innerText = `Score: ${score}`;
}

function checkAnswer(button, selected) {
  const correct = questions[current].answer;
  const all = document.querySelectorAll("#options button");

  all.forEach((btn) => (btn.disabled = true));

  if (selected === correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
    all.forEach((btn) => {
      if (btn.innerText === correct) btn.classList.add("correct");
    });
  }

  document.getElementById("score").innerText = `Score: ${score}`;
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    document.querySelector(".quiz-box").innerHTML = `
      <h2 style="text-align:center;">🎉 Quiz Completed</h2>
      <p style="text-align:center; font-size: 1.5em;">Your Score: ${score} / ${questions.length}</p>
      <button onclick="restartQuiz()" class="next-btn">Restart Quiz 🔄</button>
    `;
    document.getElementById("progress-fill").style.width = "100%";
  }
}

function updateProgress() {
  const progress = (current / questions.length) * 100;
  document.getElementById("progress-fill").style.width = `${progress}%`;
}

function restartQuiz() {
  current = 0;
  score = 0;
  document.querySelector(".quiz-box").innerHTML = `
    <div id="question" class="question"></div>
    <div id="options" class="options"></div>
    <button onclick="nextQuestion()" class="next-btn">Next ➡️</button>
    <div class="progress-bar">
      <div id="progress-fill" class="progress-fill"></div>
    </div>
    <p id="score" class="score-text">Score: 0</p>
  `;
  loadQuestion();
}

loadQuestion();

const coderAdvices = [
  "Write code as if the person who ends up maintaining it is a violent psychopath who knows where you live.",
  "Debugging is like being the detective in a crime movie where you are also the murderer.",
  "Focus on writing clean, readable code over clever, complicated solutions.",
  "Commit early, commit often — save your progress and your sanity.",
  "Don’t fear failure, fear wasting time on code that doesn’t work.",
  "Optimize later, make it work first.",
  "Keep learning; technology evolves faster than your last commit.",
  "Break problems into smaller chunks — big problems are just small problems waiting to be solved.",
  "Test your code like your app depends on it — because it does.",
  "Read docs more than Stack Overflow; understand concepts, not just fixes.",
  "Your code tells a story — make it worth reading.",
  "Automation is your friend — automate repetitive tasks to save time.",
  "Code reviews aren’t criticisms; they’re opportunities to improve.",
  "Take breaks — fresh eyes find bugs faster.",
  "Remember, every expert was once a beginner who didn’t quit.",
  "Write comments that explain ‘why,’ not ‘what.’",
  "Version control is like insurance — don’t skip it.",
  "Pair programming can double your learning rate.",
  "Stay curious — the best coders are eternal students.",
  "Keep calm and Git push.",
];

const adviceText = document.getElementById("advice-text");
const adviceBtn = document.getElementById("new-advice-btn");

function showRandomAdvice() {
  const index = Math.floor(Math.random() * coderAdvices.length);
  adviceText.innerHTML = `💻✨ <em>"${coderAdvices[index]}"</em>`;
}

adviceBtn.addEventListener("click", showRandomAdvice);
showRandomAdvice();