const button = document.getElementById('moveButton');
let score = 0;

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

const updateHighScore = () => {
    document.getElementById('highScore').innerText = highScore;
}
const updateLowestScore = () => {
    document.getElementById('lowestScore').innerText = lowestScore;
}

const updateScore = () => {
    document.getElementById('score').innerText = score;
}

button.addEventListener('mouseenter', () => {
    const randomPositionX = Math.floor(Math.random() * (window.innerWidth - button.offsetWidth));
    const randomPositionY = Math.floor(Math.random() * (window.innerHeight - button.offsetHeight));
    
    button.style.left = `${randomPositionX}px`;
    button.style.top = `${randomPositionY}px`;
});

const mouseClick = () => {
    const randomPositionX = Math.floor(Math.random() * (window.innerWidth - button.offsetWidth));
    const randomPositionY = Math.floor(Math.random() * (window.innerHeight - button.offsetHeight));
    
    button.style.left = `${randomPositionX}px`;
    button.style.top = `${randomPositionY}px`;
}

button.addEventListener('click', () => {
    score += 10;
    updateScore();
    updateHighScoreInLocalStorage();
    mouseClick();
});

document.body.addEventListener('click', (event) => {
    if (event.target === document.body) {
        score -= 10;
        updateScore();
        updateLowestScoreInLocalStorage();
    }
});

const updateHighScoreInLocalStorage = () => {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('clickQuestHighScore', highScore);
        updateHighScore();
    }
}

const updateLowestScoreInLocalStorage = () => {
    if (score < lowestScore) {
        lowestScore = score;
        localStorage.setItem('clickQuestLowestScore', lowestScore);
        updateLowestScore();
    }
}

updateScore();
updateHighScore();
updateLowestScore();
