
const hangmanImage = document.querySelector(".hangman-box img");

const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal")
const playAgainBtn = document.querySelector(".play-again")

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6; 

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {

    //Selecionando uma palavra aleatória e uma dica da lista de palavras . 
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word
    console.log(word, hint)
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    

}
// functionality
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `Você encontrou a palavra` : `A palavra correta é`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").src = `${isVictory ? 'Você Ganhou' : 'Game Over!'}.gif`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    // checando se a letra clicada existe na palavra
    if(currentWord.includes(clickedLetter)) {
        // mostrando todas as letras corretas no display de palavras
        [...currentWord].forEach((letter, index) => {
        if(letter === clickedLetter){
            correctLetters.push(letter)
            wordDisplay.querySelectorAll("li")[index].innerText = letter
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
        }
    })
    } else {
        wrongGuessCount++
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
    
}

// criando botões do teclado event listeners 
for (let i = 97; i < 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}


getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);