import {editor} from './editorComp.js';
import {credits} from './creditsComp.js';
import {score} from './scoreComp.js'
import {options} from './optionsComp.js'
import {Runner} from './gameComp.js';
import {Stage} from './stageComp.js';

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
                <button class="gridButton" id="creditPage"><span>CREDIT</span></button>
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
        <link rel="stylesheet" href="./styles/home.css">
        <link rel="icon" type="image/x-icon" href="./Runner_assets/img/favicon_1.ico">
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
        this.creditRoute();
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
                document.querySelector('#currentLoads').innerHTML = `Currently ${this.stages.length} level(s) loaded`
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

                this.stages[this.currentStage].game.mount();
                this.stages[this.currentStage].game.methods(this.stages[this.currentStage].data);
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

    creditRoute () {
        document.getElementById('creditPage').addEventListener('click', (e) => {
            e.preventDefault();
            this.unnmount;
            credits.mount();
            credits.methods();
        })
    }
}

export const home = new HomePage();