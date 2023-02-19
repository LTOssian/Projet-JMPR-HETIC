import {home} from './homeComp.js'

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

export const editor = new EditorPage();
