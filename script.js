// LEVEL
let level = new Map()
level.set("title", "Metro 1")
level.set("creator", "Aless",)
level.set("difficulty", 2,)
level.set("assets", { "melody": "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley", "background": "https://media.discordapp.net/attachments/1073169977215025183/1073264341735968788/DALLE_2023-02-09_16.29.10_-_paris_building_.png?width=1196&height=361", "A": "", "B": "", "C": "" },)
level.set("blocks", [{ "type": "C" }, { "type": "A" }, { "type": "B" }, { "type": "C" }, { "type": "A" }, { "type": "B" }, { "type": "C" }, { "type": "B" }, { "type": "B" }, { "type": "A" }])


console.log(level.get('blocks')[0]["type"])
// UPDATE TITLE & H1
let title = document.head.querySelector("title")
title.innerText += `${level.get("title")}`

let h1 = document.querySelector('.title')
for (let i in level.get("title")){
  h1.innerHTML += `<span>${level.get("title")[i]}</span>`
}

// GET GAME VARIABLES
let viewgame = document.querySelector(".viewgame")
let player = document.querySelector(".player")
let score = document.querySelector(".score")
let gameOver = document.querySelector(".gameOver")
let blockA = document.querySelector(".A")
let blockB = document.querySelector(".B")
let blockC = document.querySelector(".C")
let road = document.querySelector(".road")
let menu = document.querySelector(".menu")
let play_m = document.querySelector("#play_m")
let jump_se = document.querySelector("#jump_se")
let dead_se = document.querySelector("#dead_se")
let startGame = document.querySelector(".startGame")
let continue_button = document.querySelector(".continue")
let restart_button = document.querySelector(".restart")
let interval = null
let playerScore = 0
let ingame = false
let inpause = false
let iscrounching = false

play_m.volume = 0.2
jump_se.volume = 0.25
dead_se.volume = 0.2

//SCORE
let scoreUpdate = ()=>{
  playerScore++
  score.innerHTML = `Score : <strong>${playerScore}</strong>`
}

function stop_sound(sound){
  sound.pause()
  sound.currentTime = 0;
}

// START
document.addEventListener("keydown", (event)=>{
  if (event.code == "Space" && ingame == false && inpause == false){
    gameOver.style.display = "none"
    blockB.classList.add("spawn")
    //blockC.classList.add("spawn")
    road.classList.add('running')
    player.classList.remove('dead')
    player.classList.add('playerrunning')
    play_m.play()
    startGame.style.display = "none"
    
    ingame = true
    playerScore = 0
    interval = setInterval(scoreUpdate,200)
  }
})

// JUMP
document.addEventListener("keydown", (event)=>{
  if (event.key == " " && ingame == true && inpause == false){
    if(player.classList != "jumping"){
      player.classList.add("jumping")
      jump_se.play()
    }
  }
})

document.addEventListener("keyup", (event)=>{
  if (event.key == " " && ingame == true && inpause == false){
      player.classList.remove("jumping")
  }
})

// CROUNCH
document.addEventListener("keydown", (event)=>{
  if(event.key == "s" && ingame == true && inpause == false){
    player.style.height = '15%'
    player.classList.add('crouching')
    iscrounching = true
  }
})

document.addEventListener("keyup", (event)=>{
  if(event.key == "s" && inpause == false){
    player.style.height = '20%'
    player.classList.remove('crouching')
    iscrounching = false
  }
})

// GAME OVER
setInterval(() =>{
  // PLAYER
  let player_top = parseInt(getComputedStyle(player).getPropertyValue("bottom")) + parseInt(getComputedStyle(player).getPropertyValue("height"))
  let player_right = parseInt(getComputedStyle(player).getPropertyValue("width"))
  let player_bottom = parseInt(getComputedStyle(player).getPropertyValue("bottom"))
  let player_left = parseInt(getComputedStyle(player).getPropertyValue("left"))

  // BLOCK B
  let blockB_top = parseInt(getComputedStyle(blockB).getPropertyValue("height")) + parseInt(getComputedStyle(blockB).getPropertyValue("bottom"))
  console.log(blockB_top)
  let blockB_left = parseInt(getComputedStyle(blockB).getPropertyValue("left"))
  let blockB_right = parseInt(getComputedStyle(blockB).getPropertyValue("left")) + parseInt(getComputedStyle(blockB).getPropertyValue("width"))
  
  // BLOCK C
  let blockC_bottom = parseInt(getComputedStyle(viewgame).getPropertyValue("height")) - parseInt(getComputedStyle(blockC).getPropertyValue("top")) - parseInt(getComputedStyle(blockC).getPropertyValue("height"))
  let blockC_left = parseInt(getComputedStyle(blockC).getPropertyValue("left"))
  let blockC_right = parseInt(getComputedStyle(blockC).getPropertyValue("left")) + parseInt(getComputedStyle(blockC).getPropertyValue("width"))

  if (
    (player_bottom < blockB_top && ((blockB_left >= player_left && blockB_left <= player_right) || (blockB_right >= player_left && blockB_right <= player_right)))
    || (player_top > blockC_bottom && ((blockC_left >= player_left && blockC_left <= player_right) || (blockC_right >= player_left && blockC_right <= player_right)))
    ){
    clearInterval(interval)
    gameOver.style.display = "inline-block"
    blockB.classList.remove("spawn")
    blockC.classList.remove("spawn")
    road.classList.remove("running")
    player.classList.remove('playerrunning')
    player.classList.add('dead')
    playerScore = 0
    ingame = false
    stop_sound(play_m)
    dead_se.play()
  }
},1)

// PAUSE
document.addEventListener("keypress", (event)=>{
  if(event.key == "a" && ingame == true){
    blockB.classList.toggle("pause")
    blockC.classList.toggle("pause")
    road.classList.toggle("pause")
    player.classList.toggle("pause")
    if(inpause){
      inpause = false
      interval = setInterval(scoreUpdate,200)
      menu.style.display = "none"
      play_m.play()
    } else {
      inpause = true
      clearInterval(interval)
      menu.style.display = "flex"
      play_m.pause() 
    }
  }
})

continue_button.addEventListener("click", ()=>{
    blockB.classList.toggle("pause")
    blockC.classList.toggle("pause")
    road.classList.toggle("pause")
    player.classList.toggle("pause")
    inpause = false
    interval = setInterval(scoreUpdate,200)
    menu.style.display = "none"
    play_m.play()
})

restart_button.addEventListener("click", ()=>{
  // STOP
  clearInterval(interval)
  startGame.style.display = "inline-block"
  blockB.classList.remove("spawn")
  blockC.classList.remove("spawn")
  road.classList.remove("running")
  player.classList.remove('playerrunning')
  player.classList.remove('jumping')
  player.classList.remove('crouching')
  player.classList.remove('dead')
  playerScore = 0
  ingame = false
  stop_sound(play_m)
  // UNPAUSE
  blockB.classList.remove("pause")
  blockC.classList.remove("pause")
  road.classList.remove("pause")
  player.classList.remove("pause")
  menu.style.display = "none"
  inpause = false
  // READY
  if (iscrounching = true){
    player.style.height = '20%'
    iscrounching = false
  }

})