export class Stage {
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