let boxes = document.querySelectorAll(".box");
let re_set = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new_game");
let msg = document.querySelector(".msg");
let Win = document.querySelector(".Win");
let Draw = document.querySelector(".Draw");

let turnO = true;
let count = 0;

const resetGame = () => {
    console.log("Reset button clicked"); // Debugging
    turnO = true;
    enableBoxes();
    Win.classList.add("hide");
    Draw.classList.add("hide");
    msg.innerText = ''; 
    for (let box of boxes) {
        box.innerText = ""; 
    }
    count = 0;
}

const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],    
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");
        if (turnO == true) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        if (count >= 5) {
            checkWinner();
        }
        if (count === 9) {
            showDraw();
        }
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = 'Congratulations!! Winner is ' + winner;
    Win.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText = "Oops!! It's a Draw";
    Draw.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
re_set.addEventListener("click", resetGame);
