import {home} from './homeComp.js'

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

export const options = new Options(); 