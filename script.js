/*
create variables for start button
and questions
and answers
timer starts when "start button' is pushed
questions appear
when answered, another question appears
when incorrect time is subtracted from clock
when all questions are answered OR clock = 0, game is over
save intials and score using local storage
*/

var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var countdownElement = document.getElementById('countdown')

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

startButton.addEventListener('click', startTimer)
function startTimer(){
  var secondsRemaining = 60
  var timerInterval = setInterval(function(){
       secondsRemaining-- 
          countdownElement.textContent = secondsRemaining
      if (secondsRemaining === 0){
          clearInterval(timerInterval)   
      }
  }, 1000)

}



function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'question1',
    answers: [
      { text: 'answer1', correct: true },
      { text: 'answer2', correct: false },
      { text: 'answer3', correct: false }
    ]
  },
  {
    question: 'question2',
    answers: [
      { text: 'answer1', correct: false },
      { text: 'answer2', correct: false },
      { text: 'answer3', correct: true }
    ]
  },
  {
    question: 'question3',
      answers: [
        { text: 'answer1', correct: false },
        { text: 'answer2', correct: false },
        { text: 'answer3', correct: true }
      ]
    },
  
    {
      question: 'question4',
      answers: [
        { text: 'answer1', correct: false },
        { text: 'answer2', correct: true },
        { text: 'answer3', correct: false }
      ]
    }
]

var counter = 0;
if (answer.correct) {
  counter = counter + 1;
  document.write ('score' + counter);
}