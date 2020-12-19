const msgEl = document.getElementById('msg');

const randomNum = getRandomNum();
console.log(randomNum)

//window.SpeechRecognition for crome browser
//window.webkitSpeechRecognition for Safari and Firefox
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//object
let recognition = new window.SpeechRecognition();


//get Random Number
function getRandomNum() {
    return Math.floor(Math.random() * 100 + 1);
}

//Start Recognition
recognition.start();

//Speak Result and onSpeak=>method
//result eventListener
recognition.addEventListener('result', onSpeak);

//to transcript results
//event e
function onSpeak(e) {
    let msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

//Display Speak Message on box
function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>You Said:</div>
    <span class="box">${msg}</span>
    `;
}

function checkNumber(msg) {
    //check it is not number NaN
    let num = +msg;

    //if num is not number
    if (Number.isNaN(num)) {
        msgEl.innerHTML += `<div>That is not a vaild number!</div>`
        return false;
    }

    //check range
    if (num > 100 || num < 1) {
        msgEl.innerHTML += `<div>Number must be between 1 and 100!</div>`
        return false;
    }

    //check number
    if (num === randomNum) {
        //clear another style
        document.body.innerHTML = `
        <h2>Congradulation! You have gussed the number!
        <br>
        <br>
        It was ${num}.
        </h2>
        <button class="play-agian" id="play-again">Play Again</button>
        `;
        recognition.stop();
    } else if (num > randomNum) {
        msgEl.innerHTML += `<div>Go Lower</div>`
    } else {
        msgEl.innerHTML += `<div>Go Higher</div>`
    }
}
//restart recognition
recognition.addEventListener('end', () => recognition.start())

//listen click event in body
document.body.addEventListener('click', (e) => {
    if (e.target.id === 'play-again') {
        window.location.reload();
    }
})