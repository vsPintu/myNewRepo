var startBtn = document.querySelector(".start-btn");
var popupInfo = document.querySelector(".popup-info");
var exitBtn = document.querySelector(".exit-btn");
var main = document.querySelector(".main");
var continueBtn = document.querySelector(".continue-btn");
var quizSection = document.querySelector(".quiz-section");
var quizBox = document.querySelector(".quiz-box");
var resultBox = document.querySelector(".result-box");
var tryAgain = document.querySelector(".tryAgain-btn");
var goHomeBtn = document.querySelector(".goHome-btn");

startBtn.onclick = () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
};
exitBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};
continueBtn.onclick = () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");
  showQuestion(0);
  questionCounter(1);
  headerScore();
};

tryAgain.onclick = () => {
  quizBox.classList.add("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;

  showQuestion(questionCount);
  questionCounter(questionNumb);

  headerScore();
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");
  
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
  
    showQuestion(questionCount);
    questionCounter(questionNumb);
  
    headerScore();
  };

var questionCount = 0;
var questionNumb = 1;
var userScore = 0;
var nextBtn = document.querySelector(".next-btn");

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestion(questionCount);

    questionNumb++;
    questionCounter(questionNumb);

    nextBtn.classList.remove("active");
  } else {
    showResultBox();
  }
};

const optionList = document.querySelector(".option-list");
//getting questions and options from array
function showQuestion(index) {
  const questionText = document.querySelector(".question-text");
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  let optionTag = `<div class="option"><span>${questions[index].option[0]}</span></div>
    <div class="option"><span>${questions[index].option[1]}</span></div>
    <div class="option"><span>${questions[index].option[2]}</span></div>
    <div class="option"><span>${questions[index].option[3]}</span></div>`;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOption = optionList.children.length;

  if (userAnswer == correctAnswer) {
    answer.classList.add("correct");
    userScore += 1;
    headerScore();
  } else {
    answer.classList.add("incorrect");

    // if answer incorrect, auto selected correct answer

    for (let i = 0; i < allOption; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }

  // if user has selected, disable all options
  for (let i = 0; i < allOption; i++) {
    optionList.children[i].classList.add("disabled");
  }

  nextBtn.classList.add("active");
}

function questionCounter(index) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index} of ${questions.length} Question`;
}

function headerScore() {
  let headerScoreText = document.querySelector(".header-score");
  headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");
  let progressStartValue = -1;
  let progressEndtValue = (userScore / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;

    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#c40094 ${
      progressStartValue * 3.6
    }deg, rgba(255, 255,255, .1) 0deg)`;
    if (progressStartValue == progressEndtValue) {
      clearInterval(progress);
    }
  }, speed);
}
