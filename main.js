const wordDisplay = document.querySelector(".word-display"),
    wordInput = document.querySelector(".word-input"),
    timeDisplay = document.querySelector(".time"),
    scoreDisplay = document.querySelector(".score"),
    button = document.querySelector(".button");

    
let score = 0,
    TIME = 3, time = TIME;
let isPlaying = false;
let words = [];
let randomNum;

function getWords() {
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            //words = response.data; 
            response.data.forEach(word => {
                if (word.length < 11) {
                    words.push(word);
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });

    buttonChange("게임시작");
}


function buttonChange(text) {
    button.innerText = text;
    text === "게임시작" ? button.classList.remove("loading") : button.classList.add("loading");

}



function countDown() { //남은시간 표시
    time > 0 ? time-- : isPlaying = false;

    if (isPlaying === false) {
        buttonChange("게임시작");
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

function run() { //버튼 클릭 후 기능.
    if (isPlaying === true) {
        return;
    }
    wordInput.value="";
    isPlaying = true;
    score = 0;
    scoreDisplay.innerText = score;
    buttonChange("게임중");
    time = TIME;
    timeInterval = setInterval(countDown, 1000);

   


}


function compare_word() { //단어 비교 및 score, time설정


    if (wordDisplay.innerText.toLowerCase() === wordInput.value.toLowerCase()) {
        wordInput.value = "";
        if (isPlaying === false) {
            return;
        }

        score += 5;
        scoreDisplay.innerText = score;
        time = TIME;

        randomNum = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomNum];
    }
}



function init() {
    wordInput.addEventListener("input", compare_word);
    button.addEventListener("click", run);
    getWords();
}
init();