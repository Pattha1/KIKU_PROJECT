let currentPlayer = 'X';
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let decisionTime = 10; // 10 วินาทีต่อการตัดสินใจ
let timer; // ตัวแปรเก็บเวลา
function placeMarker(row, col) {
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        document.querySelector(`.sub:nth-child(${row + 1}) .square:nth-child(${col + 1})`).innerText = currentPlayer;

        if (checkWin()) {
            document.getElementById('popupw').style.display = 'block';
            document.querySelector('.win').innerText = 'WIN !!!';
            document.querySelector('.win_img').src = 'img/10.png';
            document.querySelector('.player_win').innerText = `Player ${currentPlayer}`;
            clearTimeout(timer); // หยุดการนับเวลาเมื่อเกมจบ
        } else if (checkDraw()) {
            // Game is a draw
            document.getElementById('popupD').style.display = 'block';
            document.querySelector('.draw').innerText = 'DRAW !!!';
            document.querySelector('.win_img').src = 'img/draw.png';
            document.querySelector('.player_draw').innerText = 'You Draw'; // ไม่มีผู้เล่นที่ชนะ
            clearTimeout(timer); // หยุดการนับเวลาเมื่อเกมจบ

        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            startDecisionTimer(); // เริ่มนับเวลาตัดสินใจของผู้เล่นใหม่
        }
        // if (checklose()) {
        //     document.getElementById('popupl').style.display = 'block';
        //     document.querySelector('.lose').innerText = 'LOSE !!!';
        //     document.querySelector('.lose_img').src = 'img/15.png';
        //     document.querySelector('.player_lose').innerText = `Player ${currentPlayer}`;
        // }
    }
}





/*------------------------------------------------------------------ check winner ----------------------------------------------------------------------*/
function checkWin() {
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            return true;
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            return true;
        }
    }
    // Check diagonals
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return true;
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        return true;
    }
    return false;
}


function checkDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

function resetBoard() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    document.querySelectorAll('.square').forEach(square => square.innerText = '');
    currentPlayer = 'X';
}



/* ---------------------------------จับเวลา------------------------------------------------------------------------------------------- */
/* function startDecisionTimer() {
    let timeLeft = decisionTime;
    document.querySelector('.time_to_play').innerText = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`; // แสดงเวลาที่เหลือ

    timer = setInterval(() => {
        timeLeft--;
        document.querySelector('.time_to_play').innerText = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`; // แสดงเวลาที่เหลือ

        if (timeLeft === 0) {
            clearInterval(timer); // หยุดการนับเวลาเมื่อหมดเวลา
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // เปลี่ยนเป็นตาของผู้เล่นต่อไป
            startDecisionTimer(); // เริ่มนับเวลาสำหรับผู้เล่นถัดไป
        }
    }, 1000);
} */