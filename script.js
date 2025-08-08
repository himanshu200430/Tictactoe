console.log("Welcome to my tictactoe");
let music = new Audio("music.mp3");
let gameover = new Audio("gameover.mp3");
let isgameover = false;
let cheering = new Audio("cheering.mp3");
let crackers = new Audio("crackers.mp3");

let turn = "X";

const changeturn = () => {
  return turn === "X" ? "0" : "X";
};

const drawWinningLine = (a, b) => {
  const boxes = document.querySelectorAll(".box");
  const boxA = boxes[a].getBoundingClientRect();
  const boxB = boxes[b].getBoundingClientRect();
  const container = document.querySelector(".container").getBoundingClientRect();

  const startX = boxA.left - container.left + boxA.width / 2;
  const startY = boxA.top - container.top + boxA.height / 2;
  const endX = boxB.left - container.left + boxB.width / 2;
  const endY = boxB.top - container.top + boxB.height / 2;

  const length = Math.hypot(endX - startX, endY - startY);
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

  const line = document.querySelector(".line");
  line.style.width = `${length}px`;
  line.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg)`;
  line.style.border = "2px solid black";
};

const checkwin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  win.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " WON";
      isgameover = true;

      document.getElementById("winGif").style.display = "block";
      document.querySelector(".horrorheadingcontainer").style.display = "flex";
      cheering.loop = true;
      cheering.play();
      crackers.loop = true;
      crackers.play();

      // Draw responsive win line
      drawWinningLine(e[0], e[2]);
    }
  });
};

/*music.play();*/
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (isgameover) {
      return;
    }
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeturn();
      new Audio("ting.mp3").play();
      checkwin();
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });

  turn = "X";
  isgameover = false;
  document.getElementsByClassName("info")[0].innerText =
    "Turn for " + turn;
  document.getElementById("winGif").style.display = "none";
  document.querySelector(".horrorheadingcontainer").style.display = "none";
  cheering.pause();
  crackers.pause();
  document.querySelector(".line").style.width = "0px";
  document.querySelector(".line").style.border = "0px solid black";
});
