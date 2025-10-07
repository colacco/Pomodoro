const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);


const configBtn = document.getElementById('config__button');
const config = document.getElementById('config');
let configStatus = false;

const theme = document.getElementById('themes');
const start = document.getElementById('start');
const repeat = document.getElementById('repeat');
const title = document.getElementById('title');
const timer = document.getElementById('timer');
const min = document.getElementById('min').textContent;
const sec = document.getElementById('sec').textContent;

let studySec;
let breakSec;
let sessions;

console.log(studySec);
console.log(breakSec);
console.log(sessions);


let breakTime = 0;
let studyTime = 0;


let paused = true;
let intervalId;



function convertToSecond(min){
    const m = parseInt(min);
    return m * 60;
}

function startStudy(){
    isStudy = true;
    title.textContent = 'Study';
    studyTime = studySec;
    clearInterval(intervalId);
    intervalId = setInterval(upTime, 1000);
}

function upTime(){
    studyTime--;
    const seconds = studyTime;
    const minutes = 0;
    timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if(studyTime <= 0){
        clearInterval(intervalId);
        startBreak();
    }
}

function startBreak(){
    isStudy = false;
    title.textContent = 'Break';
    breakTime = breakSec;
    clearInterval(intervalId);
    intervalId = setInterval(upBreak, 1000)

}

function upBreak(){
    breakTime--;
    const seconds = breakTime;
    const minutes = 0;
    timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if(breakTime <= 0){
        clearInterval(intervalId);
        startStudy();
    }
}

configBtn.addEventListener('click', (evento) => {
    evento.preventDefault();
    if(!configStatus){
        config.style = "display: flex";
        configStatus = true;
    } else {
        config.style = "display: none"
        configStatus = false;
    }
})

theme.addEventListener('change', (evento) => {
    evento.preventDefault();
    switch (theme.value) {
        case 'blue':
            document.documentElement.style.setProperty('--first-gradient-color', '#91a0f2');
            document.documentElement.style.setProperty('--second-gradient-color', '#A7BAF2');
            document.documentElement.style.setProperty('--third-gradient-color', '#F2D5D5');
            document.documentElement.style.setProperty('--content-color', '#fff');
            break;
        case 'red':
            document.documentElement.style.setProperty('--first-gradient-color', '#8C031C');
            document.documentElement.style.setProperty('--second-gradient-color', '#8C030E');
            document.documentElement.style.setProperty('--third-gradient-color', '#260104');
            document.documentElement.style.setProperty('--content-color', '#fff');
            break;
        default:
            break;
    }
})

start.addEventListener('click', (evento) => {
    evento.preventDefault();

    studySec = document.getElementById('study').value;
    breakSec = document.getElementById('break').value;
    sessions = document.getElementById('sessions').value;
    startStudy();
})



