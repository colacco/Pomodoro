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
const time = document.querySelectorAll('.time');
const sec = document.getElementById('sec');
const min = document.getElementById('min');

let sMin;
let sSec;
let sTime;

let bMin;
let bSec;
let bTime;

let sessions;
let times = 0;

let paused = true;
let intervalId;

function convertToSecond(min, sec){
    const m = parseInt(min);
    const s = parseInt(sec)
    return (m * 60) + s;
}

function startStudy(){
    isStudy = true;
    title.textContent = 'Study';
    clearInterval(intervalId);
    intervalId = setInterval(upTime, 1000);
}

function upTime(){
    sTime--;
    const seconds = sTime % 60;
    const minutes = Math.floor(sTime/ 60);
    timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if(sTime <= 0){
        clearInterval(intervalId);
        sTime = convertToSecond(sMin, sSec);
        times++;
        console.log('times: ' + times);
        console.log('sessions: ' + sessions);
        if(times < sessions){
            startBreak();
        }
    }
}

function startBreak(){
    isStudy = false;
    title.textContent = 'Break';
    clearInterval(intervalId);
    intervalId = setInterval(upBreak, 1000)

}

function upBreak(){
    bTime--;
    const seconds = bTime;
    const minutes = Math.floor(seconds / 60);
    timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if(bTime <= 0){
        clearInterval(intervalId);
        bTime = convertToSecond(bMin, bSec);
        startStudy();
    }
}

configBtn.addEventListener('click', (evento) => {
    evento.preventDefault();
    if(!configStatus){
        configBtn.src = "./img/openNut.png";
        config.style = "display: flex";
        configStatus = true;
    } else {
        configBtn.src = "./img/nut.png";
        config.style = "display: none";
        configStatus = false;
    }
})

time.forEach((input) => {
    input.addEventListener('change', (evento) => {
        evento.preventDefault();

        if(input.id == 'sSec'){
            if(input.value == ""){
                sec.textContent = "00";
            } else {
                sec.textContent = String(input.value).padStart(2, 0);
            }
        }

        if(input.id == 'sMin'){
            if(input.value == ""){
                min.textContent = "00";
            } else{
                min.textContent = String(input.value).padStart(2, 0);
            }
        }
    })
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

    sMin = document.getElementById('sMin').value;
    sSec = document.getElementById('sSec').value;
    sTime = convertToSecond(sMin, sSec);

    bMin = document.getElementById('bMin').value;
    bSec = document.getElementById('bSec').value;
    bTime = convertToSecond(bMin, bSec);

    sessions = document.getElementById('sessions').value;
    

    startStudy();
})



