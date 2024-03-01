// let currentPlayer = 'X';
// let board = [
//     ['', '', '', ''],
//     ['', '', '', ''],
//     ['', '', '', ''],
//     ['', '', '', '']
// ];
// let timeLeftX = 10; // เวลาที่เหลือของ Player X
// let timeLeftO = 10; // เวลาที่เหลือของ Player O

// function startTimer() {
//     setInterval(() => {
//         if (currentPlayer === 'X') {
//             timeLeftX--;
//             if (timeLeftX === 0) {
//                 currentPlayer = 'O';
//                 timeLeftX = 10;
//             }
//         } else {
//             timeLeftO--;
//             if (timeLeftO === 0) {
//                 currentPlayer = 'X';
//                 timeLeftO = 10;
//             }
//         }
//         // อัปเดต UI ให้แสดงเวลาที่เหลือ
//         document.querySelector('.time_to_play').innerText = `00:${currentPlayer === 'X' ? timeLeftX : timeLeftO}`;
//     }, 1000);
// }

// function placeMarker(row, col) {
//     if (board[row][col] === '') {
//         board[row][col] = currentPlayer;
//         document.querySelector(`.sub:nth-child(${row + 1}) .square:nth-child(${col + 1})`).innerText = currentPlayer;
//         if (checkWin()) {
//             document.getElementById('popupw').style.display = 'block';
//             document.querySelector('.win').innerText = 'WIN !!!';
//             document.querySelector('.win_img').src = 'img/10.png';
//             document.querySelector('.player_win').innerText = `Player ${currentPlayer}`;
//         } else {
//             currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//         }
//         // เพิ่มโค้ดตรวจสอบการแพ้ที่นี่
//         if (checkDraw()) {
//             document.getElementById('popupD').style.display = 'block';
//             document.querySelector('.draw').innerText = 'DRAW !!!';
//             document.querySelector('.win_img').src = 'img/draw.png';
//             document.querySelector('.player_draw').innerText = 'You Draw'; // ไม่มีผู้เล่นที่ชนะ
//             clearTimeout(timer); // หยุดการนับเวลาเมื่อเกมจบ
//         }
//     }
// }

// function checkWin() {
//     // Check rows
//     for (let i = 0; i < 4; i++) {
//         if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] === board[i][3]) {
//             return true;
//         }
//     }
//     // Check columns
//     for (let i = 0; i < 4; i++) {
//         if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] === board[3][i]) {
//             return true;
//         }
//     }
//     // Check diagonals
//     if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] === board[3][3]) {
//         return true;
//     }
//     if (board[0][3] !== '' && board[0][3] === board[1][2] && board[0][3] === board[2][1] && board[0][3] === board[3][0]) {
//         return true;
//     }
//     return false;
// }

// function checkTie() {
//     for (let i = 0; i < 4; i++) {
//         for (let j = 0; j < 4; j++) {
//             if (board[i][j] === '') {
//                 return false;
//             }
//         }
//     }
//     return true;
// }

// function resetBoard() {
//     board = [
//         ['', '', '', ''],
//         ['', '', '', ''],
//         ['', '', '', ''],
//         ['', '', '', '']
//     ];
//     document.querySelectorAll('.square').forEach(square => square.innerText = '');
//     currentPlayer = 'X';
// }

// window.onload = startTimer;