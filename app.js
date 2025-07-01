let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}

updateScoreElement()

/*if (!score){
    score={
        wins:0,
        losses:0,
        ties:0
    }
}*/

let isAutoPlaying = false
let intervalId

const autoPlayButtonElement = document.querySelector('.js-auto-play-button')

// const autoPlay =  () =>{}
function autoPlay() {
    if (!isAutoPlaying) {
        autoPlayButtonElement.innerHTML = 'Stop Playing'
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove()
            playGame(playerMove)
        }, 1000);
        isAutoPlaying = true
    }
    else {
        autoPlayButtonElement.innerHTML = 'Auto Play'
        clearInterval(intervalId)
        isAutoPlaying = false
    }

}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock')
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper')
    })

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors')
    })

document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
        confirmationMessage()
    })

document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
        autoPlay()
    })


document.body.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'r'){
        playGame('rock')
    }
    else if (event.key.toLowerCase() === 'p'){
        playGame('paper')
    }
    else if (event.key.toLowerCase() === 's'){
        playGame('scissors')
    }
    else if (event.key === 'Backspace'){
        confirmationMessage()
    }
    else if (event.key.toLowerCase() === 'a'){
        autoPlay()
    }
})

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'scissors') {
        if (computerMove === 'scissors') {
            result = 'Tie.'
        }
        else if (computerMove === 'rock') {
            result = 'You lose.'
        }
        else if (computerMove === 'paper') {
            result = 'You win.'
        }
    }

    else if (playerMove === 'paper') {
        if (computerMove === 'paper') {
            result = 'Tie.'
        }
        else if (computerMove === 'scissors') {
            result = 'You win.'
        }
        else if (computerMove === 'rock') {
            result = 'You lose.'
        }
    }

    else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.'
        }
        else if (computerMove === 'paper') {
            result = 'You lose.'
        }
        else if (computerMove === 'scissors') {
            result = 'You win.'
        }
    }

    if (result === 'You win.') {
        score.wins += 1
    }
    else if (result === 'You lose.') {
        score.losses += 1
    }
    else if (result === 'Tie.') {
        score.ties += 1
    }


    localStorage.setItem('score', JSON.stringify(score))

    updateScoreElement()

    document.querySelector('.js-result').innerHTML = result

    document.querySelector('.js-moves')
        .innerHTML = `You
        <img src="images/${playerMove}-emoji.png" alt="" class="move-icon">
        <img src="images/${computerMove}-emoji.png" alt="" class="move-icon">
        Computer`

}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}


function pickComputerMove() {
    const randomNumber = Math.random()
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock'
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper'
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors'
    }

    return computerMove
}


function zeroScore(){
    score.wins=0    
    score.losses=0    
    score.ties=0
    localStorage.removeItem('score')
    updateScoreElement()
}

function confirmationMessage(){
    confirmationButtonElement = document.querySelector('.js-confirmation')
        const html = `
        <div class="confirmation-text">Are you sure you want to reset the score?</div>
        <button onclick="
        zeroScore()
        confirmationButtonElement.innerHTML=''
        " class="confirmation-button">Yes</button>
        <button onclick="
        confirmationButtonElement.innerHTML=''
        " class="confirmation-button">No</button>
        `
        confirmationButtonElement.innerHTML=html
}