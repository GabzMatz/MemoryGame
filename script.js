const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

startGame()

function startGame(){
    initializeCards(game.createCardFromTechs())
}

function initializeCards(cards){
    let gameBoard = document.getElementById("gameBoard")

    gameBoard.innerHTML = ""
    game.cards.forEach(card => {
        let cardElement = document.createElement("div")
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener("click",flipCard)
        gameBoard.appendChild(cardElement)

    });

}

function createCardContent(card, cardElement){
    
    createCardFace(FRONT,card,cardElement)
    createCardFace(BACK,card,cardElement)

}
function createCardFace(lado,card,cardElement) {
    let cardElementFace = document.createElement("div")
    cardElementFace.classList.add(lado)
    if(lado == FRONT){
        let iconElement = document.createElement("img")
        iconElement.classList.add(ICON)
        iconElement.src = "./images/"+card.icon+ ".png"
        cardElementFace.appendChild(iconElement)
    }
    else{
        cardElementFace.innerHTML = "&lt/&gt"
    }
    cardElement.appendChild(cardElementFace)
}


function flipCard(){    

    if (game.setCard(this.id)){

        this.classList.add("flip")
        if(game.secondCard){
            if (game.checkMate()){
                game.clearCards()
                if(game.checkGameOver()){
                    console.log("open2")
                    let gameOverLayer = document.getElementById("gameOver")
                    gameOverLayer.style.display = 'flex'
                }
            }
            else{
                setTimeout(()=>{
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)
        
        
                    firstCardView.classList.remove("flip")
                    secondCardView.classList.remove("flip")
                    game.unflipCards()
                },1000)
                

            }
        }

    }


}

function restart(){
    game.clearCards()
    startGame()
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = 'none'

}