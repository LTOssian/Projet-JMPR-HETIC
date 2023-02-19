import {home} from './homeComp.js'

class Credits {
    constructor() {
        this.html = `
        <main>
            <div class="home-logo"></div>
            <h1></h1>
            <div class="window-container">
                <div class="card runner">
                    <h2 class="card-name">Runner</h2>
                    <div class="separate"></div>
                    <ul>
                        <li class="first-li">Benjamin SCHINKEL</li>
                        <li>Julien HEITZ</li>
                        <li>Alexis JANUS</li>
                        <li>Victor CHABEAU</li>
                    </ul>
                </div>
                <div id="vertical"></div>
                <div class="card editor">
                    <h2 class="card-name">Editor</h2>
                    <div class="separate"></div>
                    <ul>
                        <li class="first-li">Alessandro GARAU</li>
                        <li>Djedje GBOBLE</li>
                        <li>Louisan TCHITOULA </li>
                        <li>Mohamed SALAMATAO</li>
                    </ul>
                </div>
            </div>
        </main>
        `;
        this.css = `
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="./styles/credits.css">
        `;
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

    homeRoute(){
        let goHome = document.querySelector('#creditToHomePage')
         goHome.addEventListener('click',()=>{
             this.unmount()
             home.mount()
         })
     }

    titleAnimation () {
        const title = "CREDITS"
        for(let i = 0; i < title.length; i++) {
            document.querySelector('h1').innerHTML += `<span>${title[i]}<span>`
        }
    }
    methods(){
        this.titleAnimation()
    }
}

export const credits = new Credits ();