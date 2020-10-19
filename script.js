/* create element to store questions
    create element to store answers
    show the questions
    when user clicks submit, show results
    make timer 
    decrement time from clock if answer is wrong
    when all questions are answered OR timer = 0, stop game
    save initials and score
*/

var questions;
questions = ['question 1', 'question 2', 'question 3', 'question 4', 'question 5'];

//build seperate arrays for answers to each question?

var startButton = document.querySelector('.start')

function startTimer(){
    var secondsRemaining = userInput.value
    var timerInterval = setInterval(function(){
         secondsRemaining-- 
            timeRemainingSection.textContent = secondsRemaining

        if (secondsRemaining === 0){
            clearInterval(timerInterval)   
        }
    }, 1000)

}

startButton.addEventListener('click', startTimer)