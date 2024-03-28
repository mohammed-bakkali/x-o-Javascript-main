


// Selecting all elements with the class "square"
let gridItems = document.getElementsByClassName("square");
// Setting initial turn to "x"
let currentTurn = "x";
// Boolean to track if the game has finished
let gameIsFinished = false;

// Array representing the game board
let boardArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

// Adding click event listeners to each grid item
for (const item of gridItems) {
  item.addEventListener("click", function () {

    // If the game is already finished, do nothing
    if (gameIsFinished) {
      return;
    }

    // Getting the value attribute of the clicked item
    let value = item.getAttribute("value");
    // Converting value to array index
    let index = value - 1;

    // If the square is already filled, do nothing
    if (boardArray[index] == "x" || boardArray[index] == "o") {
      return;
    }

    // Filling the value visually
    let squareContent = document.querySelector(`.square[value="${value}"]`);
    squareContent.innerHTML = currentTurn;

    // Filling the value logically
    boardArray[index] = currentTurn;

    // Evaluating the game board
    evaluateBoard();

    // Switching turns
    if (currentTurn == "x") {
      currentTurn = "o";
    } else {
      currentTurn = "x";
    }
    document.getElementById("instruction").textContent = `${currentTurn} turn`
  });

  // Function to evaluate the state of the game board
  function evaluateBoard() {
    // Checking for winning combinations
    if (
      (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]) ||
      (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]) ||
      (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8]) ||
      // Columns
      (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]) ||
      (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]) ||
      (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]) ||
      // Diagonals
      (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6])
    ) {
      // Declaring winner
      var winner = currentTurn == "o" ? "o" : "x";
      gameIsFinished = true;
      // Displaying winner
      alertify.alert(`${winner} Won!`);
      
    }

    // Checking for a draw
    var isDraw = true;
    for (square of boardArray) {
      if (square != "x" && square != "o") {
        isDraw = false;
      }
    }

    if (isDraw) {
      // If all squares are filled and no winner, it's a draw
      gameIsFinished = true;
      alertify.alert("draw");
    }
  }
}

// Adding click event listener to reset button
document.getElementById("reset-btn").addEventListener("click", function () {
  reset();
});

// Function to reset the game
function reset() {
  // Resetting the visual part
  for (item of gridItems) {
    let value = item.getAttribute("value");
    let squareContent = document.querySelector(`.square[value="${value}"]`);
    squareContent.innerHTML = "";

    // Resetting the board array
    boardArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  }


    // Resetting game status
    gameIsFinished = false
    currentTurn = "x"
    document.getElementById("instruction").textContent = `${currentTurn} turn`
}
