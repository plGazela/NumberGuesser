// Drawing a random number based on the difficulty level
function drawNumber(difficultyLevel) {

    let difficultyFactor;

    switch(difficultyLevel) {
        case 1:
            difficultyFactor=30;
            break;
        case 2:
            difficultyFactor=50;
            break;
        case 3:
            difficultyFactor=100;
            break;
        default:
            difficultyFactor=10;
            break;
    }

    let drawnNumber = Math.floor(Math.random() * difficultyFactor) + 1;
    return drawnNumber;
}

// Checking player answers
function checkGuess(drawnNumber) {

    let playerAnswer = Number(document.getElementsByClassName("game__answer")[0].value);
    
    if(playerAnswer === drawnNumber) {
        return true;
    } else {
        return false;
    }
}

// Checking number repeatability
function checkNumber(drawnNumber, ...drawnNumbers) {

    for(let i=0; i<drawnNumbers[0].length; i++) {
        if(drawnNumber === drawnNumbers[0][i]) {
            return true;
        }
    }

    return false;
}

// Correct and wrong answer effect
function correctAnswerEffect() {
    const gameBody = document.getElementsByClassName("game")[0];

    gameBody.style.animation = "none";
    setTimeout(() => {
        gameBody.style.animation = "correct-answer 1s forwards";
    }, 10);
}
function wrongAnswerEffect() {
    const gameBody = document.getElementsByClassName("game")[0];

    gameBody.style.animation = "none";
    setTimeout(() => {
        gameBody.style.animation = "wrong-answer 1s forwards";
    }, 10);
}

// Game init
function gameStart() {

    // Elements and input
    const bodyEl = document.getElementsByClassName("game")[0];
    const pointsEl = document.getElementsByClassName("game__points")[0];
    const taskEl = document.getElementsByClassName("game__task")[0];
    const taskPromptEl = document.getElementsByClassName("game__prompt__question")[0];
    const answerIn = document.getElementsByClassName("game__answer")[0];

    // Buttons
    const submitBtn = document.getElementsByClassName("game__submit")[0];
    const restartBtn = document.getElementsByClassName("game__restart")[0];

    // Variables
    let gamedrawnNumbers = [];
    let gameDifficultyLevel = 0;
    let gamePlayerLives = 3;
    let gamePlayerPoints = 0;
    let gameDrawnNumber = drawNumber(gameDifficultyLevel);

    // Pushing first number to check and focusing input element
    gamedrawnNumbers.push(gameDrawnNumber);
    answerIn.focus()

    // Player submit answer
    submitBtn.addEventListener("click", () => {
        if(checkGuess(gameDrawnNumber)) {

            // Player correct answer (adding lives, points, running effect, etc.)
            gamePlayerLives++;
            gamePlayerPoints++;
            pointsEl.textContent = gamePlayerPoints;
            answerIn.value = null;
            answerIn.focus();
            correctAnswerEffect();

            // Changing difficulty level based on player points
            if(gamePlayerPoints === 5) {
                gameDifficultyLevel++;
                taskPromptEl.textContent = "1-30";

            } else if(gamePlayerPoints === 10) {
                gameDifficultyLevel++;
                taskPromptEl.textContent = "1-50";

            } else if(gamePlayerPoints === 15){
                gameDifficultyLevel++;
                taskPromptEl.textContent = "1-100";

            }

            // Draw a new number and check if it's not repeating
            gameDrawnNumber = drawNumber(gameDifficultyLevel);
            while(checkNumber(gameDrawnNumber, gamedrawnNumbers) == true) {
                gameDrawnNumber = drawNumber(gameDifficultyLevel);
            }
            gamedrawnNumbers.push(gameDrawnNumber);

        } else {

            // Player wrong answer (losing lives, running effect, etc.)
            gamePlayerLives--;
            wrongAnswerEffect();
            answerIn.value = null;
            answerIn.focus();

            // Player run out of lives (change game screen)
            if(gamePlayerLives === 0) {
                setTimeout(() => {
                    bodyEl.style.animation = "none";
                }, 10);
                bodyEl.style.background = "var(--background-wrong-answer)";
                taskEl.textContent = "Game Over!";
                taskPromptEl.style.display = "none";
                answerIn.style.display = "none";
                submitBtn.style.display = "none";
                restartBtn.style.display = "block";
            } 
        }
    });

    // Player restarting game
    restartBtn.addEventListener("click", () => {
        location.reload();
    })
}

// Start game
gameStart();