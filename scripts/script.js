
const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.querySelector(".keyboard");

const getRandomWord = () => {

    //Selecionando uma palavra aleatória e uma dica da lista de palavras . 
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word, hint)
    document.querySelector(".hint-text b").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");

}



for (let i = 97; i < 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i)
    keyboardDiv.appendChild(button);
}


getRandomWord();