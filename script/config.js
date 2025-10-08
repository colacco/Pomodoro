const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);

const configBtn = document.getElementById('config__button');
const config = document.getElementById('config');
const timeConfig = document.querySelectorAll('.time');
const theme = document.getElementById('themes');
const sec = document.getElementById('sec');
const min = document.getElementById('min');
let configStatus = false;

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

timeConfig.forEach((input) => {
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