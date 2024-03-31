const button = document.getElementById('moveButton');
let score = 0;

// Load high score and lowest score from local storage
let highScore = localStorage.getItem('clickQuestHighScore');
let lowestScore = localStorage.getItem('clickQuestLowestScore');
if (!highScore) {
    highScore = 0;
} else {
    highScore = parseInt(highScore);
}
if (!lowestScore) {
    lowestScore = Infinity;
} else {
    lowestScore = parseInt(lowestScore);
}

// Update high score and lowest score in the UI
const updateHighScore = () => {
    document.getElementById('highScore').innerText = highScore;
}
const updateLowestScore = () => {
    document.getElementById('lowestScore').innerText = lowestScore;
}

// Update score in the UI
const updateScore = () => {
    document.getElementById('score').innerText = score;
}

// Move button on mouse enter
button.addEventListener('mouseenter', () => {
    const randomPositionX = Math.floor(Math.random() * (window.innerWidth - button.offsetWidth));
    const randomPositionY = Math.floor(Math.random() * (window.innerHeight - button.offsetHeight));
    
    button.style.left = `${randomPositionX}px`;
    button.style.top = `${randomPositionY}px`;
});

// Increment score on button click
button.addEventListener('click', () => {
    score += 10;
    updateScore();
    updateHighScoreInLocalStorage();
});

// Decrement score on background click
document.body.addEventListener('click', (event) => {
    if (event.target === document.body) {
        score -= 10;
        updateScore();
        updateLowestScoreInLocalStorage();
    }
});

// Update high score in local storage
const updateHighScoreInLocalStorage = () => {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('clickQuestHighScore', highScore);
        updateHighScore();
    }
}

// Update lowest score in local storage
const updateLowestScoreInLocalStorage = () => {
    if (score < lowestScore) {
        lowestScore = score;
        localStorage.setItem('clickQuestLowestScore', lowestScore);
        updateLowestScore();
    }
}

// Update UI
updateScore();
updateHighScore();
updateLowestScore();
