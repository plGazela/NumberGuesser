// TOOD: Delete repeating numbers

// Game init
function gameStart() {
    // UI elements

    // Text and input
    const bodyEl = document.getElementsByClassName("game")[0];
    const taskEl = document.getElementsByClassName("game__task")[0];
    const taskPromptEl = document.getElementsByClassName("game__prompt__question")[0];
    const pointsEl = document.getElementsByClassName("game__points")[0];
    const answerIn = document.getElementsByClassName("game__answer")[0];

    // Buttons
    const submitBtn = document.getElementsByClassName("game__answer-submit")[0];
    const restartBtn = document.getElementsByClassName("game__restart")[0];

    // Variables
    let gamedrawnNumbers = [];
    let gameDifficultyLevel = 0;
    let gamePlayerLives = 3;
    let gamePlayerPoints = 0;
    let gameDrawnNumber = drawNumber(gameDifficultyLevel);

    gamedrawnNumbers.push(gameDrawnNumber);

    answerIn.focus()

    // DEBUG
    console.log("Drawn number: ", gameDrawnNumber);

    // Player submit answer
    submitBtn.addEventListener("click", () => {
        if(checkGuess(gameDrawnNumber)) {
            // Correct answer
            gamePlayerLives++;
            gamePlayerPoints++;
            pointsEl.textContent = gamePlayerPoints;
            answerIn.value = null;
            answerIn.focus();

            correctAnswerEffect();

            // DEBUG
            console.log("Correct answer! Lives: " + gamePlayerLives);

            // Changing difficulty level based on player points
            if(gamePlayerPoints === 5) {
                gameDifficultyLevel++;
                taskPromptEl.textContent = "1-30";

                // DEBUG
                console.log("Difficulty level up!");
            } else if(gamePlayerPoints === 10) {
                gameDifficultyLevel++;
                taskPromptEl.textContent = "1-50";

                // DEBUG
                console.log("Difficulty level up!");
            } else if(gamePlayerPoints === 15){
                gameDifficultyLevel++;
                taskPromptEl.textContent = "1-100";

                // DEBUG
                console.log("Difficulty level up!");
            }

            // Draw new number
            gameDrawnNumber = drawNumber(gameDifficultyLevel);
            while(checkNumber(gameDrawnNumber, gamedrawnNumbers) == true) {
                gameDrawnNumber = drawNumber(gameDifficultyLevel);
            }
            gamedrawnNumbers.push(gameDrawnNumber);

            // DEBUG
            console.log("Drawn number: ", gameDrawnNumber);

        } else {
            // Wrong answer
            gamePlayerLives--;
            wrongAnswerEffect();
            answerIn.value = null;
            answerIn.focus();

            // DEBUG
            console.log("Wrong answer! Lives: " + gamePlayerLives);

            if(gamePlayerLives === 0) {
                console.log("Game Over!");

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

    // Player restart game
    restartBtn.addEventListener("click", () => {
        location.reload();
    })
}
gameStart();

// Drawing a random number based on difficulty level
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

// Correct and wrong answer broswer effect
function correctAnswerEffect() {
    const gameBody = document.getElementsByClassName("game")[0];

    gameBody.style.animation = "none";
    setTimeout(() => {
        gameBody.style.animation = "correct-answer-animation 1s forwards";
    }, 10);
}

function wrongAnswerEffect() {
    const gameBody = document.getElementsByClassName("game")[0];

    gameBody.style.animation = "none";
    setTimeout(() => {
        gameBody.style.animation = "wrong-answer-animation 1s forwards";
    }, 10);
}