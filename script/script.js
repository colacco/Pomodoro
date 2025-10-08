const title = document.getElementById('title');
const timer = document.getElementById('timer');
const timerSession = document.getElementById('timer-session');
const start = document.getElementById('start');
const restart = document.getElementById('restart');

let sMin, sSec, sTime, bMin, bSec, bTime, sessions;
let times = 0;
let study = true;
let paused, firstStart = true;
let intervalId = null;

function btn(status){
    paused = status;
    if(paused){
        start.textContent = 'Continue';
        start.style.backgroundColor = 'var(--content-color)';
        start.style.color = 'var(--first-gradient-color)';
        start.style.border = '1px solid var(--content-color)';
    }else{
        start.textContent = 'Pause';
        start.style.backgroundColor = 'var(--pause-color)'
        start.style.color = 'var(--content-color)'
        start.style.border = '1px solid var(--pause-color)'
    }   
}

function setAtt(){
    sMin = document.getElementById('sMin').value;
    sSec = document.getElementById('sSec').value;
    bMin = document.getElementById('bMin').value;
    bSec = document.getElementById('bSec').value;
    sessions = document.getElementById('sessions').value;
    sTime = convertToSecond(sMin, sSec);
    bTime = convertToSecond(bMin, bSec);

    times = 0;
    timerSession.textContent = `Sessão atual: ${times}`;
}

function convertToSecond(min, sec){
    const m = parseInt(min);
    const s = parseInt(sec)
    return (m * 60) + s;
}

function startStudy(){
    study = true;
    title.textContent = 'Study';
    clearInterval(intervalId);
    intervalId = setInterval(upTime, 1000);
}

function upTime(){
    sTime--;
    const seconds = sTime;
    const minutes = Math.floor(seconds/ 60);
    timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if(sTime <= 0){
        clearInterval(intervalId);
        sTime = convertToSecond(sMin, sSec);
        times++;
        timerSession.textContent = `Sessão atual: ${times}`;
        if(times < sessions){
            startBreak();
        } else {
            paused = true; 
            firstStart = true;
            timerSession.textContent = `Sessão atual: 0`; 
            start.textContent = 'Start';
            start.style.backgroundColor = 'var(--content-color)'
            start.style.color = 'var(--first-gradient-color)'
            start.style.border = '1px solid var(--content-color)'
        }
    }
}

function startBreak(){
    study = false;
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

start.addEventListener('click', (evento) => {
    evento.preventDefault();

    if(firstStart){ // START
        firstStart = false;
        btn(false);
        setAtt();
        startStudy();
    } else if(!paused){  // PAUSE
        btn(true);

        clearInterval(intervalId);
        intervalId = null;
    } else{ // CONTINUE
        btn(false);

        if(study){
            intervalId = setInterval(upTime,1000);
        } else {
            intervalId = setInterval(upBreak, 1000);
        }  
    }
})

restart.addEventListener('click', (evento) => {
    evento.preventDefault();
    if(!firstStart){
        if(paused){
            btn(false);
        }
        setAtt();
        startStudy();
    }
})
