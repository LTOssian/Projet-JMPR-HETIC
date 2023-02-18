console.warn('Importez une map pour jouer')
console.warn('Créez une map dans l\'éditeur pour l\'importer')
console.warn('Vérifiez vos touches dans la page option')
console.warn('Observez le classement en cliquant sur le trophée')



class Stage {
    constructor(name, jsonMap){
        this.name = name
        this.leaderboard = new Map()
        this.jsonData = jsonMap
    }

    addPlayer(name, score){
        this.leaderboard.set(name, score)
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
        this.RunnerRoute();

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
                        this.stages.splice(this.stages.length-1, 0,new Stage(content["title"], content))
                        this.updateCarousel()
                        document.querySelector('#currentLoads').innerHTML = `Currently ${this.stages.length} level(s) loaded`
                        this.currentStage = this.stages.length - 1
                        
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
                console.error('Vous êtes au premier niveau')
                return
            } else {
                this.updateCarousel()
                this.currentStage--;
            }
        })
        
        document.getElementById('nextName').addEventListener('click', (e) => {
            if (this.currentStage == this.stages.length-1) {
                console.error('Vous êtes à la fin du jeu');
            } else {
                this.updateCarousel(this.stages)
                this.currentStage++;
        
            }
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
        this.pauseKey = 'P';
        this.musicStatus = 'M';
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
            this.pauseKey = 'P';
            this.musicStatus = 'M';
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
                    <a href="./indew.html"><button>LEAVE</button></a>
                </div>
            </div>
        </div>
        <audio src="../Runner_assets/sounds/play_music.mp3" id="play_m" loop></audio>
        <audio src="../Runner_assets/sounds/jump_sound.mp3" id="jump_se"></audio>
        <audio src="../Runner_assets/sounds/dead_sound.mp3" id="dead_se"></audio>
        `
        this.css = `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PARISRUNNER | </title>
        <link rel="icon" type="image/x-icon" href="../img/favicon_1.ico">
        <link rel="stylesheet" href="./styles/runner.css">
        `
        // GET GAME VARIABLES
        this.viewgame = document.querySelector(".viewgame")
        this.player = document.querySelector(".player")
        this.score = document.querySelector(".score")
        this.gameOver = document.querySelector(".gameOver")
        this.blockA = document.querySelector(".A")
        this.blockB = document.querySelector(".B")
        this.blockC = document.querySelector(".C")
        this.road = document.querySelector(".road")
        this.menu = document.querySelector(".menu")
        this.play_m = document.querySelector("#play_m")
        this.jump_se = document.querySelector("#jump_se")
        this.dead_se = document.querySelector("#dead_se")
        this.startGame = document.querySelector(".startGame")
        this.continue_button = document.querySelector(".continue")
        this.restart_button = document.querySelector(".restart")
        this.interval = null
        this.playerScore = 0
        this.ingame = false
        this.inpause = false
        this.iscrounching = false

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
        this.scoreUpdate()
        // this.stop_sound()
        this.start()
        this.jump()
        this.crounch()
        this.dead()

    }
    scoreUpdate() {
        this.playerScore++
        this.score = `Score : <strong>${this.playerScore}</strong>`
      }

    // stop_sound(sound){
    //     sound.pause()
    //     sound.currentTime = 0;
    // }

    // START
    start(){
        document.addEventListener("keydown", (event)=>{
        if (event.code == "Space" && this.ingame == false && this.inpause == false){
            this.gameOver.style.display = "none"
            this.blockB.classList.add("spawn")
            //blockC.classList.add("spawn")
            this.road.classList.add('running')
            this.viewgame.classList.add('bgAnimate')
            this.player.classList.remove('dead')
            this.player.classList.add('playerrunning')
            this.play_m.play()
            this.startGame.style.display = "none"

            this.ingame = true
            this.playerScore = 0
            this.interval = setInterval(scoreUpdate,200)
        }
        })
    }   
    // JUMP
    jump(){
        document.addEventListener("keydown", (event)=>{
            if (event.key == " " && this.ingame == true && this.inpause == false){
            if(this.player.classList != "jumping"){
                this.player.classList.add("jumping")
                this.jump_se.play()
            }
            }
        })
    }   
    // CROUNCH
    crounch(){
        document.addEventListener("keydown", (event)=>{
            if(event.key == "s" && this.ingame == true && this.inpause == false){
            this.player.style.height = '15%'
            this.player.classList.add('crouching')
            this.iscrounching = true
            }
        })
        
        document.addEventListener("keyup", (event)=>{
            if(event.key == "s" && this.inpause == false){
            this.player.style.height = '20%'
            this.player.classList.remove('crouching')
            this.iscrounching = false
            }
        })
    }
// GAME OVER
    dead(){
        setInterval(() =>{
            // PLAYER
            let player_top = parseInt(getComputedStyle(this.player).getPropertyValue("bottom")) + parseInt(getComputedStyle(this.player).getPropertyValue("height"))
            let player_right = parseInt(getComputedStyle(this.player).getPropertyValue("width"))
            let player_bottom = parseInt(getComputedStyle(this.player).getPropertyValue("bottom"))
            let player_left = parseInt(getComputedStyle(this.player).getPropertyValue("left"))
        
            // BLOCK B
            let blockB_top = parseInt(getComputedStyle(this.blockB).getPropertyValue("height")) + parseInt(getComputedStyle(this.blockB).getPropertyValue("bottom"))
            console.log(blockB_top)
            let blockB_left = parseInt(getComputedStyle(this.blockB).getPropertyValue("left"))
            let blockB_right = parseInt(getComputedStyle(this.blockB).getPropertyValue("left")) + parseInt(getComputedStyle(blockB).getPropertyValue("width"))
            
            // BLOCK C
            let blockC_bottom = parseInt(getComputedStyle(this.viewgame).getPropertyValue("height")) - parseInt(getComputedStyle(this.blockC).getPropertyValue("top")) - parseInt(getComputedStyle(this.blockC).getPropertyValue("height"))
            let blockC_left = parseInt(getComputedStyle(this.blockC).getPropertyValue("left"))
            let blockC_right = parseInt(getComputedStyle(this.blockC).getPropertyValue("left")) + parseInt(getComputedStyle(this.blockC).getPropertyValue("width"))
        
            if (
            (player_bottom < blockB_top && ((blockB_left >= player_left && blockB_left <= player_right) || (blockB_right >= player_left && blockB_right <= player_right)))
            || (player_top > blockC_bottom && ((blockC_left >= player_left && blockC_left <= player_right) || (blockC_right >= player_left && blockC_right <= player_right)))
            ){
            clearInterval(interval)
            this.gameOver.style.display = "inline-block"
            this.blockB.classList.remove("spawn")
            this.blockC.classList.remove("spawn")
            this.road.classList.remove("running")
            this.player.classList.remove('playerrunning')
            this.player.classList.add('dead')
            this.playerScore = 0
            this.ingame = false
            // stop_sound(play_m)
            this.dead_se.play()
            }
        },1)
        }
    }

const score = new LeaderBoard();
const options = new Options();
const home = new HomePage();
const runner = new Runner();

// J'ai intégré le html et css de Benjos MAIS je me suis arrété ligne 145 pour le JS
// Gros probleme avec getComputedStyle que je n'arrive pas à régler 
// De plus la musique ne fonctionne pas non plus

home.mount();