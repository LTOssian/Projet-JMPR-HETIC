import {home} from './homeComp.js'
import { options } from './optionsComp.js';

let gameView ;
let player ;
let scoreUI ;
let gameOverView ;
let backgroundView ;
let menuView ;
let jumpSoundEffectAsset ;
let deathSoundEffectAsset ;
let startView ;
let continueCTA ;
let restartCTA ;
let gameInterval = null;
let playerScore = 0;



export class Runner {
    constructor(){
        this.html = `
        <div class="wrapper">
            <h1 class="title"></h1>
            <div id="optionsDisplay">
            <button id="runnerToHomePage"><img src="./assets/homeIcon.svg" alt="Home page" width="30px"></button>

                <span id="jumpRule">Jump: </span>
                <span id="crouchRule">Crouch: </span>
                <span id="muteRule">Mute: </span>
                <span id="pauseRule">Pause: </span>

            </div>
            <div class='viewgame'>
                <div class="road">
                </div>
                <span class="score">Score : <strong id="scoreOutput">0</strong></span>
                <div class="gameOver">
                    <span class="GO">Game Over</span>
                    <span class="PS">Press "R"</span>
                </div>
                <div class="startGame">
                    <span class="GO">Start Game</span>
                    <span class="PS">Press "R"</span>
                </div>
                <span class="gameOver"></span>
                <div class="player"></div>
                <div class="A block"></div>
                <div class="B block"></div> 
                <div class="C block"></div>
                <div class="menu">
                    <button class="continue">CONTINUE</button>
                    <input type="text" id="playerName" placeholder="ENTRE TON PSEUDO">
                    <button class="restart">SUBMIT SCORE</button>
                </div>
            </div>
        </div>
        <audio src="./Runner_assets/sounds/jump_sound.mp3" id="jump_se"></audio>
        <audio src="./Runner_assets/sounds/dead_sound.mp3" id="dead_se"></audio>
        `

        this.css = `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GAME | PARISRUNNER</title>
        <link rel="stylesheet" href="./styles/runner.css">
        <link rel="icon" type="image/x-icon" href="./Runner_assets/img/favicon_1.ico">
        ` 

        this.currentGame;
        this.gameStatus = false;
        this.pauseStatus = false;
        this.isCrouching = false;
        this.soundStatus = false;
        this.gameInterval = null;
        this.collisionInterval = null;
        this._player = null;
    }

    get player() {
        return this._player;
    }

    set player(value) {
        this._player = value;
    }
    
    updateCSS () {
        document.querySelector('head').innerHTML = this.css;
    }

    updateHTML () {
        document.querySelector('body').innerHTML = this.html;
        document.getElementById('jumpRule').innerHTML = `Jump: <strong>${options.jumpKey}</strong>`;
        document.getElementById('crouchRule').innerHTML = `Crouch: <strong>${options.crouchKey}</strong>`;
        document.getElementById('pauseRule').innerHTML = `Pause: <strong>${options.pauseKey}</strong>`;
        document.getElementById('muteRule').innerHTML = `mute: <strong>${options.musicStatus}</strong>`;
    }

    mount () {
        this.updateCSS();
        this.updateHTML();
    }

    unmount () {
        document.querySelector('head').innerHTML = "";
        document.querySelector('body').innerHTML = "";
        this.gameStatus = false;
        clearInterval(this.gameInterval)
        clearInterval(this.collisionInterval)
    }

    methods(gameData) {
        this.updateGameVariables();
        this.currentGame = gameData;
        this.processGameData()
        this.soundDesign();
        this.homeRoute();
        this.listenEvents();
        this.generateBlocks();

    }

    processGameData () {
        for(let i = 0; i < this.currentGame["title"].length; i++) {
            document.querySelector('.title').innerHTML += `<span>${this.currentGame["title"][i]}<span>`
        }
        if (this.currentGame["assets"]["background"]) {
            backgroundView.style.backgroundImage = `url(${this.currentGame["assets"]["background"]})`;
        }

        if (this.currentGame["assets"]["A"]) {
            document.querySelector(`.A`).style.backgroundImage = `url(${this.currentGame["assets"]["A"]})`;
        } 
        if (this.currentGame["assets"]["B"]) {
            document.querySelector(`.B`).style.backgroundImage = `url(${this.currentGame["assets"]["B"]})`;
        }
        if (this.currentGame["assets"]["C"]) {
            document.querySelector(`.C`).style.backgroundImage = `url(${this.currentGame["assets"]["C"]})`;
        }
    }

    updateGameVariables() {
        gameView = document.querySelector('.viewgame');
        this.player = document.querySelector('.player');
        scoreUI = document.querySelector(".score");
        gameOverView = document.querySelector(".gameOver");
        backgroundView = document.querySelector(".road");
        menuView = document.querySelector(".menu");
        jumpSoundEffectAsset = document.querySelector("#jump_se");
        deathSoundEffectAsset = document.querySelector("#dead_se");
        startView = document.querySelector(".startGame");
        continueCTA = document.querySelector(".continue");
        restartCTA = document.querySelector(".restart");
    }

    homeRoute () {
        document.getElementById('runnerToHomePage').addEventListener("click", () => {
            this.unmount();
            home.mount();
        })
    }

    soundDesign () {
        if (this.currentGame["assets"]["melody"]) {
            document.querySelector('.wrapper').innerHTML += `<audio src="${this.currentGame["assets"]["melody"]}" id="play_m" loop></audio>`
        } else {
            document.querySelector('.wrapper').innerHTML += `<audio src="./Runner_assets/sounds/play_music.mp3" id="play_m" loop></audio>`
        }
        this.toggleMusic()
        document.querySelector("#play_m").volume = .2;
        jumpSoundEffectAsset.volume = .25;
        deathSoundEffectAsset.volume = .2;
    }

    toggleMusic() {
        if (this.soundStatus) {
            document.querySelector("#play_m").currentTime = 0; 
            document.querySelector("#play_m").pause();
            this.soundStatus = false
        } else {
            document.querySelector("#play_m").play();
            this.soundStatus = true;
        }
    }

    scoreRegister() {
            playerScore++;
            document.querySelector('.score').innerHTML = `Score : <strong>${playerScore}</strong>`;
    }

    generateBlocks () {
        document.querySelector('.road').style.width = `${100 * this.currentGame["blocks"].length}`
        this.currentGame["blocks"].forEach((block) => {
            let currentBlock = document.createElement("div")
            currentBlock.classList = `${block["type"]}BlockL blockPos`
            currentBlock.style.backgroundImage = `url(${this.currentGame['assets'][block["type"]]})`
            document.querySelector('.road').append(currentBlock);
        })
    }

    playerMovement () {
        document.addEventListener("keydown", (e)=>{
            if (e.key == options.jumpKey && this.gameStatus == true && this.pauseStatus == false) {
              if(document.querySelector(".player").classList != "jumping"){
                document.querySelector(".player").classList.add("jumping")
                jumpSoundEffectAsset.play()
              }
            }
            if (e.key == options.crouchKey && this.gameStatus == true && this.pauseStatus == false) {
                document.querySelector(".player").style.height = '15%';
                document.querySelector(".player").classList.add('crouching');
                this.isCrouching = true; 
            }
            if (e.key == options.pauseKey && this.gameStatus) {
                document.querySelector('.road').classList.toggle('pause');
                if (this.pauseStatus) {
                    this.pauseStatus = false;
                    this.gameInterval = setInterval(this.scoreRegister, 200)
                    document.querySelector('.menu').style.display = "none";
                } else {
                    this.pauseStatus = true;
                    clearInterval(this.gameInterval);
                    document.querySelector('.menu').style.display = "flex";
                }
            }

          })

        document.addEventListener("keyup", (e)=>{
            if (e.key == options.jumpKey && this.gameStatus == true && this.pauseStatus == false){
                document.querySelector(".player").classList.remove("jumping")
                }
            if (e.key == options.crouchKey && this.gameStatus == true && this.pauseStatus == false) {
                document.querySelector(".player").style.height = '20%'
                document.querySelector(".player").classList.remove('crouching')
                this.iscrounching = false;
            }
            
        })
    }

    detectCollision() {
        // Récupérer les positions des éléments
        let playerRect = document.querySelector(".player").getBoundingClientRect();
        
        document.querySelectorAll(".blockPos").forEach((block) => {
            if (!block.classList.contains('ABlockL')) {
                let blockRect = block.getBoundingClientRect();
                if (playerRect.left < blockRect.right && playerRect.right > blockRect.left && playerRect.top < blockRect.bottom && playerRect.bottom > blockRect.top) {
                    // Les éléments se chevauchent
                    console.log('Collision détectée!');
                    this.gameStatus = false;
                    document.querySelector('.player').classList.add('dead');
                    document.querySelector('.road').classList.add('pause');
                    clearInterval(this.gameInterval)
                    deathSoundEffectAsset.play();
                    document.querySelector('.menu').style.display = "flex";
                    this.gameStatus = false;

                    }
            }
        })
        }

    listenEvents() {
        document.addEventListener("keydown", e => {
            if (e.key == options.musicStatus) {
                this.toggleMusic()
            }
            if ((e.key == "r") && (!this.gameStatus) && (!this.pauseStatus)) {
                console.log(this.currentGame)
                document.querySelector(".road").classList.add('running');
                document.querySelector(".player").classList.add('playerrunning');
                document.querySelector(".player").classList.remove('dead');
                document.querySelector(".startGame").style.display = "none";
                this.gameStatus = true;
                playerScore = 0;
                this.playerMovement();
                this.gameInterval = setInterval(this.scoreRegister, 200);
                this.collisionInterval = setInterval(this.detectCollision, 100);
            }
        })

        document.querySelector('.continue').addEventListener('click', (e) => {
            document.querySelector('.road').classList.toggle('pause');
                if (this.pauseStatus) {
                    this.pauseStatus = false;
                    this.gameInterval = setInterval(this.scoreRegister, 200)
                    document.querySelector('.menu').style.display = "none";
                } else {
                    this.pauseStatus = true;
                    clearInterval(this.gameInterval);
                    document.querySelector('.menu').style.display = "flex";
                }
        })

        document.querySelector('.restart').addEventListener('click', () => {
            
            clearInterval(this.gameInterval)
            clearInterval(this.loseInterval)
            clearInterval(this.collisionInterval)
            
            document.querySelector('.startGame').style.display = "inline-block"
            this.gameStatus = false;
            document.querySelector('.road').classList.toggle('pause');
            document.querySelector('.menu').style.display = "none";
            document.querySelector('.player').classList.remove('playerrunning');
            document.querySelector('.player').classList.remove("jumping")
            document.querySelector('.player').classList.remove('crouching')
            document.querySelector('.player').classList.remove('dead')
            home.stages[home.currentStage].addPlayer(document.querySelector('#playerName').value,  playerScore);
            playerScore = 0;
            this.gameStatus = false;
            this.pauseStatus = false;
            this.unmount();
            home.mount();
            
        })
    }
}

// pb de variables, j'ai l'impression que pour l'instant va falloir tout update avec le document.querySelector pour que ça fonctionne
//lors du unmount 