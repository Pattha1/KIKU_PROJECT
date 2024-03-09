//  // JavaScript functions
//  function showPopup() {
//      document.getElementById('popup').style.display = 'block';
//  }

//  function submitAnswer() {
//      // Get the user's answer from the input field
//      var userAnswer = document.getElementById('answer').value;

//      // Perform the necessary logic with the user's answer
//      // (You can add your own logic here)

//      // Close the popup
//      document.getElementById('popup').style.display = 'none';
//  }

//  // Global variables
//  var currentPlayer = 'X'; // Starting player
//  var board = ['', '', '', '', '', '', '', '', '']; // Tic Tac Toe board
//  var gameActive = false; // Flag to check if the game is active

//  // Function to display the mini-game popup
//  function showPopup() {
//      // Display the mini-game popup
//      document.getElementById('popup').style.display = 'block';

//      // Check if the game is not active
//      if (!gameActive) {
//          // Display the mini-game popup only if the game is not active
//          document.getElementById('popup').style.display = 'block';
//      }
//  }

//  // Function to submit the answer to the mini-game popup
//  function submitAnswer() {
//      // Get the user's answer from the input field
//      var userAnswer = document.getElementById('answer').value;

//      // Calculate the correct answer for the mini-game
//      var correctAnswer = 4 + 10 + 12 + 9 + 7 + 3 + 1;

//      // Check if the user's answer is correct
//      if (parseInt(userAnswer) === correctAnswer) {
//          // Hide the mini-game popup
//          document.getElementById('popup').style.display = 'none';

//          // Set the game as active
//          gameActive = true;
//      } else {
//          // Inform the user to answer again if the answer is incorrect
//          alert('Incorrect answer. Please try again.');
//      }
//  }

//  // Function to handle player's move in Tic Tac Toe
//  function handleMove(position) {
//      // Check if the game is active
//      if (gameActive) {
//          // Check if the selected position is empty
//          if (board[position] === '') {
//              // Set the current player's mark on the board
//              board[position] = currentPlayer;

//              // Switch player for the next move
//              currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

//              // Check for game result after the move
//              checkGameResult();
//          } else {
//              // Inform the user that the position is already occupied
//              alert('This position is already occupied. Please choose another position.');
//          }
//      } else {
//          // Inform the user to play the mini-game first
//          alert('Please complete the mini-game before playing Tic Tac Toe.');
//      }
//  }

//  // Function to check for game result
//  function checkGameResult() {
//      // Define winning combinations
//      const winningCombinations = [
//          [0, 1, 2],
//          [3, 4, 5],
//          [6, 7, 8],
//          [0, 3, 6],
//          [1, 4, 7],
//          [2, 5, 8],
//          [0, 4, 8],
//          [2, 4, 6]
//      ];

//      // Check for winning combinations
//      for (let combination of winningCombinations) {
//          const [a, b, c] = combination;
//          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//              // Display winner and end the game
//              alert(`Player ${board[a]} wins!`);
//              gameActive = false;
//              return;
//          }
//      }

//      // Check for a tie
//      if (!board.includes('')) {
//          // Display tie message and end the game
//          alert('It\'s a tie!');
//          gameActive = false;
//          return;
//      }
//  }

//  // Function to initialize the Tic Tac Toe game
//  function initializeGame() {
//      // Add event listeners to each square
//      var squares = document.querySelectorAll('.square');
//      squares.forEach((square, index) => {
//          square.addEventListener('click', () => handleMove(index));
//      });
//  }

//  // Initialize the game when the page loads
//  window.onload = initializeGame;


/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */
// // ฟังก์ชันสุ่มโจทย์ทางคณิตศาสตร์
// function generateMathProblem() {
//     const operators = ['+', '-', '*', '/'];
//     const operator = operators[Math.floor(Math.random() * operators.length)];
//     const operand1 = Math.floor(Math.random() * 20) + 1;
//     const operand2 = Math.floor(Math.random() * 20) + 1;

//     let problemText = '';

//     switch (operator) {
//         case '+':
//             problemText = `${operand1} ${operator} ${operand2}`;
//             break;
//         case '-':
//             problemText = `${operand1} ${operator} ${operand2}`;
//             break;
//         case '*':
//             problemText = `${operand1} ${operator} ${operand2}`;
//             break;
//         case '/':
//             // Make sure the division is valid and result is an integer
//             const validDivisor = operand2 !== 0 && operand1 % operand2 === 0;
//             problemText = validDivisor ? `${operand1} ${operator} ${operand2}` : generateMathProblem();
//             break;
//     }

//     return problemText;
// }

// // ฟังก์ชันที่เรียกเมื่อผู้เล่นตอบคำถาม
// function submitAnswer() {
//     const userAnswer = document.getElementById('answer').value;
//     const correctAnswer = eval(generateMathProblem()); // คำตอบที่ถูกต้อง

//     if (userAnswer === String(correctAnswer)) {
//         // ตอบถูก
//         hidePopup();
//     } else {
//         // ตอบผิด
//         alert("Incorrect answer. Try again.");
//     }
// }

// // ฟังก์ชันที่เรียกเมื่อต้องการแสดง popup
// function showPopup() {
//     const popup = document.getElementById('popup');
//     popup.style.display = 'block';

//     // สุ่มโจทย์และแสดงใน popup
//     const mathProblem = generateMathProblem();
//     document.querySelector('.jod').textContent = mathProblem;
// }

// // ฟังก์ชันที่ซ่อน popup
// function hidePopup() {
//     const popup = document.getElementById('popup');
//     popup.style.display = 'none';
// }
// game.js

// Function to generate a random math question
function generateRandomMathQuestion() {
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;

    // Ensure division results in a whole number
    if (operator === '/' && num1 % num2 !== 0) {
        num1 *= num2;
    }

    const question = `${num1} ${operator} ${num2}`;
    const answer = eval(question); // Evaluate the expression to get the answer

    return { question, answer };
}

// Function to show the popup with a random math question
function showPopup() {
    const popup = document.getElementById("popup");
    const mathQuestion = generateRandomMathQuestion();

    // Update popup content with the random math question
    document.querySelector(".jod").textContent = mathQuestion.question;

    // Clear the input field
    document.getElementById("answer").value = "";

    // Store the correct answer in a data attribute
    popup.setAttribute("data-correct-answer", mathQuestion.answer);

    // Show the popup
    popup.style.display = "block";
}

// Function to submit the answer and check if it's correct
function submitAnswer() {
    const popup = document.getElementById("popup");
    const userAnswer = parseFloat(document.getElementById("answer").value);
    const correctAnswer = parseFloat(popup.getAttribute("data-correct-answer"));

    // Check if the answer is correct
    if (!isNaN(userAnswer) && userAnswer === correctAnswer) {
        // Correct answer, hide the popup
        popup.style.display = "none";
    } else {
        // Incorrect answer, display a message or take appropriate action
        alert("Incorrect answer. Please try again.");
    }
}


// Function to submit the answer and check if it's correct
function submitAnswer() {
    const popup = document.getElementById("popup");
    const userAnswer = parseFloat(document.getElementById("answer").value);
    const correctAnswer = parseFloat(popup.getAttribute("data-correct-answer"));

    // Check if the answer is correct
    if (!isNaN(userAnswer) && userAnswer === correctAnswer) {
        // Correct answer, hide the popup and show a new question
        popup.style.display = "none";
        showPopup();
    } else {
        // Incorrect answer, display a message or take appropriate action
        alert("Incorrect answer. Please try again.");
    }
}