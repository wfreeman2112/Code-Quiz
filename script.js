/*
create variables for start button
and questions
and answers
timer starts when "start button' is pushed
questions appear
when answered, another question appears
when incorrect time is subtracted from clock
when all questions are answered OR clock = 0, game is over
when game ends input box for initials
store initials and score 
display high score
*/

var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var countdownElement = document.getElementById('countdown')
var counter = 0
var secondsRemaining = 60
var saveButton = document.getElementById('save')
var initialInput = document.getElementById('initials')
var scoreList = document.getElementById('scoreList')

saveButton.addEventListener('click', saveScore)

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

startButton.addEventListener('click', startTimer)
function startTimer(){

  var timerInterval = setInterval(function(){
       secondsRemaining-- 
          countdownElement.textContent = secondsRemaining
      if (secondsRemaining <= 0){
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

  if (correct) {
    counter = counter + 1;
    document.getElementById ('score').innerText = counter; 

} else {
  secondsRemaining = secondsRemaining - 5
}

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    //startButton.innerText = 'Restart'
    //startButton.classList.remove('hide')
    saveButton.classList.remove('hide')
    initialInput.classList.remove('hide')
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

function saveScore() {
  var initials = initialInput.value
  var oldScore = window.localStorage.getItem('high score') || ""
  window.localStorage.setItem('high score', oldScore + ',' + initials + " " + counter)
showHighScore()
}

function showHighScore() {
  var scores = window.localStorage.getItem('high score').split(",")
  saveButton.classList.add('hide')
  initialInput.classList.add('hide')
  for (var i = 0; i<scores.length; i++){
  var li = document.createElement('li')
  li.innerText = scores[i]
  scoreList.appendChild(li)
  }
  scoreList.classList.remove('hide')
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



