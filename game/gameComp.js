import { getCustom, setCustom, incrementCustom } from "./custom.js";
export class Runner {
    constructor() {
        this.html = `
        <div class="world">
                <div class="score">0</div>
                <div class="start-screen">Press r to start</div>
                <img src="https://media.discordapp.net/attachments/1073169977215025183/1073264341735968788/DALLE_2023-02-09_16.29.10_-_paris_building_.png?width=981&height=296" class="background">
                <img src="https://media.discordapp.net/attachments/1073169977215025183/1073264341735968788/DALLE_2023-02-09_16.29.10_-_paris_building_.png?width=981&height=296" class="background">

                <img src="./game/game_assets/parisian.png" class="player">
            </div>
        `
            

        
        this.css = `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GAME | PARISRUNNER</title>
        <link rel="stylesheet" href="./game/game.css">
        <link rel="icon" type="image/x-icon" href="./Runner_assets/img/favicon_1.ico">
        `

        this.WORLD_HEIGHT = 30;
        this.WORLD_WIDTH = 100;
    }

    updateHTML () {
        document.querySelector('body').innerHTML = this.html;
    }

    updateCSS () {
        document.querySelector('head').innerHTML = this.css;
    }

    mount () {
        this.updateCSS()
        this.updateHTML();
        this.mapElement = document.querySelectorAll('.background') 
    }

    unmount() {
        document.querySelector('head').innerHTML = "";
        document.querySelector('body').innerHTML = "";
    }

    methods (gameData) {
        // this.homeRoute();
        this.scaleWorld();
        window.addEventListener('resize', this.scaleWorld)
    }
    
    scaleWorld() {
        console.log("resize")
        let scale;
        if (window.innerWidth / window.innerHeight < this.WORLD_WIDTH / this.WORLD_HEIGHT) {
            scale = window.innerWidth/this.WORLD_WIDTH;
        } else {
            scale = window.innerHeight / this.WORLD_HEIGHT;
        }

        document.querySelector('.world').style.width = `${this.WORLD_WIDTH * scale}px`
        document.querySelector('.world').style.height = `${this.WORLD_HEIGHT * scale}px`
    }

    update(time) {
        if (lastTime == null) {
            lastTime = time;
            window.requestAnimationFrame(update);
            return
        }
        console.log(time)
        const delta = time - lastTime
        lastTime = time
        window.requestAnimationFrame(update)
    }


    homeRoute () {
        document.querySelector('#homeRoute').addEventListener('click', (e) => {
            this.unmount();
            home.mount();
        })
    }
}

const run = new Runner();
run.mount();