import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
const backgroundMusic = new Audio("./sounds/background-music.mp3")
const loseSound = new Audio("./sounds/lose.mp3")
const pongSound = new Audio("./sounds/pong.wav")
const clickSound = new Audio("./sounds/click.mp3")
const startBtn = document.getElementById("start-btn")
const settingsBtn = document.getElementById("settings-btn")
const themeBtnDark = document.getElementById("theme-btn-dark")
const themeBtnLight = document.getElementById("theme-btn-light")

let lastTime
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--hue")
        )

        document.documentElement.style.setProperty("--hue", hue + delta * .02)

        if (isLose()) {
            handleLose()
            loseSound.play()
        }
    }

    lastTime = time
    window.requestAnimationFrame(update)
}


function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}

window.requestAnimationFrame(update)


startBtn.addEventListener("click", () => {
    computerScoreElem.textContent = "0"
    playerScoreElem.textContent = "0"
    document.querySelector(".score").style.display = "flex"
    document.querySelector(".line").style.display = "block"
    document.querySelector(".wlcm-txt").style.display = "none"
    document.querySelector(".press-start").style.display = "none"
    document.querySelector(".btn-menu").style.display = "none"

    document.addEventListener("mousemove", e => {
        playerPaddle.position = (e.y / window.innerHeight) * 100
        // console.log(playerPaddle.position)
    })

    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case 'ArrowUp':
                playerPaddle.position -= 5
                break;
            case 'ArrowDown':
                playerPaddle.position += 5
                break;
        }
    })
})

//Theme Changing
let rootElm = document.documentElement

themeBtnLight.addEventListener("click", () => {
    rootElm.style.setProperty('--light', '25%')
    rootElm.style.setProperty('--dark', '80%')
    themeBtnLight.style.display = "none"
    themeBtnDark.style.display = "block"
})

themeBtnDark.addEventListener("click", () => {
    rootElm.style.setProperty('--light', '90%')
    rootElm.style.setProperty('--dark', '10%')
    themeBtnDark.style.display = "none"
    themeBtnLight.style.display = "block"
})


//settings
settingsBtn.addEventListener("click", () => {
    document.getElementById("settings").style.display = "flex"
})

const backBtn = document.getElementById("back-btn")

backBtn.addEventListener("click", () => {
    document.getElementById("settings").style.display = "none"
})

let squaredBtn = document.getElementById("squared")
let roundedBtn = document.getElementById("rounded")
let blackAndWhite = document.getElementById("bw")
let color = document.getElementById("color")
let volume = document.getElementById("volume")
let mute = document.getElementById("mute")

squaredBtn.addEventListener("click", () => {
    rootElm.style.setProperty('--border-radius', '50px')
    rootElm.style.setProperty('--border-style', 'dotted')
    squaredBtn.style.display = "none"
    roundedBtn.style.display = "flex"
})

roundedBtn.addEventListener("click", () => {
    rootElm.style.setProperty('--border-radius', '0px')
    rootElm.style.setProperty('--border-style', 'dashed')
    squaredBtn.style.display = "flex"
    roundedBtn.style.display = "none"
})

blackAndWhite.addEventListener("click", () => {
    rootElm.style.setProperty('--saturation', '0%')
    rootElm.style.setProperty('--light', '100%')
    rootElm.style.setProperty('--dark', '0%')
    blackAndWhite.style.display = "none"
    color.style.display = "block"
})

color.addEventListener("click", () => {
    rootElm.style.setProperty('--saturation', '50%')
    rootElm.style.setProperty('--light', '90%')
    rootElm.style.setProperty('--dark', '10%')
    blackAndWhite.style.display = "block"
    color.style.display = "none"
})

volume.addEventListener("click", () => {
    backgroundMusic.play()
    volume.style.display = "none"
    mute.style.display = "block"
})

mute.addEventListener("click", () => {
    backgroundMusic.pause()
    mute.style.display = "none"
    volume.style.display = "block"
})

//button hover sounds
$(".btn").click(function () { 
    clickSound.play()
});

$("#rounded").click(function () { 
    clickSound.play()
});

$("#squared").click(function () { 
    clickSound.play()
});

$("#bw").click(function () { 
    clickSound.play()
});

$("#color").click(function () { 
    clickSound.play()
});