const wordList = [
  { word: "haber", hint: "there is; there are" },
  { word: "ayudar", hint: "to help" },
  { word: "llegar", hint: "to arrive" },
  { word: "asistir", hint: "to attend" },
  { word: "ser", hint: "to be (permanent)" },
  { word: "estar", hint: "to be (temporary)" },
  { word: "poder", hint: "to be able to; can" },
  { word: "peinarse", hint: "to brush your hair" },
  { word: "comprar", hint: "to buy" },
  { word: "llevar", hint: "to carry" },
  { word: "cerrar", hint: "to close" },
  { word: "venir", hint: "to come" },
  { word: "hacer", hint: "to do; to make" },
  { word: "vestirse", hint: "to dress yourself" },
  { word: "secarse", hint: "to dry your hair" },
  { word: "desayunar", hint: "to eat breakfast" },
  { word: "cenar", hint: "to eat dinner" },
  { word: "almorzar", hint: "to eat lunch" },
  { word: "explicar", hint: "to explain" },
  { word: "terminar", hint: "to finish" },
  { word: "levantarse", hint: "to get up; to stand up" },
  { word: "dar", hint: "to give" },
  { word: "ir", hint: "to go" },
  { word: "bajar", hint: "to go down" },
  { word: "subir", hint: "to go up" },
  { word: "saber", hint: "to know (information; facts)" },
  { word: "conocer", hint: "to know (people; places)" },
  { word: "aprender", hint: "to learn" },
  { word: "escuchar", hint: "to listen" },
  { word: "abrir", hint: "to open" },
  { word: "pagar", hint: "to pay" },
  { word: "jugar", hint: "to play" },
  { word: "praticar", hint: "to practice" },
  { word: "maquillarse", hint: "to put on makeup" },
  { word: "poner", hint: "to put; to place" },
  { word: "llover", hint: "to rain" },
  { word: "leer", hint: "to read" },
  { word: "correr", hint: "to run" },
  { word: "decir", hint: "to say; to tell" },
  { word: "buscar", hint: "to search for; to look for" },
  { word: "ver", hint: "to see" },
  { word: "vender", hint: "to sell" },
  { word: "compartir", hint: "to share" },
  { word: "sentarse", hint: "to sit down" },
  { word: "empezar", hint: "to start" },
  { word: "tomar", hint: "to take (a class); to drink" },
  { word: "bañarse", hint: "to take a bath" },
  { word: "ducharse", hint: "to take a shower" },
  { word: "sacar", hint: "to take out" },
  { word: "hablar", hint: "to talk" },
  { word: "enseñar", hint: "to teach" },
  { word: "tocar", hint: "to touch; to play (a musical instrument)" },
  { word: "despertarse", hint: "to wake up" }
];

// DOM Elements
const wordDisplay = document.querySelector(".word-display");
const hintText = document.querySelector(".hint-text b");
const guessText = document.querySelector(".guess-text b");
const keyboard = document.querySelector(".keyboard");
const playAgainBtn = document.querySelector(".play-again");
const modal = document.querySelector(".game-modal");
const modalTitle = modal.querySelector("h4");
const modalWord = modal.querySelector("p b");
const modalImg = modal.querySelector("img");

let currentWord = "";
let correctLetters = [];
let wrongGuessCount = 0;
const maxGuesses = 6;

function createKeyboard() {
  const keys = "qwertyuiopasdfghjklzxcvbnmñ".split("");
  keyboard.innerHTML = "";
  keys.forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(button, letter));
    keyboard.appendChild(button);
  });
}

function getRandomWord() {
  const randomObj = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = randomObj.word.toLowerCase();
  correctLetters = [];
  wrongGuessCount = 0;
  hintText.textContent = randomObj.hint;
  guessText.textContent = `0 / ${maxGuesses}`;
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  createKeyboard();
  modal.style.display = "none";
  updateHangmanImage();
}

function updateHangmanImage() {
  document.querySelector(".hangman-box img").src = `hangman-${wrongGuessCount}.svg`;
}

function handleGuess(button, letter) {
  button.disabled = true;
  button.style.opacity = "0.6";

  if (currentWord.includes(letter)) {
    [...currentWord].forEach((char, index) => {
      if (char === letter) {
        const li = wordDisplay.querySelectorAll("li")[index];
        li.textContent = letter;
        li.classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    guessText.textContent = `${wrongGuessCount} / ${maxGuesses}`;
    updateHangmanImage();
  }

  checkGameOver();
}

function checkGameOver() {
  const allGuessed = [...wordDisplay.querySelectorAll("li")]
    .every(li => li.textContent !== "");

  if (allGuessed) {
    showEndScreen(true);
  } else if (wrongGuessCount >= maxGuesses) {
    showEndScreen(false);
  }
}

function showEndScreen(won) {
  modal.style.display = "flex";
  modalTitle.textContent = won ? "You Win!" : "Game Over!";
  modalWord.textContent = currentWord;
  modalImg.src = won ? "victory.gif" : "lost.gif"; // Updated here
}

playAgainBtn.addEventListener("click", getRandomWord);

// Start game
getRandomWord();
