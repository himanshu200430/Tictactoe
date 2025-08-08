console.log("Welcome to my tictactoe");
let music = new Audio("music.mp3")

let gameover = new Audio("gameover.mp3")
let isgameover = false;
let cheering = new Audio("cheering.mp3")
let crackers = new Audio("crackers.mp3")

let turn = "X"


const changeturn=()=>{
  return turn === "X"?"0" : "X"
}

const checkwin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let win = [
        [0, 1, 2, 0, 0, 0],   // row 1
        [3, 4, 5, 0, 1, 0],   // row 2
        [6, 7, 8, 0, 2, 0],   // row 3
        [0, 3, 6, -1, 1, 90], // col 1
        [1, 4, 7, 0, 1, 90],  // col 2
        [2, 5, 8, 1, 1, 90],  // col 3
        [0, 4, 8, 0, 1, 45],  // diag 1
        [2, 4, 6, 0, 1, 135]  // diag 2
    ];

    // Get grid size and cell size
    let container = document.querySelector('.container');
    let cellSize = container.querySelector('.box').offsetWidth;

    win.forEach(e => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ''
        ) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " WON";
            isgameover = true;

            document.getElementById("winGif").style.display = "block";
            document.querySelector('.horrorheadingcontainer').style.display = "flex";
            cheering.loop = true;
            cheering.play();
            crackers.loop = true;
            crackers.play();

            let line = document.querySelector(".line");
            let translateX = e[3] * cellSize + cellSize / 2;
            let translateY = e[4] * cellSize + cellSize / 2;
            let angle = e[5];

            line.style.width = `${cellSize * 3}px`; // full row/col/diag width
            line.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${angle}deg)`;
            line.style.border = "2px solid black";
        }
    });
};


/*music.play();*/
let boxes = document.getElementsByClassName("box")
Array.from(boxes).forEach(element=>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click',()=>{
        if(isgameover){
            return;
        }
        if(boxtext.innerText=== ''){
            boxtext.innerText = turn
            turn = changeturn()
            new Audio("ting.mp3").play()
            checkwin();
            if(!isgameover){
            document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }

    })
})



let reset = document.getElementById("reset")
reset.addEventListener('click', ()=> {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element =>{
        element.innerText = ""
    });

    turn = "X"
    isgameover = false
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.getElementById("winGif").style.display = "none";
    document.querySelector('.horrorheadingcontainer').style.display = "none";
    cheering.pause()
    crackers.pause()
    document.querySelector(".line").style.width = "0vw";
    document.querySelector(".line").style.border = "0px solid black";
});