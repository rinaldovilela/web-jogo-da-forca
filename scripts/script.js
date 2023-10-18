
const hangmanImage = document.querySelector(".hangman-box img");

const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");

let currentWord, wrongGuessCount = 0;
const maxGuesses = 6; 

const getRandomWord = () => {

    //Selecionando uma palavra aleatória e uma dica da lista de palavras . 
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word
    console.log(word, hint)
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");

}

const initGame = (button, clickedLetter) => {
    // checando se a letra clicada existe na palavra
    if(currentWord.includes(clickedLetter)) {
        // mostrando todas as letras corretas no display de palavras
        [...currentWord].forEach((letter, index) => {
        if(letter === clickedLetter){
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
}

// criando botões do teclado event listeners 
for (let i = 97; i < 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}


getRandomWord();