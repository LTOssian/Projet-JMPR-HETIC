console.warn('Importez une map pour jouer')
console.warn('Créez une map dans l\'éditeur pour l\'importer')
console.warn('Vérifiez vos touches dans la page option')
console.warn('Observez le classement en cliquant sur le trophée')



class Stage {
    constructor(name, jsonMap){
        this.name = name
        this.leaderboard = new Map()
        this.jsonData = jsonMap
        this.game;
    }

    addPlayer(name, score){
        this.leaderboard.set(name, score)
    }

    get data () {
        return this.jsonData;
    }
}



class HomePage {
    constructor() {
        this.html = `
        <div id="home">
            <span id="currentLoads">Currently 0 level(s) loaded</span>

            <div id="title">
                <p>P</p>
                <p>A</p>
                <p>R</p>
                <p>I</p>
                <p>S</p>
                <p>R</p>
                <p>U</p>
                <p>N</p>
                <p>N</p>
                <p>E</p>
                <p>R</p>
            </div>
                
            <div id="carousel">
                <button class="carouselBtn" id="prevName"><img src="./assets/chevron-left.svg" alt="left navigation" width="50px"></button>
                <button id="levelName">Aucun niveau</button>
                <button class="carouselBtn" id="nextName"><img src="./assets/chevron-right.svg" alt="right navigation" width="50px"></button>
            </div>
            <div id="navButtons">
                <input id="loadButton" type="file"></input>
                <label for="loadButton" class="gridButton">LOAD</label>
                <a href="https://ltossian.github.io/map-editor-hetic/" target="_blank" class="gridButton">EDITOR</a>
                <button class="gridButton" id="optionPage">OPTIONS</button>
                <a href="https://obamasixgaming.github.io/Credit-page1/" target="_blank" class="gridButton" id="creditPage">CREDITS</a>
                <button class="gridButton" id="scorePage">
                    <img src="./assets/Trophy.png" width="50px">
                </button>
            </div>
        </div>  
    </div>
        `
        this.css = `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./styles/home.css">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@800&family=PT+Sans&family=Source+Code+Pro:wght@500&display=swap');
        </style>
        ` 
        this.stages= [];
        this.currentStage = 0;
    }

    updateCSS () {
        document.querySelector('head').innerHTML = this.css;
    }

    updateHTML () {
        document.querySelector('body').innerHTML = this.html;
    }

    mount () {
        this.updateCSS();
        this.updateHTML();
        this.methods();
    }

    methods () {
        this.loadStage();
        this.updateCarousel();
        this.carouselEvents();
        this.scoreRoute();
        this.optionRoute();
        this.runnerRoute();

    }

    unnmount () {
        document.querySelector('head').innerHTML = "";
        document.querySelector('body').innerHTML = "";
    }

    loadStage () {
        document.getElementById('loadButton').addEventListener('click', (e) => {
            e.preventDefault();
            let inputFile = document.createElement(`input`)
            inputFile.type = "file";
            inputFile.accept = "json";
            inputFile.addEventListener('change', (e) => {
                if (inputFile.files) {
                    const file = inputFile.files[0];
                    const fReader = new FileReader();
                    fReader.onload = () => {
                        const content = JSON.parse(fReader.result);
                        this.stages.push(new Stage(content["title"], content))
                        this.stages[this.stages.length - 1].game = new Runner();
                        document.querySelector('#currentLoads').innerHTML = `Currently ${this.stages.length} level(s) loaded`
                        this.currentStage = this.stages.length - 1
                        this.updateCarousel()
                        
                    }
                    fReader.readAsText(file);
                }
                inputFile = window._protected_reference = undefined;
            })
            inputFile.click();
        })        
    }

    updateCarousel () {
            if (this.stages.length) {
                document.getElementById('levelName').innerHTML = this.stages[this.currentStage].name;
                document.getElementById('carousel').style.background = `url(${this.stages[this.currentStage].jsonData["assets"]["background"]})`;
            }
        }        
    carouselEvents () {
        document.getElementById('prevName').addEventListener('click', (e) => {
            if (this.currentStage == 0) {
                console.error('Vous êtes au début de la liste de jeux')
            } else {
                this.currentStage--;

                this.updateCarousel()

            }
            console.log(this.currentStage)
        })
        
        document.getElementById('nextName').addEventListener('click', (e) => {
            if (this.currentStage == this.stages.length-1) {
                console.error('Vous êtes à la fin de la liste de jeux');
            } else {
                this.currentStage++;

                this.updateCarousel()

            }
            console.log(this.currentStage)
        })
    }

    scoreRoute () {
        document.querySelector('#scorePage').addEventListener('click', (e) => {
            this.unmount;
            score.mount();
            score.methods();
        })
    }

    optionRoute () {
        document.querySelector('#optionPage').addEventListener('click', (e) => {
            this.unmount;
            options.mount();
            options.methods();
        })
    }

    runnerRoute () {
        document.querySelector('#levelName').addEventListener('click', (e) => {
            if (this.stages.length > 0) {
                this.unnmount;

                this.stages[this.currentStage].game.mount(this.stages[this.currentStage].data);
                this.stages[this.currentStage].game.methods();
            } else {
                console.error('Importez une map pour jouer')
            }
        })
    }
    
}


class LeaderBoard {
    constructor() {
        this.html = `
             <button id="LeaderBoardToHomePage"><img src="assets/homeIcon.svg" alt="Home page"></button>

            <div class="container">
                
                <h1>LEADERBOARD</h1>
                <div class = "button">
                </div>
                <div class="gris">
                    <div class="critere">
                        <span class="place">#</span>
                        <span class="joueur">Joueur</span>
                        <span class="points">Points</span>
                    </div>
                    <div class="contain">

                    </div>
                </div>


            </div>
            `;
        this.css = `
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="./styles/leaderboard.css">
        </head>
        `;
        this.scoreBoard = new Map;
    }

    updateCSS () {
        document.querySelector('head').innerHTML = this.css;
    }

    updateHTML () {
        document.querySelector('body').innerHTML = this.html;
    }

    mount () {
        this.updateCSS();
        this.updateHTML();
    }

    unmount () {
        document.querySelector('head').innerHTML = "";
        document.querySelector('body').innerHTML = "";
    }

    methods () {
        this.displayButton()
        this.homeRoute()

    }
    
    homeRoute(){
       let goHome = document.querySelector('#LeaderBoardToHomePage')
        goHome.addEventListener('click',()=>{
            this.unmount()
            home.mount()
        })
    }
    
    scoreboard2(stage){
        // Map to array
        let stageArray = Array.from(stage.leaderboard)
        
        // Sort player most point to less
        stageArray.sort((a, b) => {
        return a[1] - b[1]
        })
        stageArray.reverse()
    
        // variable for iteration
        let listSize = stageArray.length
        let i = 0
        let place = 1
        let id = i
    
        while(i < listSize){
            // conversion string pour id 
            id = String(id)
            place = String(place)
    
            // Creation div classement
            let classement = document.createElement("div")
            classement.className = "classement"
            classement.id = id
    
            // span Numero
            let spanNumber = document.createElement("span")
            spanNumber.className = "place"
            spanNumber.classList.add("numero")
            spanNumber.innerText = place
    
            // span nom du joueur
            let spanName = document.createElement("span")
            spanName.className = "joueur"
            spanName.classList.add("nom")
            spanName.innerText = stageArray[i][0]
    
            // span de son nombre de points
            let spanPoints = document.createElement("span")
            spanPoints.className = "points"
            spanPoints.classList.add("puntos")
            spanPoints.innerText = stageArray[i][1]
    
            // Création de hr et ajout à la page
            let hr = document.createElement("hr")
            document.querySelector('div.contain').append(classement)
    
            // Ajout de tous les span dans la div classement
            let div = document.getElementById(id)
            div.append(spanNumber)
            div.appendx(spanName)
            div.append(spanPoints)
            document.querySelector('div.contain').append(hr)
    
            place = parseInt(place)
            id = parseInt(id)
            id += 1
            i++
            place += 1
        }
    }

    resetContain(balise){
        balise.innerHTML =""
    }
    displayButton(){
        let contain = document.querySelector("div.contain")
        let i = 1000
        
        for(let stage of home.stages){
            console.log("ok")
            let id = i
            // id to string
            id = String(id)
        
            // Create button
            let btn = document.createElement("button")
            // Set ID
            btn.id = id 
            // Set Text
            btn.innerText = stage.name
            // Set class 
            btn.className = ("btn")
            // Add button to HTML
            let divBouton = document.querySelector("div.button")
            divBouton.append(btn)
        
            let printScoreboard = document.getElementById(id)
            printScoreboard.addEventListener('click', () =>{
                // reset content
                this.resetContain(contain)    
                // Print scoreboard
                this.scoreboard2(stage)
            })
        
            // Sélection de tous les boutons
            const buttons = document.querySelectorAll('.btn');
        
            // Ajout d'un gestionnaire d'événement à chaque bouton
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    // Suppression de la classe 'active' pour tous les boutons
                    buttons.forEach(button => {
                    button.classList.remove('background')
                    button.classList.remove('textColor')
                    });
                    // Ajout de la classe 'active' pour le bouton sélectionné
                    button.classList.add('background')
                    button.classList.add('textColor')
        
                })
            })
            id = parseInt(id)
            i--
        }
    }
}

class Options {
    constructor() {
        this.html = `
        <button id="optionsToHomePage"><img src="./assets/homeIcon.svg" alt="Home page"></button>
        <div id="container">
        <h2 id="page-title">Options</h2>
        <div id="option-container">
            <div id="option-container-box">
                <h3 id="subtitle">Keybinds</h3>
                <div id="jump-keybind-container" class="modify-keybind-container">
                    <label for="jump-keybind-modifier">Jump: </label>
                    <input type="button" class="btn" id="jump-keybind-modifier">
                </div>

                <div id="crouch-keybind-container" class="modify-keybind-container">
                    <label for="crouch-keybind-modifier">Crouch:</label>
                    <input type="button" class="btn" id="crouch-keybind-modifier">
                </div>

                <div id="pause-keybind-container" class="modify-keybind-container">
                    <label for="pause-keybind-modifier">Pause:</label>
                    <input type="button" class="btn" id="pause-keybind-modifier">
                </div>

                <div id="mute-keybind-container" class="modify-keybind-container">
                    <label for="mute-keybind-modifier">Mute music:</label>
                    <input type="button" class="btn" id="mute-keybind-modifier">
                </div>

                <button id="default-button" class="btn">Default</button>

                <div id="img">
                    <img src="./assets/gear.png" alt="engrenage" id="img-svg">
                </div>
            </div>
        </div>
    </div>
        `;
        this.css = `
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="./styles/options.css">
        </head>
        `;
        this.jumpKey = 'ArrowUp';
        this.crouchKey = 'ArrowDown';
        this.pauseKey = 'p';
        this.musicStatus = 'm';
    }

    updateCSS () {
        document.querySelector('head').innerHTML = this.css;
    }

    updateHTML () {
        document.querySelector('body').innerHTML = this.html;
    }

    mount () {
        this.updateCSS();
        this.updateHTML();
    }

    unmount () {
        document.querySelector('head').innerHTML = "";
        document.querySelector('body').innerHTML = "";
        
    }
    methods() {
        this.homeRoute();
        this.loadCurrentKeys();
        this.loadEvents();
    }

    homeRoute () {
        document.getElementById('optionsToHomePage').addEventListener('click', () => {
            this.unmount();
            home.mount();
        })
    }

    checkKey (typedKey) {
        const buttonsToCheck = [this.jumpKey, this.crouchKey, this.pauseKey, this.musicStatus]
        let currentKeyStatus = true
        buttonsToCheck.forEach((button) => {
            if (button == typedKey) {
                console.error('Cette touche est déjà assignée.')
                currentKeyStatus = false;
            }
        })
        return currentKeyStatus;  
    }

    loadEvents () {
        
        this.generalEvents(document.getElementById('jump-keybind-modifier'), 'jump');
        this.generalEvents(document.getElementById('crouch-keybind-modifier'), 'crouch');
        this.generalEvents(document.getElementById('pause-keybind-modifier'), 'pause');
        this.generalEvents(document.getElementById('mute-keybind-modifier'), 'mute');
        document.getElementById("default-button").addEventListener('click', (e) => {
            this.setDefaultKeys();
            this.loadCurrentKeys();
        })
    }

    loadCurrentKeys () {
        document.getElementById('jump-keybind-modifier').value = this.jumpKey;
        document.getElementById('crouch-keybind-modifier').value = this.crouchKey;
        document.getElementById('pause-keybind-modifier').value = this.pauseKey;
        document.getElementById('mute-keybind-modifier').value = this.musicStatus;
    }
    
    setDefaultKeys () {
            this.jumpKey = 'ArrowUp';
            this.crouchKey = 'ArrowDown';
            this.pauseKey = 'p';
            this.musicStatus = 'm';
    }
    

    generalEvents(idHTML, action) {

        switch (action) {

            case 'jump':
                idHTML.addEventListener('click', (e) => {
                    document.addEventListener('keydown', (e) => {
                        if (this.checkKey(e.key)) {
                            this.jumpKey = e.key;
                            idHTML.value = e.key;
                        } else return 
                    }, {once: true})
                })
                break;
            case 'mute':
                idHTML.addEventListener('click', (e) => {
                    document.addEventListener('keydown', (e) => {
                        if (this.checkKey(e.key) == true) {
        
                            this.musicStatus = e.key;
                            idHTML.value = e.key;
                        }
                    }, {once: true})
                })
                break;
            case 'crouch':
                idHTML.addEventListener('click', (e) => {
                    document.addEventListener('keydown', (e) => {
                        if (this.checkKey(e.key) == true) {
        
                            this.crouchKey = e.key;
                            idHTML.value = e.key;
                        }
                    }, {once: true})
                });
                break;
            case 'pause':
                idHTML.addEventListener('click', (e) => {
                    document.addEventListener('keydown', (e) => {
                        if (this.checkKey(e.key) == true) {
        
                            this.pauseKey = e.key;
                            idHTML.value = e.key;
                        }
                    }, {once: true})
                })
                break;
            default:
                console.error(`Can't listen to ${action} action`);
        }
    }
    
}
class Runner {
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
                <div class="road"></div>
                <span class="score">Score : <strong>0</strong></span>
                <div class="gameOver">
                    <span class="GO">Game Over</span>
                    <span class="PS">Press "space"</span>
                </div>
                <div class="startGame">
                    <span class="GO">Start Game</span>
                    <span class="PS">Press "space"</span>
                </div>
                <span class="gameOver"></span>
                <div class="player"></div>
                <div id="block" class="A"></div>
                <div id="block" class="B"></div> 
                <div id="block" class="C"></div>
                <div class="menu">
                    <button class="continue">CONTINUE</button>
                    <button class="restart">RESTART</button>
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
        <title>PARISRUNNER | </title>
        <link rel="icon" type="image/x-icon" href="./Runner_assets/img/favicon_1.ico">
        <link rel="stylesheet" href="./styles/runner.css">
        `  
        this.currentGame;
        this.playerScore = 0;
        this.gameStatus = false;
        this.pauseStatus = false;
        this.isCrouching = false;
        this.soundStatus = false;

        this.gameView ;
        this.player ;
        this.scoreUI ;
        this.gameOverView ;
        this.bakgroundView ;
        this.menuView ;
        this.musicAsset ;
        this.jumpSoundEffectAsset ;
        this.deathSoundEffectAsset ;
        this.startView ;
        this.continueCTA ;
        this.restartCTA ;
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

    mount (gameData) {
        this.updateCSS();
        this.updateHTML();
        this.currentGame = gameData
    }

    unmount () {
        document.querySelector('head').innerHTML = "";
        document.querySelector('body').innerHTML = "";
    }

    methods() {
        this.processGameData()
        this.updateGameVariables();
        this.soundDesign();
        this.homeRoute();
        this.startEvent();

    }

    processGameData () {
        for(let i = 0; i < this.currentGame["title"].length; i++) {
            document.querySelector('.title').innerHTML += `<span>${this.currentGame["title"][i]}<span>`
        }
    }

    updateGameVariables () {
        this.gameView = document.querySelector('.viewgame');
        this.player = document.querySelector('.player');
        this.scoreUI = document.querySelector(".score")
        this.gameOverView = document.querySelector(".gameOver")
        this.bakgroundView = document.querySelector(".road")
        this.menuView = document.querySelector(".menu")
        this.jumpSoundEffectAsset = document.querySelector("#jump_se")
        this.deathSoundEffectAsset = document.querySelector("#dead_se")
        this.startView = document.querySelector(".startGame")
        this.continueCTA = document.querySelector(".continue")
        this.restartCTA = document.querySelector(".restart")
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
        this.jumpSoundEffectAsset.volume = .25;
        this.deathSoundEffectAsset.volume = .2;

        document.addEventListener('keydown', (e)=> {
            if (e.key == options.musicStatus) {
                this.toggleMusic()
            }
        })
    }

    toggleMusic() {
        if (this.soundStatus) {
            console.log("music off")
            document.querySelector("#play_m").pause()
            document.querySelector("#play_m").currentTime = 0; 
            this.soundStatus = false
        } else {
            console.log("music on")
            document.querySelector("#play_m").play();
            this.soundStatus = true;
        }
    }

    

    startEvent () {
        document.addEventListener("keydown", (e) => {
            if ((e.code == "Space") && (!this.gameStatus) && (!this.pauseStatus)) {
                console.log("ok ca joue")
                this.gameStatus = true;
                this.scoreUI = 0;

            }
        })
    }





}

const score = new LeaderBoard();
const options = new Options();
const home = new HomePage();

// J'ai intégré le html et css de Benjos MAIS je me suis arrété ligne 145 pour le JS
// Gros probleme avec getComputedStyle que je n'arrive pas à régler 
// De plus la musique ne fonctionne pas non plus

home.mount();