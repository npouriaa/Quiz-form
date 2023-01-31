//Variables
const lineW = document.querySelector(".line"),
  qNums = document.querySelectorAll(".qNum"),
  question_text = document.querySelector(".question-text"),
  answers = document.querySelectorAll(".answer"),
  previous = document.querySelector(".previous"),
  next = document.querySelector(".next"),
  mark = document.querySelector(".mark"),
  message = document.querySelector(".message"),
  msgText = document.querySelector(".msgText span"),
  qBox = document.querySelector(".qBox");
let qIndex = 0;
let chI = qIndex;

//Arrays
const checkedAnswer = [
  {
    answer: "",
  },
  {
    answer: "",
  },
  {
    answer: "",
  },
  {
    answer: "",
  },
  {
    answer: "",
  },
  {
    answer: "",
  },
  {
    answer: "",
  },
];

const Q_A = [
  {
    questionText: "How many percent of earth contains water?",
    option1: "71%",
    option2: "90%",
    option3: "50%",
    option4: "10%",
    mainAnswer: "71%",
  },
  {
    questionText: "How many planet exist in solar system?",
    option1: "10",
    option2: "8",
    option3: "20",
    option4: "5",
    mainAnswer: "8",
  },
  {
    questionText: "Wichone is not a programming language?",
    option1: "C#",
    option2: "JS",
    option3: "HTML",
    option4: "C++",
    mainAnswer: "HTML",
  },
  {
    questionText: "What is the capital of Italy?",
    option1: "Rome",
    option2: "Torin",
    option3: "Venice",
    option4: "Milan",
    mainAnswer: "Rome",
  },
  {
    questionText: "When is the Wolrd War || start date?",
    option1: "September 1, 1929",
    option2: "September 10, 1939",
    option3: "August 25, 1910",
    option4: "September 1, 1939",
    mainAnswer: "September 1, 1939",
  },
  {
    questionText: "Wich one of the movies is about space?",
    option1: "Forrest Gump",
    option2: "Inception",
    option3: "Interstellar",
    option4: "About Time",
    mainAnswer: "Interstellar",
  },
  {
    questionText: "Who is the founder of Tesla?",
    option1: "Mark Zuckerberg",
    option2: "Jeff Bezos",
    option3: "Steve Jobs",
    option4: "Elon Musk",
    mainAnswer: "Elon Musk",
  },
];

//EventListeners
qBox.addEventListener("click", function (e) {
  if (e.target.classList.contains("btnRefresh")) {
    location.reload();
  }
});
next.addEventListener("click", nextQ);
previous.addEventListener("click", prevQ);
document.addEventListener("DOMContentLoaded", loadQ(0));
answers.forEach((i) => {
  i.addEventListener("click", function (e) {
    i.style.backgroundColor = "#fff";
    i.style.color = "#796AFA";
    e.target.classList.add("checked");

    if (qIndex == 0) {
      checkedAnswer[0].answer = e.target.textContent;
    }
    if (qIndex == 1) {
      checkedAnswer[1].answer = e.target.textContent;
    }
    if (qIndex == 2) {
      checkedAnswer[2].answer = e.target.textContent;
    }

    if (qIndex == 3) {
      checkedAnswer[3].answer = e.target.textContent;
    }
    if (qIndex == 4) {
      checkedAnswer[4].answer = e.target.textContent;
    }
    if (qIndex == 5) {
      checkedAnswer[5].answer = e.target.textContent;
    }
    if (qIndex == 6) {
      checkedAnswer[6].answer = e.target.textContent;
    }
  });
  i.addEventListener("blur", function (e) {
    i.style.backgroundColor = "#796AFA";
    i.style.color = "#fff";
  });
});

//Functions
function nextQ(e) {
  let not_answered = [];
  if (!e.target.classList.contains("submit")) {
    lineW.style.width = `${+lineW.style.width.slice(0, -2) + 80}px`;
    qIndex++;
    if (qIndex > Q_A.length - 1) qIndex = 0;
    loadQ(qIndex);
  } else {
    checkedAnswer.map((i, index) => {
      if (i.answer == "") {
        not_answered.push(index + 1);
        qNums[index].style.backgroundColor = "red";
      }else{
        qNums[index].style.backgroundColor = "#796AFA";
      }
    });
    if (not_answered.length != 0) {
      message.style.height = "50px";
      msgText.innerHTML = not_answered.length;
    } else {
      let trueAnswers = [];
      for (let i = 0; i < Q_A.length; i++) {
        if (checkedAnswer[i].answer == Q_A[i].mainAnswer) {
          trueAnswers.push(checkedAnswer[i]);
        }
      }
      qBox.innerHTML = `
      <div class="score">
        <h1 class="score-text">Your score is <span>${trueAnswers.length}</span>/7</h1>
        <button class="btnRefresh">
          play again?
            <span class="material-symbols-outlined">
              replay
            </span>
        </button>
      </div>
      `;
    }
  }
  if (qIndex == 6) {
    next.innerHTML = "Submit";
    next.classList.add("submit");
  } else {
    next.disabled = false;
    next.innerHTML = "Next";
    next.classList.remove("submit");
  }
}

function prevQ() {
  lineW.style.width = `${+lineW.style.width.slice(0, -2) - 80}px`;
  qIndex--;
  if (qIndex < 0) qIndex = Q_A.length - 1;
  loadQ(qIndex);
  next.innerHTML = "Next";
  next.classList.remove("submit");
}

function loadQ(index) {
  if (index == 0) {
    previous.disabled = true;
  } else {
    previous.disabled = false;
  }

  question_text.innerHTML = `${Q_A[index].questionText}`;
  answers[0].innerHTML = `${Q_A[index].option1}`;
  answers[1].innerHTML = `${Q_A[index].option2}`;
  answers[2].innerHTML = `${Q_A[index].option3}`;
  answers[3].innerHTML = `${Q_A[index].option4}`;
  chosenAnswer(answers);
}

function chosenAnswer(array) {
  array.forEach((i) => {
    i.style.backgroundColor = "#796AFA";
    i.style.color = "#fff";
  });
  for (let element = 0; element < array.length; element++) {
    if (array[element].textContent == checkedAnswer[qIndex].answer) {
      array[element].style.backgroundColor = "#fff";
      array[element].style.color = "#796AFA";
      array.forEach((i) => {
        i.addEventListener("click", () => {
          if (array[element].textContent != checkedAnswer[qIndex].answer) {
            array[element].style.backgroundColor = "#796AFA";
            array[element].style.color = "#fff";
          }
        });
      });
    }
  }
}
