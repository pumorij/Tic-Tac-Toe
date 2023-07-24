const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn")

let curPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// function to initialize the game
function initGame(){
    curPlayer="X";
    gameGrid=["","","","","","","","",""];
    // empty box in UI
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        // initialise boxes with css properties
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${curPlayer}`;
}

initGame();  // function call

// function swapTurn
function swapTurn(){
    if(curPlayer==="X"){
        curPlayer = "0";
    }else{
        curPlayer= "X";
    }
    // UI update
    gameInfo.innerText = `Current Player - ${curPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]) ){
            // check if winner is X
            if(gameGrid[position[0]]==='X'){
                answer="X";
            }else{
                answer="0";
            }
            // disable pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            // now we know winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })
    
    if(answer!==""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    // no winner game is tied
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    })
    if(fillCount===9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] ===""){
        boxes[index].innerText = curPlayer;
        gameGrid[index] = curPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapTurn();
        // check
        checkGameOver();
    }
}

// add event listener to each box
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})

newGameBtn.addEventListener("click",initGame);
