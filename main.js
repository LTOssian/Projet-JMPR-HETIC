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
        <div class="title">
            <p class="hovertitle">P</p>
            <p class="hovertitle">A</p>
            <p class="hovertitle">R</p>
            <p class="hovertitle">I</p>
            <p class="hovertitle">S</p>
            <p class="hovertitle">R</p>
            <p class="hovertitle">U</p>
            <p class="hovertitle">N</p>
            <p class="hovertitle">N</p>
            <p class="hovertitle">E</p>
            <p class="hovertitle">R</p>
        </div>
            
            <div class='item3'>
        <button class="carousel" id="prevName"><img src="../assets/chevron-left.svg" alt="left navigation" ></button>
    
            <button id="button5">NIVEAU 1</button>
            <button class="carousel" id="nextName"><img src="../assets/chevron-right.svg" alt="right navigation"></button>
    
            <input id="loadbutton" type="file"></input>
            <label for="loadbutton" class="button1">LOAD</label>
            <a href="https://ltossian.github.io/map-editor-hetic/" class="button2">EDITOR</a>
            <button class="button3" id="optionPage">OPTIONS</button>
            <a href="https://obamasixgaming.github.io/Credit-page1/" class="button4">CREDITS</a>
        </div>
        <button id="scorePage">LEADERBORD</button>
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
    }

    methods () {
        this.loadStage();
        this.carouselEvents();
        this.scoreRoute();
        this.optionRoute();
    }

    unnmount () {
        document.querySelector('head').innerHTML = "";
        document.querySelector('body').innerHTML = "";
    }

    loadStage () {
        document.getElementById('loadbutton').addEventListener('click', (e) => {
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
                        console.log(content)
                        this.stages.splice(0, 0,new Stage(content["title"], content))
                        console.log(this.stages)
                        this.updateCarousel()
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

    updateCarousel () {
            if (this.stages.length) {
                document.getElementById('button5').innerHTML = this.stages[this.currentStage].name;
            } else {
                console.log('Veuillez importer une map')
            }
        }        
    carouselEvents () {
        document.getElementById('prevName').addEventListener('click', (e) => {
            if (this.currentStage == 0) {
                console.error('Vous êtes au premier niveau')
                return
            } else {
                this.updateCarousel(this.stages)
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
        <h1>Hello</h1>
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
        this.pauseKey = 'Escape';
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

    }

}

const score = new LeaderBoard();
const options = new Options();
const home = new HomePage();
home.mount();
home.methods();
