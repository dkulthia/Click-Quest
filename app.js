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

class ClickSpark extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.root = document.documentElement;
    this.svg;
  }

  get activeEls() {
    return this.getAttribute("active-on");
  }

  connectedCallback() {
    this.setupSpark();

    this.root.addEventListener("click", (e) => {
      if (this.activeEls && !e.target.matches(this.activeEls)) return;

      this.setSparkPosition(e);
      this.animateSpark();
    });
  }

  animateSpark() {
    let sparks = [...this.svg.children];
    let size = parseInt(sparks[0].getAttribute("y1"));
    let offset = size / 2 + "px";

    let keyframes = (i) => {
      let deg = `calc(${i} * (360deg / ${sparks.length}))`;

      return [
        {
          strokeDashoffset: size * 3,
          transform: `rotate(${deg}) translateY(${offset})`
        },
        {
          strokeDashoffset: size,
          transform: `rotate(${deg}) translateY(0)`
        }
      ];
    };

    let options = {
      duration: 660,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      fill: "forwards"
    };

    sparks.forEach((spark, i) => spark.animate(keyframes(i), options));
  }

  setSparkPosition(e) {
    let rect = this.root.getBoundingClientRect();

    this.svg.style.left =
      e.clientX - rect.left - this.svg.clientWidth / 2 + "px";
    this.svg.style.top =
      e.clientY - rect.top - this.svg.clientHeight / 2 + "px";
  }

  setupSpark() {
    this.createSvgTemplate();
    this.svg = this.shadowRoot.querySelector("svg");
  }

  createSvgTemplate() {
    let template = `
      <style>
        :host {
          display: contents;
        }
        
        svg {
          pointer-events: none;
          position: absolute;
          rotate: -20deg;
          stroke: var(--click-spark-color, currentcolor);
        }

        line {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          transform-origin: center;
        }
      </style>
      <svg width="30" height="30" viewBox="0 0 100 100" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
        ${Array.from(
          { length: 8 },
          (_) => `<line x1="50" y1="30" x2="50" y2="4"/>`
        ).join("")}
      </svg>
    `;

    this.shadowRoot.innerHTML = template;
  }
}

customElements.define("click-spark", ClickSpark);
