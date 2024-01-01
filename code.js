class player {
    constructor(name) {
        this.name = name;
        this.pv = 5;

        this.info = function(enemyPlayer){
            document.write(this.name + " tiene " + this.pv + " puntos de vida. " + enemyPlayer.name + " tiene " + enemyPlayer.pv + " puntos de vida.");
        }

    }
}

// jugadores
let Florencio = new player("Florencio");
let Ragnar = new player("Ragnar");

// info
let info = document.querySelector('.info');
//modal
let modal = document.querySelector('.modal');
let result = document.querySelector('.result');

function options(player1, player2, action1, action2){
    if(action1 === "atacar" && action2 === "atacar"){
        player1.pv -= 1;
        player2.pv -= 1;
    }else if (action1 === "atacar" && action2 === "contratacar"){
        player1.pv -= 1;
    }else if (action1 === "atacar" && action2 === "meditar"){
        player2.pv -= 1;
    }else if (action1 === "contratacar" && action2 === "atacar"){
        player2.pv -= 1;
    }else if (action1 === "contratacar" && action2 === "meditar"){
        player1.pv -= 1;
    }else if (action1 === "contratacar" && action2 === "contratacar"){
        player1.pv -= 1;
        player2.pv -=  1;
    }else if (action1 === "meditar" && action2 === "atacar"){
        player1.pv -= 1;
    }else if (action1 === "meditar" && action2 === "contratacar"){
        player2.pv -=  1;
    }else if (action1 === "meditar" && action2 === "meditar"){
        // No se recibe daño
    }
    // Florencio.info(Ragnar);
    info.innerHTML = `${player1.name} ${action1} y ${player2.name} ${action2}`;
    if(player1.pv == 0 && player2.pv == 0){
        modal.classList.add('active');
        result.innerHTML = `Empate`;
    }else if(player1.pv == 0){
        modal.classList.add('active');
        result.innerHTML = `${player2.name}`;
    }else if(player2.pv == 0){
        modal.classList.add('active');
        result.innerHTML = `${player1.name}`;
    }
}

// vida de jugadores
let life1 = document.querySelector('.life1');
let life2 = document.querySelector('.life2');
life1.innerHTML = `HP ${Florencio.pv}`;
life2.innerHTML = `HP ${Ragnar.pv}`;

// acciones de jugador
let attack1 = document.querySelector('.attack');
let counterAttack1 = document.querySelector('.counterAttack');
let meditate1 = document.querySelector('.meditate');
// Ataque aleatorio jugador2
function randomAction() {
    let randomNumber = Math.random();

    if (randomNumber < 0.33) {
        return "atacar";
    } else if (randomNumber < 0.67) {
        return "contratacar";
    } else {
        return "meditar";
    }
}  

// Efecto sonido
const audio = new Audio('assets/ambient-metal-whoosh-2-174462.mp3');
// Establecemos un temporizador para clickear
let canClick = true;

attack1.addEventListener('click', () => {
    if (canClick) {
        options(Florencio, Ragnar, "atacar", randomAction());
        life1.innerHTML = `HP ${Florencio.pv}`;
        life2.innerHTML = `HP ${Ragnar.pv}`;
        audio.play();
        canClick = false;
        setTimeout(() => {
            canClick = true;
        }, 3000);
    }
});


counterAttack1.addEventListener('click', () => {
    if(canClick){
    options(Florencio, Ragnar, "contratacar", randomAction());
    life1.innerHTML = `HP ${Florencio.pv}`;
    life2.innerHTML = `HP ${Ragnar.pv}`;
    audio.play();
    audio.play();
        canClick = false;
        setTimeout(() => {
            canClick = true;
        }, 3000);
    }
});


meditate1.addEventListener('click', () => {
    if (canClick){
        options(Florencio, Ragnar, "meditar", randomAction());
        life1.innerHTML = `HP ${Florencio.pv}`;
        life2.innerHTML = `HP ${Ragnar.pv}`;
        audio.play();
        canClick = false;
        setTimeout(() => {
            canClick = true;
        }, 3000);
    }
});


let rules_icon = document.querySelector('.rules_icon');
let rules_info = document.querySelector('.rules_info');

rules_icon.addEventListener('click', () =>{
    rules_info.classList.toggle('active');
});


// Parar o reanudar música
let music_icon = document.querySelector('.music_icon');
let sound = document.querySelector('.sound');
// Dejar en true si usamos el autoplay, si no mejor iniciar en false
let isPlaying = false;

music_icon.addEventListener('click', () =>{
    if (isPlaying) {
        sound.pause();
        sound.currentTime = 0;
        isPlaying = false;
    } else {
        sound.play();
        isPlaying = true;
    }
});


