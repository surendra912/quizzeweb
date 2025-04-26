const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Madrid"],
      answer: 2
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: 3
    },
    {
      question: "What does CSS stand for?",
      options: ["Central Style Sheet", "Cascading Style Sheet", "Computer Style Sheet", "Colorful Style Sheet"],
      answer: 1
    },
    {
      question: "What year was JavaScript launched?",
      options: ["1996", "1995", "1994", "None"],
      answer: 1
    },
    {
      question: "What does HTML stand for?",
      options: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink Text Markup Language", "None"],
      answer: 0
    }
  ];
  
  let currentQuestion = 0;
  let userAnswers = new Array(questions.length).fill(null);
  let timer = 60 * 60; // 1 hour in seconds
  let timerInterval;
  
  function startTimer() {
    timerInterval = setInterval(() => {
      let minutes = Math.floor(timer / 60);
      let seconds = timer % 60;
      document.getElementById("timer").innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      timer--;
  
      if (timer < 0) {
        clearInterval(timerInterval);
        submitQuiz();
      }
    }, 1000);
  }
  
  function loadQuestion() {
    const q = questions[currentQuestion];
    let html = `<h3>Q${currentQuestion + 1}: ${q.question}</h3>`;
    q.options.forEach((opt, i) => {
      const checked = userAnswers[currentQuestion] === i ? 'checked' : '';
      html += `
        <label>
          <input type="radio" name="option" value="${i}" ${checked} />
          ${opt}
        </label><br/>
      `;
    });
    document.getElementById("quiz-box").innerHTML = html;
  }
  
  function saveAnswer() {
    const radios = document.getElementsByName("option");
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        userAnswers[currentQuestion] = parseInt(radios[i].value);
        break;
      }
    }
  }
  
  function nextQuestion() {
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion();
    }
  }
  
  function prevQuestion() {
    saveAnswer();
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  }

  function restartQuiz() {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    timer = 60 * 60;
    clearInterval(timerInterval);
    document.getElementById("quiz-box").style.display = "block";
    document.querySelector(".navigation").style.display = "block";
    document.getElementById("result").innerHTML = "";
    startTimer();
    loadQuestion();
  }
  
  
  function submitQuiz() {
    clearInterval(timerInterval);
    saveAnswer();
  
    let incorrectAnswers = questions.map((q, i) => {
      if (userAnswers[i] !== q.answer) {
        return {
          question: q.question,
          selected: q.options[userAnswers[i]] || "Not answered",
          correct: q.options[q.answer]
        };
      }
    }).filter(Boolean);
  
    let resultHTML = `<h2>Incorrect Answers:</h2>`;
    incorrectAnswers.forEach((item, idx) => {
      resultHTML += `
        <p><strong>Q${idx + 1}: ${item.question}</strong><br/>
        Your Answer: ${item.selected}<br/>
        Correct Answer: ${item.correct}</p>
      `;
    });
  
    if (incorrectAnswers.length === 0) {
      resultHTML = "<h2>🎉 Great job! All answers correct!</h2>";
    }
  
    document.getElementById("quiz-box").style.display = "none";
    document.querySelector(".navigation").style.display = "none";
    document.getElementById("result").innerHTML = resultHTML;
  }
  
  window.onload = () => {
    loadQuestion();
    startTimer();
  };
  