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
var secondsRemaining = 30
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
var timerInterval 
function startTimer(){

  timerInterval = setInterval(function(){
       secondsRemaining-- 
          countdownElement.textContent = secondsRemaining
      if (secondsRemaining <= 0){
        stopTimer()    
      }
  }, 1000)

}

function stopTimer() {
  clearInterval(timerInterval)
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
    document.getElementById ('score').innerText = ("score ") + counter; 

} else {
  secondsRemaining = secondsRemaining - 5
}

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
  
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
  questionContainerElement.classList.add('hide')
  stopTimer()
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
    question: 'who invented Javascript?',
    answers: [
      { text: 'Netscape', correct: true },
      { text: 'Jimmy Starbucks', correct: false },
      { text: 'Dunkin Donuts', correct: false }
    ]
  },
  {
    question: 'what is a string?',
    answers: [
      { text: 'a thing my cat plays with', correct: false },
      { text: 'a type of noodle', correct: false },
      { text: 'characters inside quotes', correct: true }
    ]
  },
  {
    question: 'what is an event handler?',
      answers: [
        { text: 'a wedding planner', correct: false },
        { text: 'a caterer', correct: false },
        { text: 'a way to handle user input', correct: true }
      ]
    },
  
    {
      question: 'what does console.log do?',
      answers: [
        { text: 'its a Captains log like on Star Trek', correct: false },
        { text: 'prints text to the console', correct: true },
        { text: 'logs onto your computer', correct: false }
      ]
    }
]



