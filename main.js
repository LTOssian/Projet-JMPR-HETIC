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
                <button id="levelName"><span>Aucun niveau</span></button>
                <button class="carouselBtn" id="nextName"><img src="./assets/chevron-right.svg" alt="right navigation" width="50px"></button>
            </div>
            <div id="navButtons">
                <input id="loadButton" type="file"></input>
                <label for="loadButton" class="gridButton"><span>LOAD</span></label>
                <button class="gridButton" id="editorPage"><span>EDITOR</span></button>
                <button class="gridButton" id="optionPage"><span>OPTIONS</span></button>
                <a href="https://obamasixgaming.github.io/Credit-page1/" target="_blank" class="gridButton" id="creditPage"><span>CREDITS</span></a>
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
        <title>HOME | PARISRUNNER</title>
        <link rel="icon" type="image/x-icon" href="./Runner_assets/img/favicon_1.ico">
        <link rel="stylesheet" href="./styles/home.css">
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
        this.editorRoute();
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
                document.getElementById('levelName').innerHTML = `<span>${this.stages[this.currentStage].name}</span>`;
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
            e.preventDefault();

            this.unmount;
            score.mount();
            score.methods();
        })
    }

    optionRoute () {
        document.querySelector('#optionPage').addEventListener('click', (e) => {
            e.preventDefault();

            this.unmount;
            options.mount();
            options.methods();
        })
    }

    runnerRoute () {
        document.querySelector('#levelName').addEventListener('click', (e) => {
            e.preventDefault();
            if (this.stages.length > 0) {
                this.unnmount;

                this.stages[this.currentStage].game.mount(this.stages[this.currentStage].data);
                this.stages[this.currentStage].game.methods();
            } else {
                console.error('Importez une map pour jouer')
            }
        })
    }

    editorRoute () {
        document.getElementById('editorPage').addEventListener('click', (e) => {
            e.preventDefault();
            this.unnmount;
            editor.mount();
            editor.methods();
        })
    }
    
}

class EditorTemplate {
    constructor() {
        this._title = "";
        this._creator = "";
        this._difficulty = "";
        this._blocks = "";
        this._preview = "";
        this._assetsUrl = "";
        this._blocksValue = "";
    }

    get title () {
        return this._title;
    }
    get creator () {
        return this._creator;
    }
    get difficulty () {
        return this._difficulty;
    }
    get blocks () {
        return this._blocks;
    }
    get assetsUrl () {
        return this._assetsUrl;
    }
    get blocksValue () {
        return this._blocksValue;
    }

    getRadioValues(){
        let output = "";
        for (const [key, _] of Object.entries(document.getElementById('radioSet').children)) {
            const radios = document.getElementsByName(`block${key}`);
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    output += `{"type": "${radios[i].value}"},`
                    break;
                }
            }
        }
        return output.slice(0,-1);
    }

    updateSuper() {
        this._title = document.getElementById('title').value;
        this._creator = document.getElementById('creator').value;
        this._difficulty = document.getElementById('difficulty').value;
        this._assetsUrl = `{"melody":"${document.getElementById('melody').value}", "background":"${document.getElementById('background').value}", "A": "${document.getElementById('blocksA').value}", "B": "${document.getElementById('blocksB').value}", "C": "${document.getElementById('blocksC').value}"}
        `;
        this._blocksValue = `[${this.getRadioValues()}]`;
    }

    updatePreview () {
        this.updateSuper();
        this._preview = 
        `{"title":"${this.title}",
        "creator":"${this.creator}",
        "difficulty":${this.difficulty},
        "assets":${this.assetsUrl},
        "blocks":${this.blocksValue}}`
        document.getElementById('radioSet').style.background = `url('${document.getElementById('background').value}')`;
        document.getElementById('radioSet').style.backgroundSize = 'contain';
        document.getElementById('previewP').innerHTML = this._preview;
        return this._preview;
    }
}

class EditorPage {
    constructor() {
        this.html = `
        <h1></h1>
        <button id="editorToHomePage"><img src="./assets/homeIcon.svg" alt="Home page" width="40px"></button>

        <main>
            <section id="levelSettings">
                <div id="heroSettings">
                <div class="gameSettings">
                        <label for="q_blocks">Nombre de blocs</label>
                        <input type="number" min="10" name="q_blocks" id="q_blocks" value="10">
                    </div>
                    <div class="gameSettings">
                        <label for="title">Nom du niveau</label>
                        <input type="text" name="title" id="title" placeholder="Nouveau monde">
                    </div>
                    <div class="gameSettings">
                        <label for="creator">Créateur du niveau</label>
                        <input type="text" name="creator" id="creator" placeholder="Votre nom">
                    </div>
                    <div class="gameSettings">
                        <label for="difficulty">Difficulté <output id="num">1</output>/5</label>
                        <input type="range" min="1" max="5" name="difficulty" id="difficulty" value="1" oninput="num.value = this.value">
                    </div>
                    
                    <button id="uploadBtn">UPLOAD</button>
                    <button id="downloadBtn">DOWNLOAD</button>
                    </div>
                </div>
                <div id="radioSet">
                
                </div>
            <div id="bottomLayout">
            <div id="assetsSet">
                        <div class="gameSettings">
                            <label for="melody">URL Musique</label>
                            <input type="url" name="melody" id="melody" placeholder="https://...">
                        </div>
                        <div class="gameSettings">
                            <label for="background">URL Background</label>
                            <input type="url" name="background" id="background" placeholder="https://...">
                        </div>
                        <div class="gameSettings">
                            <label for="blocksA">URL Blocs</label>
                            <input type="url" name="blocks" id="blocksA" placeholder="https://type-A...">
                            <input type="url" name="blocks" id="blocksB" placeholder="https://type-B...">
                            <input type="url" name="blocks" id="blocksC" placeholder="https://type-C...">
                        </div>
                </div>
                <div id="previewLayout">
                    <h2>Prévisualisation</h2>
                    <p id="previewP"></p>
                </div>
            </div>
                
                    
            </section>
        </main> 
        `;
        this.css = `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EDITOR | PARISRUNNER</title>
        <link rel="icon" type="image/x-icon" href="./Runner_assets/img/favicon_1.ico">
        <link rel="stylesheet" href="./styles/editor.css">
        `;
        this.level = new EditorTemplate();
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
    
    unmount() {
        document.querySelector('head').innerHTML = "";
        document.querySelector('body').innerHTML = "";
    }

    methods () {
        this.titleAnimation();
        this.homeRoute();
        this.initRadios();
        this.eventListeners();
        this.downloadHandler();
        this.uploadHandler();
    }

    titleAnimation () {
        const title = "EDITOR"
        for(let i = 0; i < title.length; i++) {
            document.querySelector('h1').innerHTML += `<span>${title[i]}<span>`
        }

    }

    eventListeners() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(element => {
            element.addEventListener('input', (e) => {
                this.level.updatePreview();
                if (element.type == "radio") {
                    console.log("radio")
                    document.querySelector('#q_blocks').disabled = true;
                }   
            })
        });
    
        const deleteBtns = document.querySelectorAll('.deleteBtn');
    
        for (let i = 0; i < deleteBtns.length; i++) {
            const btn = deleteBtns[i];
            btn.addEventListener('click', (e) => {
                const q_blocks = document.querySelectorAll('.block').length
                if (q_blocks > 10) {
                document.getElementById(`block${i}`).remove();
                document.querySelector('#q_blocks').value = q_blocks - 1;
                this.level.updatePreview();
                } else {
                    console.warn(`Vous êtes arrivé au minimum de blocs (10)`);
                }
            })
        }
    }

    downloadHandler () {
        document.getElementById('downloadBtn').addEventListener('click', (e) => {
            e.preventDefault();
            const DL = document.createElement("a");
            const content = this.level._preview;
            const file = new Blob([content], {type:'json'});
            DL.href = URL.createObjectURL(file);
            DL.download = `${this.level.title}_${this.level.creator}_map.jmpr`;
            DL.click();
            URL.revokeObjectURL(DL.href);
        })
    }

    uploadHandler () {
        document.getElementById('uploadBtn').addEventListener('click', (e) => {
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
                        console.log(content["assets"], typeof content["assets"])
                        document.getElementById('title').value = content["title"];
                        document.getElementById('q_blocks').value = content["blocks"].length;
                        document.getElementById('creator').value = content["creator"];
                        document.getElementById('difficulty').value = content["difficulty"]
                        document.getElementById('num').innerHTML = content["difficulty"];
                        this.addRadio(document.getElementById('q_blocks'));
                        for (let i = 0; i < content["blocks"].length; i++) {
                            document.getElementById(`${content["blocks"][i]["type"]}${i}`).checked = true;
                        }
                        document.getElementById('melody').value = content["assets"]["melody"]
                        document.getElementById('background').value = content["assets"]["background"]
                        document.getElementById('blocksA').value = content["assets"]["A"]
                        document.getElementById('blocksB').value = content["assets"]["B"]
                        document.getElementById('blocksC').value = content["assets"]["C"]
                        
                        this.level.updatePreview();
                    }
                    fReader.readAsText(file);
                }
                new Promise(function(resolve) {
                    setTimeout(() => {
                        console.log(inputFile.files);
                        resolve();
                    }, 1000);
                  })
                  .then(() => {
                    inputFile = window._protected_reference = undefined;
                  });
            })
            inputFile.click();
        })
    }

    addRadio (e) {
        document.getElementById('radioSet').innerHTML = "";
        for (let i = 0; i < e.value; i++) {
            const customBlock = `
            <div class="block" id="block${i}">
                <input type="radio" id="A${i}" name="block${i}" value="A" name="A">
                <label for="A${i}">A</label>
                <input type="radio" id="B${i}" name="block${i}" value="B" name="B">
                <label for="B${i}">B</label>
                <input type="radio" id="C${i}" name="block${i}" value="C" name="C">
                <label for="C${i}">C</label>
                <button id="delete${i}" class="deleteBtn">X</button>
            </div>
            `
        document.getElementById('radioSet').innerHTML += customBlock;
    }
    this.eventListeners();
}

    initRadios () {
        this.addRadio(document.getElementById('q_blocks'));
        document.getElementById('q_blocks').addEventListener('change', (e) => {
            this.addRadio(document.getElementById('q_blocks'));
        })
    }



    homeRoute () {
        document.getElementById('editorToHomePage').addEventListener('click', (e) => {
            this.unmount;
            home.mount();
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
            <title>LEADERBOARD | PARISRUNNER</title>
            <link rel="icon" type="image/x-icon" href="./Runner_assets/img/favicon_1.ico">
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
            <title>OPTIONS | PARISRUNNER</title>
            <link rel="icon" type="image/x-icon" href="./Runner_assets/img/favicon_1.ico">
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

class Credits {
    constructor() {
        this.html = ``;
        this.css = ``;
    }

    updateCSS() {

    }

    updateHTML() {

    }

    mount() {

    }
    
    unmount() {

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
        <title>GAME | PARISRUNNER</title>
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
            document.querySelector("#play_m").currentTime = 0; 
            document.querySelector("#play_m").pause()
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
const editor = new EditorPage();
const home = new HomePage();

home.mount();